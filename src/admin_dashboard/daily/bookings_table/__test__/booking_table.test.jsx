// Dependencies
import React from 'react';
import {
  render, screen, waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RefreshDailyBookingContextProvider } from 'admin_dashboard/daily/refresh_booking_context';

// Components
import BookingTable from '../index';

// Mocked variables
import { exampleBooking1, exampleBooking2, tables } from 'test_utils/examples';
import { mockFetch } from 'test_utils';

describe('<BookingTable />', () => {
  const refreshMock = jest.fn();
  const props = {
    bookings: [exampleBooking1, exampleBooking2],
    date: exampleBooking2.date,
  };
  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch(200, tables));
    render(
      <RefreshDailyBookingContextProvider refreshFunction={refreshMock}>
        <BookingTable {...props} />
      </RefreshDailyBookingContextProvider>,
    );

    await waitForElementToBeRemoved(() => screen.queryAllByLabelText('loading'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display create booking overlay when "Make a booking" button is clicked', async () => {
    const makeBookingButton = screen.getByRole('button', { name: /Make a booking/i });
    userEvent.click(makeBookingButton);
    expect(await screen.findByLabelText(/start time/i));
  });

  it('should display headers', () => {
    expect(screen.getByText(/time/i));
  });

  it('should display the hour heading', () => {
    const expectedHour = `${exampleBooking1.startTime.slice(11, 13)}:00`;
    expect(screen.getByText(expectedHour)).toBeInTheDocument();
  });

  it('should display the booking', () => {
    expect(screen.getByText(new RegExp(exampleBooking1.user.firstName)));
    expect(screen.getByText(exampleBooking1.partySize.toString()));
  });

  const getOrderedBookings = function returnBookingsInOrder() {
    const list = [exampleBooking1, exampleBooking2];
    const returnList = [];
    if (exampleBooking1.startTime < exampleBooking2.startTime) {
      returnList.push(list.splice(0, 1)[0]);
    } else {
      returnList.push(list.splice(1, 1)[0]);
    }
    returnList.push(list.splice(0, 1)[0]);

    return returnList;
  };

  it('should display the bookings in order', () => {
    const bookings = getOrderedBookings();
    const rows = screen.getByTestId(exampleBooking1.user.firstName).parentElement.children;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].getAttribute('data-testid') === bookings[0].user.firstName) {
        break;
      } else if (rows[i].getAttribute('data-testid') === bookings[1].user.firstName) {
        throw new Error('Tests are out of order');
      }
    }
  });

  it('should display edit booking overlay when "Edit" button is clicked', async () => {
    const editButton = screen.getAllByRole('button', { name: /edit/i })[0];
    userEvent.click(editButton);
    expect(await screen.findByLabelText(/start time/i));
  });
});
