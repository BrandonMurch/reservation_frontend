// Dependencies
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { create } from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { renderWithRouter, mockFetch } from 'test_utils';

// Components
import OverlayWindow from '../index';

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
    json: () => mockJsonPromise,
  });
};

describe('<OverlayWindow />', () => {
  let component;
  let mockCloseOverlayFunction;
  let fetchSpy;
  let container = null;
  const reservation = {
    date: '2020-10-10',
    time: '21:00',
    partySize: 2,
  };
  const user = {
    firstName: 'john',
    lastName: 'johnson',
    email: 'john@john.com',
    phoneNumber: '+1 123456787',
    tAC: true,
  };
  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    mockCloseOverlayFunction = jest.fn();
  });

  afterEach(() => {
    if (fetchSpy) {
      fetchSpy.mockClear();
    }
    unmountComponentAtNode(container);
    container.remove();
    container = null;
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
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch(201));

    component = await renderWithRouter(
      <OverlayWindow
        closeOverlay={mockCloseOverlayFunction}
        reservationInfo={reservation}
        userInfo={user}
      />,
      { route: '/review' },
    );
    const submit = component.getByRole('button', { name: 'Make reservation.' });
    await act(async () => {
      await fireEvent.click(submit);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(component.history.location.pathname).toEqual('/success');
  });

  it('should setError on server error', async () => {
    fetchSpy = jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => mockFetch(409, { message: 'Error!' }));

    component = renderWithRouter(
      <OverlayWindow
        closeOverlay={mockCloseOverlayFunction}
        reservationInfo={reservation}
        userInfo={user}
      />,
      { route: '/review' },
    );
    const submit = component.getByRole('button', { name: 'Make reservation.' });

    await act(async () => {
      await fireEvent.click(submit);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const errorText = component.getByText('Error!');
    expect(errorText).toBeInTheDocument();
  });

  it('should setError on fetch error', async () => {
    fetchSpy = jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.reject(new Error('Error!')));

    component = await renderWithRouter(
      <OverlayWindow
        closeOverlay={mockCloseOverlayFunction}
        reservationInfo={reservation}
        userInfo={user}
      />,
      { route: '/review' },
    );
    const submit = component.getByRole('button', { name: 'Make reservation.' });
    await act(async () => {
      await fireEvent.click(submit);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const errorText = component.getByText('Error!');
    expect(errorText).toBeInTheDocument();
  });

  it('display a link to close the overlay', () => {
    component = renderWithRouter(
      <OverlayWindow
        closeOverlay={mockCloseOverlayFunction}
        reservationInfo={reservation}
        userInfo={user}
      />,
      { route: '/review' },
    );
    const exitLink = component.getByRole('link');
    expect(exitLink).toBeInTheDocument();
    act(() => {
      fireEvent.click(exitLink);
    });

    expect(component.history.location.pathname).toEqual('/');
    expect(mockCloseOverlayFunction).toHaveBeenCalledTimes(1);
  });

  it('should display calendar on /calendar', async () => {
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => mockCalendarFetch());
    await act(async () => {
      component = await renderWithRouter(
        <OverlayWindow
          closeOverlay={mockCloseOverlayFunction}
          reservationInfo={reservation}
          userInfo={user}
        />,
        { route: '/calendar' },
      );
    });
    let text = component.getByText('Wed');
    expect(text).toBeInTheDocument();
    text = component.getByText('Fri');
    expect(text).toBeInTheDocument();
  });

  it('should display reservation on /reservation', () => {
    component = renderWithRouter(
      <OverlayWindow
        closeOverlay={mockCloseOverlayFunction}
        reservationInfo={reservation}
        userInfo={user}
      />,
      { route: '/reservation' },
    );

    const comboBoxes = component.getAllByRole('combobox');
    expect(comboBoxes).toHaveLength(2);
    const text = component.getByText(/Desired date/i);
    expect(text).toBeInTheDocument();
  });

  it('should display review on /review', () => {
    component = renderWithRouter(
      <OverlayWindow
        closeOverlay={mockCloseOverlayFunction}
        reservationInfo={reservation}
        userInfo={user}
      />,
      { route: '/review' },
    );
    const buttons = component.getAllByRole('button');
    expect(buttons).toHaveLength(4);
    const text = component.getByText(new RegExp(user.firstName));
    expect(text).toBeInTheDocument();
  });

  it('should display success on /success', () => {
    act(() => {
      component = renderWithRouter(
        <OverlayWindow
          closeOverlay={mockCloseOverlayFunction}
          reservationInfo={reservation}
          userInfo={user}
        />,
        { route: '/success' },
      );
    });

    const success = component.getByText(/Reservation was made successfully/i);
    expect(success).toBeInTheDocument();
  });
});
