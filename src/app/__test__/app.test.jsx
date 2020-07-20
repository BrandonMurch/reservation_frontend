import React from 'react';
import {
  render, fireEvent, getByTestId,
} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
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
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should display text', () => {
    const { getByText } = render(<App />);
    const linkElement = getByText('Click here to make a reservation');
    expect(linkElement).toBeInTheDocument();
  });
  it('should open overlay window when link is clicked', () => {
    const { container } = render(<App />);
    const calendarLink = getByTestId(container, 'opening-link-calendar');
    fireEvent.click(calendarLink);
    const overlayWindow = getByTestId(container, 'overlay-window');
    expect(overlayWindow).toBeInTheDocument();
  });
});
