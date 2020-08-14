// Dependencies
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { create } from 'react-test-renderer';
import { renderWithRouter } from 'test_utils';

// Components
import NavBar from '../index';

describe('<NavBar />', () => {
  let component;
  let container = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    component = renderWithRouter(
      <NavBar>
        <div data-testid="testChild" />
      </NavBar>,
      { route: '/admin' },
    );
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should match snapshot', () => {
    const tree = create(
      <NavBar>
        <div data-testid="testChild" />
      </NavBar>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render children', () => {
    const child = component.getByTestId('testChild');
    expect(child).toBeInTheDocument();
  });
});
