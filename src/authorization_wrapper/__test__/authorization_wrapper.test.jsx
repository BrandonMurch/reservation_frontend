// Dependencies
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mockFetch, renderWithRouter } from 'test_utils';

// Components
import AuthorizationWrapper from '../index';
import { TokenContextProvider } from '../../contexts/token_context';

describe('<AuthorizationWrapper />', () => {
  const TestComponent = function createTestComponent() {
    return <h1>hello world</h1>;
  };
  let component;
  let fetchSpy;
  let container = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (fetchSpy) {
      fetchSpy.mockClear();
    }
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should display when there is both a valid token, and the token is validated by the server', async () => {
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch(200));

    await act(async () => {
      component = await renderWithRouter(
        <TokenContextProvider defaultValue="TOKEN">
          <AuthorizationWrapper>
            <TestComponent />
          </AuthorizationWrapper>
        </TokenContextProvider>,
        { route: '/admin-dashboard' },
      );
    });
    const testComponentText = component.getByText(/hello world/i);
    expect(testComponentText).toBeInTheDocument();
  });

  it("should redirect to login if there is no token, or the server doesn't validate the token", async () => {
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => mockFetch(400));

    await act(async () => {
      component = await renderWithRouter(
        <TokenContextProvider defaultValue="">
          <AuthorizationWrapper>
            <TestComponent />
          </AuthorizationWrapper>
        </TokenContextProvider>,
        { route: '/admin-dashboard' },
      );
    });

    let testComponentText = component.queryByText(/hello world/i);
    expect(testComponentText).not.toBeInTheDocument();

    await act(async () => {
      component = await renderWithRouter(
        <TokenContextProvider defaultValue="TOKEN">
          <AuthorizationWrapper>
            <TestComponent />
          </AuthorizationWrapper>
        </TokenContextProvider>,
        { route: '/admin-dashboard' },
      );
    });

    testComponentText = component.queryByText(/hello world/i);
    expect(testComponentText).not.toBeInTheDocument();
    expect(component.history.location.pathname).toEqual('/admin-login');
  });
});
