// Dependencies
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { create } from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

// Components
import Reservation from '../index';

const mockFetch = function mockFetchCallToServer() {
  const mockSuccessResponse = [
    '18:00', '19:00', '20:00',
  ];
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  return Promise.resolve({
    json: () => mockJsonPromise,
  });
};

const selectTime = function selectTimeToCallServer(component) {
  const selectBox = component.getByRole('combobox', { name: 'party-size' });
  fireEvent.change(selectBox, { target: { value: 2 } });
};

describe('<Reservation />', () => {
  let component;
  let mockSubmitFunction;
  let mockSetErrorFunction;
  let container = null;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    mockSubmitFunction = jest.fn();
    mockSetErrorFunction = jest.fn();
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch());
    await act(async () => {
      component = await render(<Reservation
        setError={mockSetErrorFunction}
        onSubmit={mockSubmitFunction}
        date="2020-10-09"
      />);
    });
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should match snapshot', () => {
    const tree = create(<Reservation
      setError={mockSetErrorFunction}
      onSubmit={mockSubmitFunction}
      date="2020-10-09"
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should fetch data from the server', async () => {
    await act(async () => {
      await selectTime(component);
    });
    expect(global.fetch).toHaveBeenCalled();
  });

  it('should call setError if server is unavailable', async () => {
    await act(async () => {
      jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('Error!')));
      await component.rerender(<Reservation
        setError={mockSetErrorFunction}
        onSubmit={mockSubmitFunction}
        date="2020-10-09"
      />);
      await selectTime(component);
    });
    expect(mockSetErrorFunction).toHaveBeenCalled();
  });

  it('should disable time select and submit if no party size is chosen', () => {
    const timeSelect = component.getByRole('combobox', { name: 'time' });
    expect(timeSelect).toBeDisabled();
    const submit = component.getByRole('button', { name: 'Submit' });
    expect(submit).toBeDisabled();
  });
  it('should disable submit if no time is chosen', async () => {
    await act(async () => {
      await selectTime(component);
    });
    const submit = component.getByRole('button', { name: 'Submit' });
    expect(submit).toBeDisabled();
  });
  it('should have two select boxes', () => {
    const comboBoxes = component.getAllByRole('combobox');
    expect(comboBoxes).toHaveLength(2);
  });
  it('should display the desired date', () => {
    const date = component.getByText(/Fri Oct 09 2020/i);
    expect(date).toBeInTheDocument();
  });
});
