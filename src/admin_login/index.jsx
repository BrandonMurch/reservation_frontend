// Dependencies
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// Components
import Form from 'general_components/form';
import Banner, { bannerTypes } from 'general_components/banner';
import { fetchWrapper } from 'shared/useFetch';
import { useTokenContext } from '../contexts/token_context';

// Stylesheets
import style from './admin_login.module.css';

const AdminLogin = function RenderAdminLoginScreen() {
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
  return (
    <div className={style.background}>
      {redirect && <Redirect to={redirect} />}
      {error && <Banner type={bannerTypes.ERROR} message={error} />}
      <div className={style.container}>
        <Form
          resetChildrenOnSubmit
          submitLabel="Login"
          inputs={inputs}
          onSubmit={(login) => {
            const notAuthorizedError = 'Username or password was not correct';
            fetchWrapper('/authenticate', { method: 'POST', body: JSON.stringify(login) })
              .then(
                (res) => {
                  const { response, status } = res;
                  const fetchError = status >= 400 && status < 500 ? notAuthorizedError : res.error;
                  setError(fetchError);
                  if (response && response.token) {
                    setToken(response.token);
                    setRedirect('/admin');
                  }
                },
              );
          }}
        />
      </div>
    </div>
  );
};

export default AdminLogin;
