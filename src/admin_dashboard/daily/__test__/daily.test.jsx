// Dependencies
import React from 'react';
import {
  screen, waitForElementToBeRemoved,
} from '@testing-library/react';
import { mockFetch, renderWithRouter } from 'test_utils';
import { exampleBooking1, exampleBooking2, tables } from 'test_utils/examples';

// Components
import Daily from '../index';

const bookings = [exampleBooking1, exampleBooking2];

describe('<Daily />', () => {
  const props = {
    location: { search: '?date=2020-11-24' },
  };
  beforeEach(async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementationOnce(() => mockFetch(200, bookings))
      .mockImplementation(() => mockFetch(200, tables));

    renderWithRouter(
      <Daily {...props} />, { route: '/admin/daily?date=2020-11-24' },
    );

    await waitForElementToBeRemoved(() => screen.queryByRole('presentation'));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display <Header />', () => {
    expect(screen.getAllByText('➤')[0]).toBeInTheDocument();
  });

  it('display <Bookings />', () => {
    expect(screen.getAllByText('John')[0]).toBeInTheDocument();
  });
});
