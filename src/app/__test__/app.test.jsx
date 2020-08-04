// Dependencies
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { renderWithRouter } from 'test_utils';

// Components
import App from '../index';

describe('<App />', () => {
  let appContainer = null;
  beforeEach(() => {
    appContainer = document.createElement('div');
    document.body.appendChild(appContainer);
  });

  afterEach(() => {
    unmountComponentAtNode(appContainer);
    appContainer.remove();
    appContainer = null;
  });

  it('should match snapshot', () => {
    const component = renderer.create(
      <Router>
        <App />
      </Router>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should display text', () => {
    const component = renderWithRouter(<App />, { route: '/' });
    const linkElement = component.getByText('Click here to make a reservation');
    expect(linkElement).toBeInTheDocument();
  });
  it('should open overlay window when link is clicked', () => {
    const component = renderWithRouter(<App />, { route: '/' });
    const calendarLink = component.getByTestId('opening-link-calendar');
    fireEvent.click(calendarLink);
    const overlayWindow = component.getByTestId('overlay-window');
    expect(overlayWindow).toBeInTheDocument();
  });
  it('should display admin login at /admin-login', () => {
    const component = renderWithRouter(<App />, { route: '/admin-login' });

    const emailInput = component.getByLabelText(/Username/i);
    expect(emailInput).toBeInTheDocument();
    const passwordInput = component.getByLabelText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
  });
});
