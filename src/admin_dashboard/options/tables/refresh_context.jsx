import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const RefreshTableListContext = createContext();

const RefreshTableListContextProvider = function BoilerPlateForTokenContextProvider({
  refreshFunction,
  children,
}) {
  return (
    <RefreshTableListContext.Provider value={refreshFunction}>
      {children}
    </RefreshTableListContext.Provider>
  );
};

RefreshTableListContextProvider.propTypes = {
  refreshFunction: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const useRefreshContext = function CustomHookToConsumeTokenContext() {
  return useContext(RefreshTableListContext);
};

export { useRefreshContext, RefreshTableListContextProvider };
