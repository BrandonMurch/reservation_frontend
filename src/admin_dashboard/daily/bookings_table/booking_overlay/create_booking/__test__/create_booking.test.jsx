// Dependencies
import React from 'react';
import {
  render, fireEvent, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { unmountComponentAtNode } from 'react-dom';
import { create } from 'react-test-renderer';

// Components
import CreateBooking from '../index';

describe('<CreateBooking />', () => {
  let container = null;
  const props = {
    date: '2020-10-24',
    onSubmit: jest.fn(),
  };

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    render(
      <CreateBooking {...props} />,
    );
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should match snapshot', () => {
    const tree = create(
      <CreateBooking {...props} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onSubmit on submit', async () => {
    //
    fireEvent.change(screen.getByLabelText(/start time/i), { target: { value: '21:00' } });
    fireEvent.change(screen.getByLabelText(/end time/i), { target: { value: '23:00' } });
    userEvent.type(screen.getByLabelText(/party size/i), '2');
    userEvent.type(screen.getByLabelText(/name/i), 'John');
    userEvent.type(screen.getByLabelText(/phone number/i), '+1 1234566');
    userEvent.type(screen.getByLabelText(/email/i), 'john@john.com');
    userEvent.type(screen.getByLabelText(/restaurant comments/i), 'comment');
    userEvent.click(screen.getByRole('button', { name: /create booking/i }));
    expect(props.onSubmit).toHaveBeenCalled();
  });

  it('should display date as default', () => {
    const dateInput = screen.getByLabelText(/date/i);
    expect(dateInput).toHaveValue(props.date);
  });
});
