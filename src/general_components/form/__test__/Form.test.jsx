import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import renderer from 'react-test-renderer';

import Form from '../index';

const getInputs = function getMockedInputsForTest() {
  return [
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      label: 'Last Name',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      pattern: '^[\\w\\-_.+]*[\\w\\-_.]@([\\w]+\\.)+[\\w]+[\\w]$',
      patternMessage: 'Email must be properly formatted',
    },
    {
      name: 'phoneNumber',
      type: 'tel',
      label: 'Phone Number',
      required: true,
      pattern: '^\\+\\d{1,3} \\d{6,14}$',
      patternMessage:
        'Phone number must be in the format of +1 123456789 where +1 is the country code, followed by the phone number',
    },
    {
      name: 'tAC',
      type: 'checkbox',
      label: 'Yes, I agree to the terms and conditions',
      required: true,
    },
  ];
};

function fillInput(element, string) {
  fireEvent.focus(element);
  fireEvent.change(element, { target: { value: string } });
  fireEvent.blur(element);
}

function fillForm(component) {
  const first = component.getByLabelText(/First/i);
  const last = component.getByLabelText(/Last/i);
  const phone = component.getByLabelText(/Phone/i);
  const email = component.getByLabelText(/Email/i);
  const tac = component.getByLabelText(/Terms/i);
  const submit = component.getByRole('button', { name: 'Submit' });
  fillInput(first, 'user');
  fillInput(last, 'last');
  fillInput(phone, '+1 123456789');
  fillInput(email, 'email@email.com');
  fireEvent.click(tac);
  fireEvent.click(submit);
}

describe('<Form />', () => {
  let component;
  let mockSubmitFunction;
  const inputs = getInputs();
  let container = null;
  beforeEach(() => {
    mockSubmitFunction = jest.fn();
    component = render(<Form inputs={inputs} onSubmit={mockSubmitFunction} submitLabel="Submit" />);
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
      .create(<Form inputs={inputs} onSubmit={mockSubmitFunction} submitLabel="Submit" />)
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
    });
  });
  it('should disable submit button with errors present', () => {
    const submitButton = component.getByRole('button');
    const phoneNumberInput = component.getByLabelText(/Phone Number/i);
    fireEvent.change(phoneNumberInput, {
      target: { value: 'Not a phone number' },
    });
    fireEvent.blur(phoneNumberInput);
    fireEvent.click(submitButton);
    expect(mockSubmitFunction).toHaveBeenCalledTimes(0);
  });
  it('should call onSubmit when the form is submitted', () => {
    fillForm(component);
    expect(mockSubmitFunction).toHaveBeenCalled();
  });
});
