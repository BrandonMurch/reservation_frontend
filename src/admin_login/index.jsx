// Dependencies
import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';

// Components
import Form from 'general_components/form';
import Banner, { bannerTypes } from 'general_components/banner';

// Stylesheets
import style from './admin_login.module.css';

const sendLogin = async function sendLoginRequestToServer(
  login,
  setError,
  setRedirect,
  setIsLoading,
) {
  setIsLoading(true);

  const body = JSON.stringify({
    login: login.current,
  });

  try {
    const response = await fetch('http://localhost:8080/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    if (response.status === 200) {
      setIsLoading(false);
      // TODO: Change this redirect to admin dashboard once created.
      setRedirect('/success');
    } else {
      let responseBody;
      try {
        responseBody = await response.json();
      } catch (error) {
        setError('Something went wrong... \n please try again later');
      }

      if (responseBody.message && responseBody.message !== '') {
        setError(responseBody.message);
      } else {
        setError('Something went wrong... \n please try again later');
      }
      setIsLoading(false);
    }
  } catch (error) {
    setError(error.message);
  }
};

const AdminLogin = function RenderAdminLoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState('');
  const [error, setError] = useState('');
  const login = useRef({
    email: '',
    password: '',
  });
  const inputs = [
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'password', type: 'password', label: 'Password' },
  ];
  // TODO: add custom loading screen here.
  if (isLoading) {
    return <div> Loading... </div>;
  }
  return (
    <div className={style.background}>
      {redirect && <Redirect to={redirect} />}
      {error && <Banner type={bannerTypes.ERROR} message={error} />}
      <div className={style.container}>
        <Form
          inputs={inputs}
          onSubmit={() => {
            sendLogin(login, setError, setRedirect, setIsLoading);
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
