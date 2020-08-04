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

describe('<AdminLogin />', () => {
  let component;
  let mockSetErrorFunction;
  let mockSetMessageFunction;
  let fetchSpy;
  let container = null;

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
      <Router>
        <AdminLogin setError={mockSetErrorFunction} setMessage={mockSetMessageFunction} />
      </Router>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render email and password inputs', () => {
    component = renderWithRouter(
      <TokenContextProvider>
        <AdminLogin setError={mockSetErrorFunction} setMessage={mockSetMessageFunction} />
      </TokenContextProvider>,
      { route: '/admin-login' },
    );

    const emailInput = component.getByLabelText(/Username/i);
    expect(emailInput).toBeInTheDocument();
    const passwordInput = component.getByLabelText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  it('should render a submit button', () => {
    component = renderWithRouter(
      <TokenContextProvider>
        <AdminLogin setError={mockSetErrorFunction} setMessage={mockSetMessageFunction} />
      </TokenContextProvider>,
      { route: '/admin-login' },
    );

    const submitButton = component.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
  });

  it('should successfully redirect on login', async () => {
    const body = {
      token: 'this is a token',
    };

    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch(200, body));

    component = renderWithRouter(
      <TokenContextProvider>
        <AdminLogin setError={mockSetErrorFunction} setMessage={mockSetMessageFunction} />
      </TokenContextProvider>,
      { route: '/admin-login' },
    );

    const submit = component.getByRole('button', { name: 'Submit' });
    await act(async () => {
      await fireEvent.click(submit);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    // TODO: Change this redirect to admin dashboard once created.
    expect(component.history.location.pathname).toEqual('/admin');
  });

  it('should set error when server returns an error', async () => {
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch(400));

    component = renderWithRouter(
      <TokenContextProvider>
        <AdminLogin setError={mockSetErrorFunction} setMessage={mockSetMessageFunction} />
      </TokenContextProvider>,
      { route: '/admin-login' },
    );

    const submit = component.getByRole('button', { name: 'Submit' });
    await act(async () => {
      await fireEvent.click(submit);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const errorMessage = component.getByText(/Something went wrong/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
