// Dependencies
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { unmountComponentAtNode } from 'react-dom';
import { create } from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import { mockFetch, renderWithRouter } from 'test_utils';
import { TokenContextProvider } from '../../contexts/token_context';

// Components
import AdminLogin from '../index';

const fillInInput = async function enterTextIntoInput(element) {
  await fireEvent.focus(element);
  await fireEvent.change(element, { target: { value: 'String' } });
  await fireEvent.blur(element);
};

const fillOutForm = async function fillOutAdminLoginForm(component) {
  const username = component.getByLabelText(/Username/i);
  const password = component.getByLabelText(/Password/i);
  const submit = component.getByRole('button', { name: 'Submit' });
  await act(async () => {
    await fillInInput(username);
    await fillInInput(password);
    await fireEvent.click(submit);
  });
};

describe('<AdminLogin />', () => {
  let component;
  let mockSetErrorFunction;
  let mockSetMessageFunction;
  let fetchSpy;
  let container = null;

  const renderAdminLogin = function boilerplateForRenderingAdminLogin() {
    return renderWithRouter(
      <TokenContextProvider>
        <AdminLogin setError={mockSetErrorFunction} setMessage={mockSetMessageFunction} />
      </TokenContextProvider>,
      { route: '/admin-login' },
    );
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    mockSetErrorFunction = jest.fn();
    mockSetMessageFunction = jest.fn();
  });

  afterEach(() => {
    if (fetchSpy) {
      fetchSpy.mockClear();
    }
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should match snapshot', () => {
    const tree = create(
      <TokenContextProvider>
        <Router>
          <AdminLogin setError={mockSetErrorFunction} setMessage={mockSetMessageFunction} />
        </Router>
      </TokenContextProvider>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render email and password inputs', () => {
    component = renderAdminLogin();

    const emailInput = component.getByLabelText(/Username/i);
    expect(emailInput).toBeInTheDocument();
    const passwordInput = component.getByLabelText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it('should render a submit button', () => {
    component = renderAdminLogin();

    const submitButton = component.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
  });

  it('should successfully redirect on login', async () => {
    const body = {
      token: 'this is a token',
    };

    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch(200, body));

    component = renderAdminLogin();

    await fillOutForm(component);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(component.history.location.pathname).toEqual('/admin');
  });

  it('should set error when server returns an error', async () => {
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch(400));
    component = renderAdminLogin();

    await fillOutForm(component);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const errorMessage = component.getByText(/Something went wrong/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
