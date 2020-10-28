// Dependencies
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { create } from 'react-test-renderer';

// Components
import Review from '../index';

describe('<Review />', () => {
  let component;
  let mockClickFunction;
  let container = null;
  const reservation = {
    date: '2020-10-10',
    time: '21:00',
    partySize: 2,
  };
  const user = {
    firstName: 'john',
    lastName: 'johnson',
    username: 'john@john.com',
    phoneNumber: '+1 123456787',
    tAC: true,
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    mockClickFunction = jest.fn();
    component = render(<Review
      onClick={mockClickFunction}
      reservation={reservation}
      user={user}
      isLoading={false}
    />);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should match snapshot', () => {
    const tree = create(<Review
      onClick={mockClickFunction}
      reservation={reservation}
      user={user}
      isLoading={false}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should have four buttons', () => {
    const buttons = component.getAllByRole('button');
    expect(buttons).toHaveLength(4);
  });
  it('should fire onClick when buttons are clicked', () => {
    const buttons = component.getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(mockClickFunction).toHaveBeenCalledWith(buttons[0].name);
  });
  it('should display reservation', () => {
    let element = component.getByText(new RegExp(reservation.time));
    expect(element).toBeInTheDocument();
    element = component.getByText(/Sat Oct 10 2020/i);
    expect(element).toBeInTheDocument();
    element = component.getByText(/2 people/i);
    expect(element).toBeInTheDocument();
  });
  it('should display user', () => {
    let element = component.getByText(new RegExp(user.firstName));
    expect(element).toBeInTheDocument();
    element = component.getByText(new RegExp(user.lastName));
    expect(element).toBeInTheDocument();
    element = component.getByText(new RegExp(user.username));
    expect(element).toBeInTheDocument();
  });
});
