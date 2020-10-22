// Dependencies
import quickSort from '../bookingQuickSort';

describe('Quicksort', () => {
  const timeArray = [
    { startTime: '1969-12-31T19:05:33,333-05:00' },
    { startTime: '1969-12-30T19:05:33,333-05:00' },
    { startTime: '1969-12-31T20:05:33,333-05:00' },
    { startTime: '1969-12-31T16:05:33,333-05:00' },
    { startTime: '1969-12-31T15:05:33,333-05:00' },
  ];
  quickSort(timeArray);
  it('should have the previous date as the first index', () => {
    expect(timeArray[0].startTime).toEqual('1969-12-30T19:05:33,333-05:00');
  });
  it('should have the latest time as the last index', () => {
    expect(timeArray[4].startTime).toEqual('1969-12-31T20:05:33,333-05:00');
  });
});
