// Dependencies
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { create } from 'react-test-renderer';

// Components
import ContactForm from '../index';
import userEvent from '@testing-library/user-event';

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
  const submit = component.getByRole('button', { name: 'Next' });
  fillInput(first, 'user');
  fillInput(last, 'last');
  fillInput(phone, '+1 123456789');
  fillInput(email, 'email@email.com');
  userEvent.click(tac);
  userEvent.click(submit);
}

describe('<ContactForm />', () => {
  let component;
  let mockSubmitFunction;
  let container = null;
  const reservation = {
    time: '21:00',
    date: '2020-10-09',
    partySize: 2,
  };

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    mockSubmitFunction = jest.fn();
    component = await render(
      <ContactForm onSubmit={mockSubmitFunction} reservation={reservation} />,
    );
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should match snapshot', () => {
    const tree = create(
      <ContactForm onSubmit={mockSubmitFunction} reservation={reservation} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should display new user on page load', () => {
    const firstName = component.getByLabelText(/First Name/i);
    expect(firstName).toBeInTheDocument();
    const lastName = component.getByLabelText(/Last Name/i);
    expect(lastName).toBeInTheDocument();
    const email = component.getByLabelText(/Email/i);
    expect(email).toBeInTheDocument();
    const phone = component.getByLabelText(/Phone Number/i);
    expect(phone).toBeInTheDocument();
  });
  it('should display switch to login on button click', () => {
    const button = component.getByRole('button', { name: 'Login' });
    fireEvent.click(button);
    const email = component.getByLabelText(/Email/i);
    expect(email).toBeInTheDocument();
    const password = component.getByLabelText(/Password/i);
    expect(password).toBeInTheDocument();
  });
  it('should display call onSubmit when submitted', () => {
    fillForm(component);
    expect(mockSubmitFunction).toHaveBeenCalled();
  });
});
