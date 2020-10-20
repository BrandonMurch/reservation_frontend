import { useReducer } from 'react';
import moment from 'moment';

const useTimeHandler = (initialDate = moment()) => {
  const initialDateObject = {
    dateObject: moment(initialDate),
  };
  const reducer = ((state, action) => {
    switch (action.type) {
      case 'prev':
        return { dateObject: state.dateObject.subtract(1, action.unit) };
      case 'next':
        return { dateObject: state.dateObject.add(1, action.unit) };
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
