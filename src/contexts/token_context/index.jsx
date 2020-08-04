import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const TokenContext = createContext({
  token: 'not a token',
  setToken: (jwt) => {
    this.token = jwt;
  },
});

const TokenContextProvider = function BoilerPlateForTokenContextProvider({ children }) {
  const [token, setToken] = useState(null);
  return <TokenContext.Provider value={{ token, setToken }}>{children}</TokenContext.Provider>;
};

TokenContextProvider.propTypes = {
  children: PropTypes.shape(PropTypes.element.isRequired).isRequired,
};

export default TokenContext;
export { TokenContextProvider };
