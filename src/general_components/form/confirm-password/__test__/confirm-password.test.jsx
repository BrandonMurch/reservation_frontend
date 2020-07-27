import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import renderer from 'react-test-renderer';

import ConfirmPassword from '../index';

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
      const element = getByTestId(component.container, 'password');
      fireEvent.change(element, { target: { value: 'password' } });
      fireEvent.blur(element);
      expect(mockFunction).toHaveBeenCalledWith('password', 'password', true);
    });
  });
  describe('confirm password', () => {
    it('should display the confirm label', () => {
      const element = component.getByText(/Confirm Password/i);
      expect(element).toBeInTheDocument();
    });
    it('should call the function on blur', () => {
      let element = getByTestId(component.container, 'password');
      fireEvent.change(element, { target: { value: 'password' } });
      fireEvent.blur(element);
      expect(mockFunction).toHaveBeenCalledWith('password', 'password', true);
      element = getByTestId(component.container, 'confirm-password');
      fireEvent.change(element, { target: { value: 'password' } });
      fireEvent.blur(element);
      expect(mockFunction).toHaveBeenCalledWith('password', 'password', false);
    });
  });
});
