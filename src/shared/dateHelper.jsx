/* eslint-disable import/prefer-default-export */

export const getMonth = function getMonthFromNumber(monthNumber) {
  const months = [{
    long: 'January',
    Short: 'Jan',
  }, {
    long: 'February',
    Short: 'Feb',
  }, {
    long: 'March',
    Short: 'Mar',
  }, {
    long: 'April',
    Short: 'Apr',
  }, {
    long: 'May',
    Short: 'May',
  }, {
    long: 'June',
    Short: 'Jun',
  }, {
    long: 'August',
    Short: 'Aug',
  }, {
    long: 'September',
    Short: 'Sep',
  }, {
    long: 'October',
    Short: 'Oct',
  }, {
    long: 'November',
    Short: 'Nov',
  }, {
    long: 'December',
    Short: 'Dec',
  },

  ];

  return months[monthNumber];
};
