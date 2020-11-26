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

  it('should display user details when hovered.', async () => {
    const element = screen.getByRole('presentation');
    userEvent.hover(element);
    expect(screen.getByText(props.user.username)).toBeInTheDocument();
    expect(screen.getByText(props.user.phoneNumber)).toBeInTheDocument();
  });

  it('should hide user details when unhovered.', async () => {
    const element = screen.getByRole('presentation');
    userEvent.hover(element);
    expect(screen.getByText(props.user.username)).toBeInTheDocument();
    userEvent.unhover(element);
    expect(screen.queryByText(props.user.username)).not.toBeInTheDocument();
  });

  it('should display edit window when button is clicked.', async () => {
    const element = screen.getByRole('presentation');
    userEvent.hover(element);
    await screen.findByRole('button', { name: 'Edit' });
    // must be wrapped in act due to event listener removal on unmountu
    act(() => userEvent.click(screen.getByRole('button', { name: 'Edit' })));
    const textbox = await screen.findAllByRole('textbox');
    expect(textbox[0]).toBeInTheDocument();
    userEvent.unhover(element);
  });
});
