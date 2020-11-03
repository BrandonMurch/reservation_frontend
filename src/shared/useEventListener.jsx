import { useEffect } from 'react';

const useEventListener = (event, func) => {
  useEffect(() => {
    window.addEventListener(event, func);
    return () => {
      window.removeEventListener(event, func);
    };
  }, [event, func]);
};

export default useEventListener;
