import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import renderer from 'react-test-renderer';

import CheckboxAndLabel from '../index';

describe('<CheckboxAndLabel />', () => {
  let component;
  let mockFunction;
  let container = null;
  let props;

  beforeEach(() => {
    mockFunction = jest.fn();
    props = {
      label: 'checkbox label',
      name: 'checkbox name',
      updateValue: mockFunction,
    };
    component = render(<CheckboxAndLabel {...props} />);
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  it('should match snapshot', () => {
    const tree = renderer.create(<CheckboxAndLabel {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should display the checkbox label', () => {
    const element = component.getByText(/checkbox label/i);
    expect(element).toBeInTheDocument();
  });
  it('should perform the function on click', () => {
    const element = component.getByRole('checkbox');
    fireEvent.click(element);
    expect(mockFunction).toHaveBeenCalled();
  });
});
