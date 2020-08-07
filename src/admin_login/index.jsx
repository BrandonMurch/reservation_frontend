// Dependencies
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// Components
import Form from 'general_components/form';
import Banner, { bannerTypes } from 'general_components/banner';
import Loading from 'general_components/loading';
import { useTokenContext } from '../contexts/token_context';

// Stylesheets
import style from './admin_login.module.css';

const sendLogin = async function sendLoginRequestToServer(
  login,
  setError,
  setRedirect,
  setIsLoading,
  setToken,
) {
  setIsLoading(true);

  const body = JSON.stringify({
    username: login.username,
    password: login.password,
  });

  let response;
  try {
    response = await fetch('http://localhost:8080/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
  } catch (error) {
    setError(error.message);
    return;
  }

  let responseBody;
  try {
    responseBody = await response.json();
  } catch (error) {
    setError('Something went wrong... \n please try again later');
  }

  if (responseBody) {
    setIsLoading(false);
    if (response.status === 200 && responseBody.token) {
      setToken(responseBody.token);
      setRedirect('/admin-dashboard');
      return;
    }
    if (responseBody.message) {
      setError(responseBody.message);
      return;
    }
    setError('Something went wrong... \n please try again later');
    setIsLoading(false);
  }
};

const AdminLogin = function RenderAdminLoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState('');
  const [error, setError] = useState('');
  const { setToken } = useTokenContext();
  const inputs = [
    {
      name: 'username',
      type: 'text',
      label: 'Username',
      required: true,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      required: true,
    },
  ];
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={style.background}>
      {redirect && <Redirect to={redirect} />}
      {error && <Banner type={bannerTypes.ERROR} message={error} />}
      <div className={style.container}>
        <Form
          submitLabel="Login"
          inputs={inputs}
          onSubmit={(fields) => {
            sendLogin(fields, setError, setRedirect, setIsLoading, setToken);
            // }
          }}
        />
      </div>
    </div>
  );
};

export default AdminLogin;
