// Dependencies
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { create } from 'react-test-renderer';

// Components
import DeleteConfirmation from '../delete_confirmation';

describe('<DeleteConfirmation />', () => {
  let container = null;
  const props = {
    cancelDelete: jest.fn(),
    onSubmit: jest.fn(),
    booking: {
      user: { firstName: 'John' },
      partySize: 2,
      startTime: '2020-10-24T20:00',
    },
  };
  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    await render(
      <DeleteConfirmation
        {...props}
      />,
    );
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should match snapshot', () => {
    const tree = create(
      <DeleteConfirmation
        {...props}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should call onSubmit when yes is clicked', () => {
    const deleteButton = screen.getByRole('button', { name: /yes/i });
    fireEvent.click(deleteButton);
    expect(props.onSubmit).toBeCalledTimes(1);
  });

  it('should call cancelDelete when no is clicked', () => {
    const cancelDelete = screen.getByRole('button', { name: /no/i });
    fireEvent.click(cancelDelete);
    expect(props.cancelDelete).toBeCalledTimes(1);
  });

  it('should display user information', () => {
    const userName = new RegExp(props.booking.user.firstName);
    expect(screen.getByText(userName)).toBeInTheDocument();
    expect(screen.getByText(/8:00/)).toBeInTheDocument();
    expect(screen.getByText(/october 24th/i)).toBeInTheDocument();
    expect(screen.getByText(/2/)).toBeInTheDocument();
  });

  it('should display delete confirmation', () => {
    expect(screen.getByText(/to delete the booking/i)).toBeInTheDocument();
  });
});
