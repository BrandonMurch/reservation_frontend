// Dependencies
import React from 'react';
import {
  render, fireEvent, screen, cleanup, waitFor,
} from '@testing-library/react';
import { create } from 'react-test-renderer';
import types from '../window_types';

// Components
import BookingOverlay from '../index';
import userEvent from '@testing-library/user-event';
import { BannerContextProvider } from 'contexts/banner_context';
import { mockFetch } from 'test_utils';

describe('<BookingOverlay />', () => {
  let banner;
  let exit;
  const props = {
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

  let getComponentUnderTest;

  beforeEach(async () => {
    jest
      .spyOn(global.console, 'error')
      .mockImplementation(() => {});
    banner = jest.fn();
    exit = jest.fn();
    getComponentUnderTest = () => (
      <BannerContextProvider value={banner}>
        <BookingOverlay {...props} exit={exit} />
      </BannerContextProvider>
    );
    render(getComponentUnderTest());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const tree = create(
      <BookingOverlay {...props} exit={exit} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display an exit button', () => {
    const exitButton = screen.getByRole('button', { name: 'X' });
    expect(exitButton).toBeInTheDocument();
  });

  it('should display create window', async () => {
    cleanup();
    props.entryWindow = types.CREATE;
    render(getComponentUnderTest());
    const createDisplay = await screen.findByText(/create booking/i);
    expect(createDisplay).toBeInTheDocument();
  });

  it('should display edit window', async () => {
    cleanup();
    props.entryWindow = types.EDIT_BOOKING;
    render(getComponentUnderTest());

    const editDisplay = await screen.findByText(/save booking/i);
    expect(editDisplay).toBeInTheDocument();
  });

  it('should display delete window', async () => {
    cleanup();
    props.entryWindow = types.DELETE;
    render(getComponentUnderTest());

    const editDisplay = await screen.findByText(/delete the booking/i);
    expect(editDisplay).toBeInTheDocument();
  });

  it('should call exit after fetch', async () => {
    const jestSpy = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch(200));
    const submitButton = screen.getByRole('button', { name: 'Yes' });
    userEvent.click(submitButton);
    expect(jestSpy).toBeCalledTimes(1);
    await waitFor(() => expect(exit).toBeCalledTimes(1));
  });

  it('should display loading after fetch', () => {
    const jestSpy = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch(200));
    const submitButton = screen.getByRole('button', { name: 'Yes' });
    fireEvent.click(submitButton);
    expect(jestSpy).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText('loading')).toBeInTheDocument();
  });

  it('should call setErrorBanner on error', async () => {
    const jestSpy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('Error!')));
    const submitButton = screen.getByRole('button', { name: 'Yes' });
    fireEvent.click(submitButton);
    expect(jestSpy).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(banner).toHaveBeenCalledTimes(1));
  });
});
