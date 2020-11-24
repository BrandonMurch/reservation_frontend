// Dependencies
import React from 'react';
import {
  screen, waitForElementToBeRemoved,
} from '@testing-library/react';
import { mockFetch, renderWithRouter } from 'test_utils';

// Components
import Daily from '../index';

const bookings = [{
  id: 3,
  partySize: 1,
  userComments: null,
  restaurantComments: null,
  date: '2020-11-24',
  startTime: '2020-11-24T20:08:00',
  endTime: '2020-11-24T22:08:00',
  user: {
    id: 2,
    username: 'john@john.com',
    permissions: [],
    firstName: 'John',
    lastName: 'Johnson',
    phoneNumber: '+12 121212',
    termsAndConditions: false,
    comments: null,
  },
  tables: [
    {
      name: '2',
      seats: 2,
      priority: 1,
    },
  ],
}, {
  id: 6,
  partySize: 2,
  userComments: null,
  restaurantComments: null,
  date: '2020-11-24',
  startTime: '2020-11-24T20:09:00',
  endTime: '2020-11-24T22:09:00',
  user: {
    id: 5,
    username: 'j@j.com',
    permissions: [],
    firstName: 'John',
    lastName: '',
    phoneNumber: '+12 121212',
    termsAndConditions: false,
    comments: null,
  },
  tables: [
    {
      name: '22',
      seats: 2,
      priority: 0,
    },
  ],
}];

const tables = [{ name: '22', seats: 2, priority: 0 },
  { name: '2', seats: 2, priority: 1 },
  { name: 'a', seats: 2, priority: 2 }];

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
