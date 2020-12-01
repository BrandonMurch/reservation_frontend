// Dependencies
import React from 'react';
import { screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { create } from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { mockFetch, renderWithRouter } from 'test_utils';
import { TokenContextProvider } from '../../contexts/token_context';

// Components
import AdminLogin from '../index';
import { BannerContextProvider } from 'contexts/banner_context';
import userEvent from '@testing-library/user-event';

const fillOutForm = async function fillOutAdminLoginForm() {
  const username = screen.getByLabelText(/Username/i);
  const password = screen.getByLabelText(/Password/i);
  const submit = screen.getByRole('button', { name: 'Login' });
  await act(async () => {
    await userEvent.type(username, 'string');
    await userEvent.type(password, 'string');
    await userEvent.click(submit);
  });
};

describe('<AdminLogin />', () => {
  let setBanner;

  const renderAdminLogin = function boilerplateForRenderingAdminLogin() {
    setBanner = jest.fn();
    return renderWithRouter(
      <BannerContextProvider value={setBanner}>
        <TokenContextProvider>
          <AdminLogin />
        </TokenContextProvider>
      </BannerContextProvider>,
      { route: '/admin-login' },
    );
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should match snapshot', () => {
    const tree = create(
      <TokenContextProvider>
        <Router>
          <AdminLogin />
        </Router>
      </TokenContextProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render email and password inputs', () => {
    renderAdminLogin();

    const emailInput = screen.getByLabelText(/Username/i);
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it('should render a submit button', () => {
    renderAdminLogin();

    const submitButton = screen.getByRole('button', { name: 'Login' });
    expect(submitButton).toBeInTheDocument();
  });

  it('should successfully redirect on login', async () => {
    const body = {
      token: 'this is a token',
    };

    global.fetch = jest.fn().mockImplementationOnce(() => mockFetch(200, body));

    const component = renderAdminLogin();

    await fillOutForm();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(component.history.location.pathname).toEqual('/admin');
  });

  it('should set error when server returns an error', async () => {
    global.fetch = jest.fn().mockImplementationOnce(() => mockFetch(400));
    renderAdminLogin();

    await fillOutForm();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(setBanner).toHaveBeenCalledWith({ value: 'error' }, 'Username or password was not correct');
  });
});
