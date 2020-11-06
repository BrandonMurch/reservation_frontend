// Dependencies
import React from 'react';
import {
  render, screen, act,
} from '@testing-library/react';
import { create } from 'react-test-renderer';
import userEvent from '@testing-library/user-event';

// Components
import UserDetails from '../index';

describe('<UserDetails />', () => {
  const props = {
    user: {
      firstName: 'John',
      lastName: 'Smith',
      username: 'John.Smith@email.com',
      phoneNumber: '+1 123123',
    },
  };
  beforeEach(() => {
    const row = document.createElement('tr');
    render(
      <UserDetails {...props} />, {
        container: document.body.appendChild(row),
      },
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const tree = create(
      <UserDetails {...props} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should display user details when hovered.', () => {
    const element = screen.getByRole('presentation');
    act(() => { userEvent.click(element); });
    expect(screen.getByText(props.user.username)).toBeInTheDocument();
    expect(screen.getByText(props.user.phoneNumber)).toBeInTheDocument();
  });
  it('should hide user details when unhovered.', () => {
    const element = screen.getByRole('presentation');
    act(() => { userEvent.click(element); });
    expect(screen.getByText(props.user.username)).toBeInTheDocument();
    act(() => { userEvent.click(element.parentElement); });
    expect(screen.queryByText(props.user.username)).not.toBeInTheDocument();
  });
  it('should display edit window when button is clicked.', () => {
    const element = screen.getByRole('presentation');
    act(() => { userEvent.click(element); });
    act(() => {
      userEvent.click(screen.getByRole('button', { name: 'Edit' }));
    });
    expect(screen.getAllByRole('textbox')[0]).toBeInTheDocument();
  });
});
