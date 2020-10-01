// Dependencies
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

// Components
import Form from 'general_components/form';
import Banner, { bannerTypes } from 'general_components/banner';
import Loading from 'general_components/loading';
import { fetchWrapper } from 'shared/useFetch';
import { useTokenContext } from '../contexts/token_context';

// Stylesheets
import style from './admin_login.module.css';

/* FIXME:
    -- "Submitting..." stays in button, even after submission is complete
    -- After incorrect login, you must re-type information, or a "User Not Found" error is thrown

*/

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
            const notAuthorizedError = 'Username or password was not correct';

            fetchWrapper('/authenticate', 'POST', JSON.stringify(login))
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
            setIsLoading(false);
          }}
        />
      </div>
    </div>
  );
};

export default AdminLogin;
