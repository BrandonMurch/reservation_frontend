import React, { createContext, useContext, useRef } from 'react';
import PropTypes from 'prop-types';

const RefreshDailyBookingContext = createContext();

const RefreshDailyBookingContextProvider = function BoilerPlateForTokenContextProvider({
  refreshFunction,
  children,
}) {
  const func = useRef();
  func.current = refreshFunction;

  const tokenObject = {
    refresh: () => {
      func.current();
    },
  };

  return (
    <RefreshDailyBookingContext.Provider value={tokenObject}>
      {children}
    </RefreshDailyBookingContext.Provider>
  );
};

RefreshDailyBookingContextProvider.propTypes = {
  refreshFunction: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const useRefreshContext = function CustomHookToConsumeTokenContext() {
  return useContext(RefreshDailyBookingContext);
};

export { RefreshDailyBookingContext, useRefreshContext, RefreshDailyBookingContextProvider };
