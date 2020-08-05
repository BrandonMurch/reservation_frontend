// Dependencies
import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';

// Components
import Form from 'general_components/form';
import { requiredValidator } from 'general_components/form/validators';
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
    username: login.current.username,
    password: login.current.password,
  });

  try {
    const response = await fetch('http://localhost:8080/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

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
        setRedirect('/admin');
        return;
      }
      if (responseBody.message) {
        setError(responseBody.message);
        return;
      }
      setError('Something went wrong... \n please try again later');
    } else {
      setError('Something went wrong... \n please try again later');
    }
    setIsLoading(false);
  } catch (error) {
    setError(error.message);
  }
};

const AdminLogin = function RenderAdminLoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState('');
  const [error, setError] = useState('');
  const { setToken } = useTokenContext();
  const login = useRef({
    username: '',
    password: '',
  });
  const inputs = [
    {
      name: 'username',
      type: 'text',
      label: 'Username',
      validator: requiredValidator,
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
      validator: requiredValidator,
    },
  ];
  // TODO: add custom loading screen here.
  if (isLoading) {
    return <Loading />;
  }

  // FIXME: this form won't submit password if password box is still focussed.
  return (
    <div className={style.background}>
      {redirect && <Redirect to={redirect} />}
      {error && <Banner type={bannerTypes.ERROR} message={error} />}
      <div className={style.container}>
        <Form
          inputs={inputs}
          onSubmit={() => {
            sendLogin(login, setError, setRedirect, setIsLoading, setToken);
          }}
          onTextBlur={(value, name) => {
            login.current[name] = value;
          }}
          submitLabel="Login"
        />
      </div>
    </div>
  );
};

export default AdminLogin;
