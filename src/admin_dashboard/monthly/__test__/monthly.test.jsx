// Dependencies
import React from 'react';
import {
  screen, waitFor, waitForElementToBeRemoved,
} from '@testing-library/react';
import { mockFetch, renderWithRouter } from 'test_utils';

// Components
import Monthly from '../index';
import { TokenContextProvider } from 'contexts/token_context';
import userEvent from '@testing-library/user-event';

describe('<Monthly />', () => {
  const today = new Date();
  const getTwoDigitString = (number) => (number.toLocaleString('en-us', { minimumIntegerDigits: 2 }));
  const todayString = `${today.getFullYear()}-${getTwoDigitString(today.getUTCMonth() + 1)}-${getTwoDigitString(today.getUTCDate())}`;
  const mockCounts = { [todayString]: 10 };
  let fetchSpy;
  let component;

  beforeEach(async () => {
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch(200, mockCounts));
    component = renderWithRouter(
      <TokenContextProvider>
        <Monthly />
      </TokenContextProvider>,
      { route: '/admin/monthly' },
    );

    await waitForElementToBeRemoved(() => screen.queryByLabelText(/loading/i));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should expect fetch to be called', () => {
    expect(fetchSpy).toBeCalled();
  });

  it('should display booking counts in date cells', () => {
    expect(screen.getByText(/10 reservation/i)).toBeInTheDocument();
  });

  it('should redirect when a date cell is clicked', async () => {
    const dateCell = screen.getByText(today.getDate());
    userEvent.click(dateCell);
    await waitFor(() => expect(component.history.location.pathname).toEqual('/admin/daily'));
    expect(component.history.location.search).toEqual(`?date=${todayString}`);
  });
});
