// Dependencies
import React from 'react';
import {
  render, screen, fireEvent, act,
} from '@testing-library/react';
import { create } from 'react-test-renderer';

// Components
import userEvent from '@testing-library/user-event';
import EditWindow from '../index';

describe('<EditWindow />', () => {
  const props = {
    deleteBooking: jest.fn(),
    onSubmit: jest.fn(),
    booking: {
      user: { firstName: 'John' },
      partySize: 2,
      startTime: '2020-10-24T20:00',
      date: '2020-10-24',
    },
  };
  beforeEach(() => {
    render(
      <EditWindow {...props} />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const tree = create(
      <EditWindow {...props} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onSubmit on form submission', async () => {
    userEvent.type(screen.getByLabelText(/start time/i), '21:00');
    userEvent.type(screen.getByLabelText(/end time/i), '23:00');
    userEvent.type(screen.getByLabelText(/party size/i), '2');
    userEvent.type(screen.getByLabelText(/restaurant comments/i), 'comment');
    await act(async () => {
      await fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    });
    expect(props.onSubmit).toBeCalledTimes(1);
  });

  it('should call deleteBooking when button is pressed', async () => {
    await fireEvent.click(screen.getByRole('button', { name: /delete this booking/i }));
    expect(props.deleteBooking).toBeCalledTimes(1);
  });

  it('should pre-fill booking details into form', () => {
    expect(screen.getByLabelText(/start time/i)).toHaveValue('20:00');
    expect(screen.getByLabelText('Date')).toHaveValue(props.date);
  });
});
