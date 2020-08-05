import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const TokenContext = createContext();

const TokenContextProvider = function BoilerPlateForTokenContextProvider({
  defaultValue,
  children,
}) {
  let token = defaultValue;

  const setToken = (newToken) => {
    token = newToken;
  };

  return <TokenContext.Provider value={{ token, setToken }}>{children}</TokenContext.Provider>;
};

TokenContextProvider.propTypes = {
  defaultValue: PropTypes.string,
};

TokenContextProvider.defaultProps = {
  defaultValue: null,
};

const useTokenContext = function CustomHookToConsumeTokenContext() {
  return useContext(TokenContext);
};

export { TokenContext, useTokenContext, TokenContextProvider };
