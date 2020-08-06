// Dependencies
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { create } from 'react-test-renderer';

// Components
import ContactForm from '../index';

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
  // FIXME - need to fill form in test.
  // it('should display call onSubmit when submitted', () => {
  //   const button = component.getByRole('button', { name: 'Submit' });
  //   fireEvent.click(button);
  //   expect(mockSubmitFunction).toHaveBeenCalled();
  // });
});
