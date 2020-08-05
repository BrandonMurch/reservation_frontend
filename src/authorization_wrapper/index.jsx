// Dependencies
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

// Components
import { useTokenContext } from '../contexts/token_context';
import Loading from '../general_components/loading';

const validateToken = async function verifyTokenWithServer(token) {
  // call server with token, page and permission
  const body = JSON.stringify({
    token: `Bearer ${token}`,
    // page:  -- how to get the page name out of children
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
  const { token } = useTokenContext();

  const [isValidToken, setIsValidToken] = useState(null);

  useEffect(() => {
    async function updateIsValidToken() {
      const result = await validateToken(token);
      setIsValidToken(token && result);
    }
    updateIsValidToken();
  }, [token]);

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
