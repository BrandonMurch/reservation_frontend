export const exampleBooking1 = {
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
};

export const exampleBooking2 = {
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
    firstName: 'Albert',
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
};

export const tables = [
  { name: '22', seats: 2, priority: 0 },
  { name: '2', seats: 2, priority: 1 },
  { name: 'a', seats: 2, priority: 2 },
];
