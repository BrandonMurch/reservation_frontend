/* eslint-disable import/prefer-default-export */

export const getMonth = function getMonthFromNumber(monthNumber) {
  const months = [
    {
      long: 'January',
      short: 'Jan',
    }, {
      long: 'February',
      short: 'Feb',
    }, {
      long: 'March',
      short: 'Mar',
    }, {
      long: 'April',
      short: 'Apr',
    }, {
      long: 'May',
      short: 'May',
    }, {
      long: 'June',
      short: 'Jun',
    }, {
      long: 'July',
      short: 'Jul',
    }, {
      long: 'August',
      short: 'Aug',
    }, {
      long: 'September',
      short: 'Sep',
    }, {
      long: 'October',
      short: 'Oct',
    }, {
      long: 'November',
      short: 'Nov',
    }, {
      long: 'December',
      short: 'Dec',
    },

  ];

  return months[monthNumber];
};

export const getDayOfWeek = (index) => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  if (index) {
    return daysOfWeek[index];
  }

  return daysOfWeek;
};
