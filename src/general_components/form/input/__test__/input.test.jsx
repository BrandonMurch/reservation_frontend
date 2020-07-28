import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import renderer from 'react-test-renderer';

import Input from '../index';

describe('<Input />', () => {
  let component;
  let mockValidatorFunction;
  let mockBlurFunction;
  let container = null;
  let props;
  beforeEach(() => {
    mockBlurFunction = jest.fn();
    mockValidatorFunction = jest.fn(() => 'Error!');
    props = {
      updateValue: mockBlurFunction,
      type: 'text',
      name: 'textInput',
      label: 'This is a label',
      validator: mockValidatorFunction,
    };
    component = render(<Input {...props} />);
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  it('should match snapshot', () => {
    const tree = renderer.create(<Input {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should have a label and display text', () => {
    const label = component.getByText(/This is a label/i);
    expect(label).toBeInTheDocument();
    expect(label.htmlFor).toEqual('textInput');
  });
  it('should have an input box for text', () => {
    const input = component.getByRole('textbox');
    expect(input.type).toEqual('text');
    expect(input.name).toEqual('textInput');
  });
  it('should validate on blur', () => {
    const input = component.getByRole('textbox');
    fireEvent.change(input, {
      target: { value: 'input text' },
    });
    fireEvent.blur(input);
    expect(mockValidatorFunction).toHaveBeenCalled();
    expect(mockBlurFunction).toHaveBeenCalledWith('input text', 'textInput', true);
  });
});
