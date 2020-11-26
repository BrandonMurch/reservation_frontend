// Dependencies
import React from 'react';
import {
  render, fireEvent, screen, waitForElementToBeRemoved,
} from '@testing-library/react';
import { create, act } from 'react-test-renderer';
import { exampleBooking1, tables } from 'test_utils/examples';
import { mockFetch } from 'test_utils';
import { RefreshDailyBookingContextProvider } from 'admin_dashboard/daily/refresh_booking_context';

// Components
import RestaurantTable from '../index';
import userEvent from '@testing-library/user-event';

describe('<RestaurantTable />', () => {
  let fetchSpy;
  const mockRefresh = jest.fn();
  const props = {
    booking: exampleBooking1,
  };
  beforeEach(async () => {
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch(200, tables));
    render(
      <RefreshDailyBookingContextProvider refreshFunction={() => mockRefresh}>
        <RestaurantTable {...props} />
        ,
      </RefreshDailyBookingContextProvider>,
    );

    await waitForElementToBeRemoved(() => screen.queryByRole('presentation'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', async () => {
    let tree;
    await act(async () => {
      tree = await create(
        <RefreshDailyBookingContextProvider refreshFunction={() => mockRefresh}>
          <RestaurantTable {...props} setIsLoading={jest.fn()} tableList={tables} />
          ,
        </RefreshDailyBookingContextProvider>,
      );
    });

    expect(tree).toMatchSnapshot();
  });
  it('should display the table within the input box', () => {
    const input = screen.getByRole('textbox', { name: 'Restaurant Table' });
    expect(input.value).toEqual('2');
  });
  it('should call fetch on blur', async () => {
    const input = screen.getByRole('textbox', { name: 'Restaurant Table' });
    userEvent.type(input, 'a');
    fireEvent.blur(input);

    await waitForElementToBeRemoved(() => screen.queryByLabelText('loading'));
    expect(fetchSpy).toHaveBeenCalledTimes(2);
  });
});
