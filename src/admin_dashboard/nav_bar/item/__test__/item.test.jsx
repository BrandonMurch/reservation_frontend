// Dependencies
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { create } from 'react-test-renderer';
import { renderWithRouter } from 'test_utils';
import { BrowserRouter as Router } from 'react-router-dom';

// Components
import { fireEvent } from '@testing-library/react';
import Item from '../index';

describe('<Item />', () => {
  let component;
  let container = null;
  const props = {
    label: 'Label', to: '/To',
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    component = renderWithRouter(<Item {...props} />, { route: '/admin' });
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should match snapshot', () => {
    const tree = create(
      <Router>
        <Item {...props} />

      </Router>,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display label', () => {
    const label = component.getByText(/Label/i);
    expect(label).toBeInTheDocument();
  });

  it('should redirect on click', () => {
    const link = component.getByRole('link');
    fireEvent.click(link);
    expect(component.history.location.pathname).toEqual('/To');
  });
});
