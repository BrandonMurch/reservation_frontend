import React, { createContext, useContext, useRef } from 'react';
import PropTypes from 'prop-types';

const TokenContext = createContext();

const TokenContextProvider = function BoilerPlateForTokenContextProvider({
  defaultValue,
  children,
}) {
  // const [token, setToken] = useState(defaultValue);
  const token = useRef(defaultValue);

  const tokenObject = {
    setToken: (newToken) => {
      token.current = newToken;
    },
    get getToken() {
      return token.current;
    },
  };
  // const setToken = (newToken) => {
  //   token.current = newToken;
  // };
  //
  // function getToken() {
  //   return token.current;
  // }

  return <TokenContext.Provider value={tokenObject}>{children}</TokenContext.Provider>;
};

TokenContextProvider.propTypes = {
  defaultValue: PropTypes.string,
  children: PropTypes.node.isRequired,
};

TokenContextProvider.defaultProps = {
  defaultValue: null,
};

const useTokenContext = function CustomHookToConsumeTokenContext() {
  return useContext(TokenContext);
};

export { TokenContext, useTokenContext, TokenContextProvider };
