// Dependencies
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, useLocation } from 'react-router-dom';

// Components
import { useTokenContext } from '../contexts/token_context';
import Loading from '../general_components/loading';

const validateToken = async function verifyTokenWithServer(token, pathname) {
  const requestedPermission = `VIEW_${pathname
    .slice(1)
    .toUpperCase()
    .replace('-', '_')}`;
  let response;
  try {
    response = await fetch(`http://localhost:8080/validate?path=${requestedPermission}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
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
  const { getToken } = useTokenContext();

  const [isValidToken, setIsValidToken] = useState(null);

  useEffect(() => {
    async function updateIsValidToken() {
      if (!getToken || !pathname) {
        setIsValidToken(false);
      } else {
        const result = await validateToken(getToken, pathname);
        setIsValidToken(result);
      }
    }
    updateIsValidToken();
  }, [getToken, pathname]);

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
