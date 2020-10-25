// Dependencies
import React from 'react';
import {
  render, fireEvent, screen, cleanup, act,
} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { create } from 'react-test-renderer';
import moment from 'moment';
import types from '../window_types';

// Components
import EditBooking from '../index';

describe('<EditBooking />', () => {
  let container = null;
  const props = {
    exit: jest.fn(),
    setErrorBanner: jest.fn(),
    entryWindow: types.CREATE,
    date: '2020-10-24',
    booking: {
      id: 20,
      startTime: moment().format(),
      partySize: 2,
      user: {
        firstName: 'name',
      },
    },
  };

  const buildComponent = () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    render(
      <EditBooking {...props} />,
    );
  };

  beforeEach(async () => {
    buildComponent();
  });

  afterEach(() => {
    jest.clearAllMocks();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should match snapshot', () => {
    const tree = create(
      <EditBooking {...props} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display an exit button', () => {
    const exitButton = screen.getByRole('button', { name: 'X' });
    expect(exitButton).toBeInTheDocument();
  });

  it('should display create window', () => {
    const createDisplay = screen.getByText(/Create (b|B)ooking/i);
    expect(createDisplay).toBeInTheDocument();
  });

  it('should display edit window', async () => {
    props.entryWindow = types.EDIT;
    buildComponent();
    const editDisplay = screen.getByText(/Save booking/i);
    expect(editDisplay).toBeInTheDocument();
  });

  it('should display delete window', async () => {
    props.entryWindow = types.DELETE;
    buildComponent();
    const editDisplay = screen.getByText(/delete the booking/i);
    expect(editDisplay).toBeInTheDocument();
    const submitButton = screen.getByRole('button', { name: 'Yes' });
    fireEvent.click(submitButton);
  });

  it('should call exit after fetch', async () => {
    cleanup();
    const jestSpy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({ status: 200 }));
    buildComponent();
    const submitButton = screen.getByRole('button', { name: 'Yes' });
    await act(async () => {
      await fireEvent.click(submitButton);
    });
    expect(jestSpy).toBeCalledTimes(1);
    expect(props.exit).toBeCalledTimes(1);
  });

  it('should display loading after fetch', () => {
    cleanup();
    const jestSpy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({ status: 200 }));
    buildComponent();
    const submitButton = screen.getByRole('button', { name: 'Yes' });
    fireEvent.click(submitButton);
    expect(jestSpy).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should call setErrorBanner on error', () => {
    const jestSpy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('Error!')));
    cleanup();
    buildComponent();
    const submitButton = screen.getByRole('button', { name: 'Yes' });
    fireEvent.click(submitButton);
    expect(jestSpy).toHaveBeenCalledTimes(1);
    expect(props.setErrorBanner).toHaveBeenCalledTimes(1);
  });
});
