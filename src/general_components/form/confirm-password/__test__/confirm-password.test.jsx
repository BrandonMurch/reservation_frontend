import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import renderer from 'react-test-renderer';

import ConfirmPassword from '../index';

const fillForm = function fillForm(component) {
  let element = component.getByLabelText(/^Password/i);
  fireEvent.change(element, { target: { value: 'password' } });
  fireEvent.blur(element);
  element = component.getByLabelText(/Confirm/i);
  fireEvent.change(element, { target: { value: 'password' } });
  fireEvent.blur(element);
};

describe('<ConfirmPassword />', () => {
  let component;
  let mockFunction;
  let container = null;
  let props;

  beforeEach(() => {
    mockFunction = jest.fn();
    props = {
      updateValue: mockFunction,
    };
    component = render(<ConfirmPassword {...props} />);
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  it('should match snapshot', () => {
    const tree = renderer.create(<ConfirmPassword {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe('password', () => {
    it('should display the password label', () => {
      const element = component.getByText(/^Password/i);
      expect(element).toBeInTheDocument();
    });

    it('should call the function on blur', () => {
      fillForm(component);
      expect(mockFunction).toHaveBeenCalledWith('', 'password');
    });
  });
  describe('confirm password', () => {
    it('should display the confirm label', () => {
      const element = component.getByText(/Confirm Password/i);
      expect(element).toBeInTheDocument();
    });
    it('should call the function on blur', () => {
      fillForm(component);
      expect(mockFunction).toHaveBeenCalledWith('password', 'password');
    });
  });
});
