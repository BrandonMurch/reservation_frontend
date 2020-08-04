import { createContext } from 'react';

const tokenContext = createContext({
  jwt: undefined,
  setJwt: (jwt) => {
    this.jwt = jwt;
  },
});

export default tokenContext;
