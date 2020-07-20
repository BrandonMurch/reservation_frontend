import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import renderer from 'react-test-renderer';

import CheckboxAndLabel from '../index';

describe('<CheckboxAndLabel />', () => {
  let component;
  let mockFunction;
  let container = null;
  beforeEach(() => {
    mockFunction = jest.fn();
    component = render(<CheckboxAndLabel
      label="checkbox label"
      name="checkbox name"
      onClick={mockFunction}
    />);
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  it('should match snapshot', () => {
    const tree = renderer.create(<CheckboxAndLabel
      label="checkbox label"
      name="checkbox name"
      onClick={mockFunction}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should display the checkbox label', () => {
    const element = component.getByText(/checkbox label/i);
    expect(element).toBeInTheDocument();
  });
  it('should perform the function on click', () => {
    const element = getByTestId(component.container, 'checkbox');
    fireEvent.click(element);
    expect(mockFunction).toHaveBeenCalled();
  });
});
