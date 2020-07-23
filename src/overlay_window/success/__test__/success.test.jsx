import React from 'react';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { create } from 'react-test-renderer';

import Success from '../index';

describe('<Success />', () => {
  let component;
  let container = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    component = render(<Success />);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should match snapshot', () => {
    const tree = create(<Success />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display success message', () => {
    const element = component.getByText(/Reservation was made successfully/i);
    expect(element).toBeInTheDocument();
  });
});
