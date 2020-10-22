import { useReducer } from 'react';
import moment from 'moment';

const useTimeHandler = (initialDate) => {
  const initialDateObject = {
    dateObject: moment(initialDate),
  };

  const handleMonthWrapping = (number) => {
    if (number > 11) {
      return 0;
    } if (number < 0) {
      return 11;
    }
    return number;
  };

  const reducer = ((state, action) => {
    switch (action.type) {
      case 'prev':
        return { dateObject: state.dateObject.subtract(1, action.unit) };
      case 'next':
        return { dateObject: state.dateObject.add(1, action.unit) };
      case 'jumpUnit': {
        let number = state.dateObject.get(action.unit) + (action.number);
        const set = {};
        if (action.unit === 'months') {
          number = handleMonthWrapping(number);
          set.year = state.dateObject.year();
        }
        set[action.unit] = number;
        return { dateObject: state.dateObject.set(set) };
      }
      case 'current':
        return { dateObject: moment() };
      case 'goTo':
        return { dateObject: moment(action.date) };
      case 'set':
        return { dateObject: state.dateObject.set(action.unit, action.number) };
      default: throw new Error('No such action exists.');
    }
  });
  const [{ dateObject }, dispatchDate] = useReducer(reducer, initialDateObject);

  return { dateObject, dispatchDate };
};

export default useTimeHandler;
