import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import renderer from 'react-test-renderer';

import Form from '../index';

const getInputs = function getMockedInputsForTest() {
  return [
    { name: 'firstName', type: 'text', label: 'First Name' },
    { name: 'lastName', type: 'text', label: 'Last Name' },
    { name: 'email', type: 'email', label: 'Email' },
    {
      name: 'phoneNumber',
      type: 'tel',
      label: 'Phone Number',
      validator(phone) {
        if (/^\+\d{1,3} \d{6,14}$/.test(phone)) {
          return '';
        }

        return 'Phone number must be in the format of +1 123456789 where 1 is the country code, followed by the phone number';
      },
    },
    {
      name: 'tAC',
      type: 'checkbox',
      label: 'Yes, I agree to the terms and conditions',
    },
  ];
};

describe('<Form />', () => {
  let component;
  let mockSubmitFunction;
  let mockBlurFunction;
  let mockClickFunction;
  const inputs = getInputs();
  let container = null;
  beforeEach(() => {
    mockBlurFunction = jest.fn();
    mockSubmitFunction = jest.fn();
    mockClickFunction = jest.fn();
    component = render(
      <Form
        inputs={inputs}
        onSubmit={mockSubmitFunction}
        onTextBlur={mockBlurFunction}
        onCheckboxClick={mockClickFunction}
        submitLabel="Submit"
      />,
    );
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  it('should match snapshot', () => {
    const tree = renderer
      .create(
        <Form
          inputs={inputs}
          onSubmit={mockSubmitFunction}
          onTextBlur={mockBlurFunction}
          onCheckboxClick={mockClickFunction}
          submitLabel="Submit"
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should choose which input to create', () => {
    const createdInputs = component.getAllByRole('textbox');
    expect(createdInputs).toHaveLength(4);
    const createdCheckBoxes = component.getAllByRole('checkbox');
    expect(createdCheckBoxes).toHaveLength(1);
    inputs.forEach((input) => {
      const element = component.getByLabelText(new RegExp(input.label));
      expect(element).toBeInTheDocument();
      expect(element.type).toEqual(input.type);
      if (input.type === 'checkbox') {
        fireEvent.click(element);
        expect(mockClickFunction).toHaveBeenCalled();
      } else {
        fireEvent.blur(element);
        expect(mockBlurFunction).toHaveBeenCalled();
      }
    });
  });

  it('should disable submit button with errors present', () => {
    const submitButton = component.getByRole('button');
    const phoneNumberInput = component.getByLabelText(/Phone Number/i);
    fireEvent.change(phoneNumberInput, {
      target: { value: 'Not a phone number' },
    });
    fireEvent.blur(phoneNumberInput);
    expect(submitButton.disabled).toBeTruthy();
    fireEvent.click(submitButton);
    expect(mockSubmitFunction).toHaveBeenCalledTimes(0);
  });

  it('should call onSubmit when the form is submitted', () => {
    const form = component.getByTestId('form');
    fireEvent.submit(form);
    expect(mockSubmitFunction).toHaveBeenCalled();
  });
});
