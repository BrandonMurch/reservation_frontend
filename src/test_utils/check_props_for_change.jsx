import { useRef } from 'react';

const checkProps = (oldProps, newProps) => {
  const oldKeys = Object.keys(oldProps);
  const oldValues = Object.values(oldProps);
  const newValues = Object.values(newProps);
  // eslint-disable-next-line
  for (const index in oldKeys) {
    if (oldValues[index] !== newValues[index]) {
      // eslint-disable-next-line
      console.log(oldKeys[index], ' has changed.');
    }
  }
};

const useCheckPropsForChange = (props) => {
  const oldProps = useRef();
  if (oldProps.current) {
    checkProps(oldProps.current, props);
  }
  oldProps.current = props;
};

export default useCheckPropsForChange;
