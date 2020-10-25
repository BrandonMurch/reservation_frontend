// Dependencies
import React from 'react';
import {
  render, fireEvent, screen, act,
} from '@testing-library/react';
import { create } from 'react-test-renderer';
import types from '../window_types';

// Components
import EditBooking from '../index';

describe('<EditBooking />', () => {
  let props;

  const buildComponent = () => render(
    <EditBooking {...props} />,
  );

  beforeEach(async () => {
    jest
      .spyOn(global.console, 'error')
      .mockImplementation(() => {});

    props = {
      exit: jest.fn(),
      setErrorBanner: jest.fn(),
      entryWindow: types.DELETE,
      date: '2020-10-24',
      booking: {
        id: 20,
        startTime: '2020-10-24T20:00',
        partySize: 2,
        user: {
          firstName: 'name',
        },
      },
    };
    buildComponent();
  });

  afterEach(() => {
    jest.clearAllMocks();
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
    props.entryWindow = types.CREATE;
    buildComponent();
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
    const editDisplay = screen.getByText(/delete the booking/i);
    expect(editDisplay).toBeInTheDocument();
  });

  it('should call exit after fetch', async () => {
    const jestSpy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({ status: 200 }));
    const submitButton = screen.getByRole('button', { name: 'Yes' });
    await act(async () => {
      await fireEvent.click(submitButton);
    });
    expect(jestSpy).toBeCalledTimes(1);
    expect(props.exit).toBeCalledTimes(1);
  });

  it('should display loading after fetch', () => {
    const jestSpy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({ status: 200 }));
    const submitButton = screen.getByRole('button', { name: 'Yes' });
    fireEvent.click(submitButton);
    expect(jestSpy).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should call setErrorBanner on error', async () => {
    const jestSpy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('Error!')));
    const submitButton = screen.getByRole('button', { name: 'Yes' });
    await act(async () => {
      await fireEvent.click(submitButton);
    });
    expect(jestSpy).toHaveBeenCalledTimes(1);
    expect(props.setErrorBanner).toHaveBeenCalledTimes(1);
  });
});
