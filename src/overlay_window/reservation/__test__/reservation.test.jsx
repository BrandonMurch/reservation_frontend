// Dependencies
import React from 'react';
import {
  render, fireEvent, screen, waitForElementToBeRemoved,
} from '@testing-library/react';
import { create, act as reactAct } from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { mockFetch as mockFetchResponse } from 'test_utils';

// Components
import Reservation from '../index';
import { BannerContextProvider } from 'contexts/banner_context';

const selectTime = function selectTimeToCallServer() {
  const hoursArray = [
    '18:00', '19:00', '20:00',
  ];
  global.fetch = jest.fn().mockImplementationOnce(() => mockFetchResponse(200, hoursArray));
  const selectBox = screen.getByRole('combobox', { name: 'party-size' });
  fireEvent.change(selectBox, { target: { value: 2 } });
};

describe('<Reservation />', () => {
  let mockSubmitFunction;
  let mockSetBanner;

  beforeEach(async () => {
    mockSubmitFunction = jest.fn();
    mockSetBanner = jest.fn();
    global.fetch = jest.fn().mockImplementationOnce(() => mockFetchResponse(200, 8));
    render(
      <BannerContextProvider value={mockSetBanner}>
        <Reservation
          onSubmit={mockSubmitFunction}
          date="2020-10-09"
        />
      </BannerContextProvider>,
    );
    await waitForElementToBeRemoved(() => screen.getByLabelText('loading'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => mockFetchResponse(200, 8));
    let tree;
    await reactAct(async () => {
      tree = await create(<Reservation
        onSubmit={mockSubmitFunction}
        date="2020-10-09"
      />);
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should fetch data from the server', async () => {
    await act(async () => { await selectTime(); });
    expect(global.fetch).toHaveBeenCalled();
  });

  it('should call setError if server is unavailable', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => Promise.reject(new Error('Error!')));
    const selectBox = screen.getByRole('combobox', { name: 'party-size' });

    await act(async () => {
      await fireEvent.change(selectBox, { target: { value: 2 } });
    });
    expect(mockSetBanner).toHaveBeenCalled();
  });

  it('should disable time select and submit if no party size is chosen', () => {
    const timeSelect = screen.getByRole('combobox', { name: 'time' });
    expect(timeSelect).toBeDisabled();
    const submit = screen.getByRole('button', { name: 'Next' });
    expect(submit).toBeDisabled();
  });

  it('should disable submit if no time is chosen', async () => {
    await act(async () => {
      await selectTime();
    });
    const submit = screen.getByRole('button', { name: 'Next' });
    expect(submit).toBeDisabled();
  });
  it('should have two select boxes', () => {
    const comboBoxes = screen.getAllByRole('combobox');
    expect(comboBoxes).toHaveLength(2);
  });
  it('should display the desired date', () => {
    const date = screen.getByText(/Fri Oct 09 2020/i);
    expect(date).toBeInTheDocument();
  });
});
