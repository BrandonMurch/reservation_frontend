// Dependencies
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// Components
import Form from 'general_components/form';
import Banner, { bannerTypes } from 'general_components/banner';
import Loading from 'general_components/loading';
import fetchWrapper from 'shared/fetch';
import { useTokenContext } from '../contexts/token_context';

// Stylesheets
import style from './admin_login.module.css';

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
          onSubmit={(login) => {
            setIsLoading(true);

            fetchWrapper('/authenticate', 'POST', JSON.stringify(login))
              .then(
                (response) => {
                  if (response.token) {
                    setToken(response.token);
                    setRedirect('/admin');
                  }
                },
                (e) => {
                  setError(e.message);
                },
              );
            setIsLoading(false); // }
          }}
        />
      </div>
    </div>
  );
};

export default AdminLogin;
