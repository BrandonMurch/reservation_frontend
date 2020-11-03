// Dependencies
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// Components
import Form from 'general_components/form';
import { fetchWrapper } from 'shared/useFetch';
import { useTokenContext } from '../contexts/token_context';

// Stylesheets
import style from './admin_login.module.css';
import { useBannerContext, bannerTypes } from 'contexts/banner_context';

const AdminLogin = function RenderAdminLoginScreen() {
  const [redirect, setRedirect] = useState('');
  const setBanner = useBannerContext();
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
                  if (fetchError) {
                    setBanner(bannerTypes.ERROR, fetchError);
                  } else if (response && response.token) {
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
