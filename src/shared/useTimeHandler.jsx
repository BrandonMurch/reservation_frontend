import { useReducer } from 'react';
import moment from 'moment';

const useTimeHandler = (timeDuration, initialDate = moment().format()) => {
  const initialDateObject = {
    dateObject: moment(initialDate),
  };
  const reducer = ((state, action) => {
    switch (action) {
      case 'prev':
        return { dateObject: state.dateObject.subtract(1, timeDuration) };
      case 'next':
        return { dateObject: state.dateObject.add(1, timeDuration) };
      case 'current':
        return { dateObject: moment() };
      default: throw new Error('No such action exists.');
    }
  });
  const [{ dateObject }, dispatchDate] = useReducer(reducer, initialDateObject);

  return { dateObject, dispatchDate };
};

export default useTimeHandler;
