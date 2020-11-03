// Dependencies
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { renderWithRouter, mockFetch } from 'test_utils';

// Components
import OverlayWindow from '../index';
import { BannerContextProvider } from 'contexts/banner_context';

const mockCalendarFetch = function mockFetchResponseFromServer() {
  const today = new Date();
  const todayDate = today.getDate();
  const todayString = today.toLocaleDateString('en-CA');
  const tomorrowString = todayString.replace(new RegExp(`${todayDate}$`, 'i'), todayDate + 1);
  const endDayString = todayString.replace(new RegExp(`${todayDate}$`, 'i'), todayDate + 3);

  const mockSuccessResponse = {
    start: todayString,
    end: endDayString,
    availableDates: [todayString, tomorrowString],
  };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  return Promise.resolve({
    status: 200,
    json: () => mockJsonPromise,
  });
};

describe('<OverlayWindow />', () => {
  let mockCloseOverlayFunction;
  let setBanner;
  const reservation = {
    date: '2020-10-10',
    time: '21:00',
    partySize: 2,
  };
  const user = {
    firstName: 'john',
    lastName: 'johnson',
    username: 'john@john.com',
    phoneNumber: '+1 123456787',
    tAC: true,
  };

  const renderOverlay = (route) => {
    setBanner = jest.fn();
    return renderWithRouter(
      <BannerContextProvider>
        <OverlayWindow
          closeOverlay={mockCloseOverlayFunction}
          reservationInfo={reservation}
          userInfo={user}
        />
      </BannerContextProvider>,
      { route },
    );
  };
  beforeEach(async () => {
    mockCloseOverlayFunction = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <OverlayWindow closeOverlay={mockCloseOverlayFunction} />
      </Router>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should submit reservation to server', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => mockFetch(201));

    const component = renderOverlay('/review');
    const submit = screen.getByRole('button', { name: 'Make reservation.' });
    await act(async () => {
      await fireEvent.click(submit);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(component.history.location.pathname).toEqual('/success');
  });

  it('should setError on server error', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(() => mockFetch(409, { message: 'Error!' }));

    renderOverlay('/review');
    const submit = screen.getByRole('button', { name: 'Make reservation.' });

    await act(async () => {
      await fireEvent.click(submit);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const errorText = screen.getByText('Error!');
    expect(errorText).toBeInTheDocument();
  });

  it('should setError on fetch error', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(() => Promise.reject(new Error('Error!')));
    await act(async () => {
      renderOverlay('/review');
    });
    const submit = screen.getByRole('button', { name: 'Make reservation.' });
    await act(async () => {
      await fireEvent.click(submit);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const errorText = screen.getByText(/Something went wrong/i);
    expect(errorText).toBeInTheDocument();
  });

  it('display a link to close the overlay', () => {
    const component = renderOverlay('/review');
    const exitLink = screen.getByRole('link');
    expect(exitLink).toBeInTheDocument();
    act(() => {
      fireEvent.click(exitLink);
    });

    expect(component.history.location.pathname).toEqual('/');
    expect(mockCloseOverlayFunction).toHaveBeenCalledTimes(1);
  });

  it('should display calendar on /calendar', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => mockCalendarFetch());
    await act(async () => {
      await renderOverlay('/calendar');
    });
    let text = screen.getByText('Wed');
    expect(text).toBeInTheDocument();
    text = screen.getByText('Fri');
    expect(text).toBeInTheDocument();
  });

  it('should display reservation on /reservation', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => mockFetch(200, 8));

    await act(async () => {
      await renderOverlay('/reservation');
    });

    const comboBoxes = screen.getAllByRole('combobox');
    expect(comboBoxes).toHaveLength(2);
    const text = screen.getByText(/Desired date/i);
    expect(text).toBeInTheDocument();
  });

  it('should display review on /review', () => {
    renderOverlay('/review');
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
    const text = screen.getByText(new RegExp(user.firstName));
    expect(text).toBeInTheDocument();
  });

  it('should display success on /success', () => {
    act(() => {
      renderOverlay('/success');
    });

    const success = screen.getByText(/Reservation was made successfully/i);
    expect(success).toBeInTheDocument();
  });
});
