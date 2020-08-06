// Dependencies
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, useLocation } from 'react-router-dom';

// Components
import { useTokenContext } from '../contexts/token_context';
import Loading from '../general_components/loading';

const validateToken = async function verifyTokenWithServer(token, pathname) {
  // call server with token, page and permission
  if (pathname === undefined) {
    return false;
  }
  const requestedPermission = `VIEW_${pathname
    .slice(1)
    .toUpperCase()
    .replace('-', '_')}`;
  const body = JSON.stringify({
    token: `Bearer ${token}`,
    path: requestedPermission,
  });
  let response;
  try {
    response = await fetch('http://localhost:8080/validateToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  } catch (err) {
    console.error(err);
  }

  if (response.status === 200) {
    return true;
  }
  return false;
};

const AuthorizationWrapper = function CreateWrapperToAuthorizeToken({ children }) {
  const { pathname } = useLocation();
  const { token } = useTokenContext();

  const [isValidToken, setIsValidToken] = useState(null);

  useEffect(() => {
    async function updateIsValidToken() {
      const result = await validateToken(token, pathname);
      setIsValidToken(token && result);
    }
    updateIsValidToken();
  }, [token, pathname]);

  if (isValidToken == null) {
    return <Loading />;
  }
  if (isValidToken === true) {
    return <div>{children}</div>;
  }
  return <Redirect to="/admin-login" />;
};

AuthorizationWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthorizationWrapper;
