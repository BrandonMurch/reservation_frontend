import React from 'react';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import renderer from 'react-test-renderer';
import { DisplayReservation, DisplayUser } from '../index';

describe('<DisplayReservation />', () => {
  const reservation = {
    date: '2020-10-10',
    time: '21:00',
    partySize: 2,
  };
  let component;
  let container = null;
  beforeEach(() => {
    component = render(<DisplayReservation reservation={reservation} />);
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  it('should match snapshot', () => {
    const tree = renderer.create(<DisplayReservation reservation={reservation} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should display the date', () => {
    const element = component.getByText(/Sat Oct 10 2020/i);
    expect(element).toBeInTheDocument();
  });
  it('should display the time', () => {
    const element = component.getByText(/21:00/i);
    expect(element).toBeInTheDocument();
  });
  it('should display the party size > 1', () => {
    const element = component.getByText(/2 people/i);
    expect(element).toBeInTheDocument();
  });
  it('should display the party size = 1', () => {
    reservation.partySize = 1;
    const updatedComponent = render(<DisplayReservation reservation={reservation} />);
    const element = updatedComponent.getByText(/1 person/i);
    expect(element).toBeInTheDocument();
  });
});

describe('<DisplayUser />', () => {
  const user = {
    firstName: 'john',
    lastName: 'johnson',
    username: 'john@john.com',
    phoneNumber: '+1 123456787',
    tAC: true,
  };
  let component;
  let container = null;
  beforeEach(() => {
    component = render(<DisplayUser user={user} />);
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  it('should match snapshot', () => {
    const tree = renderer.create(<DisplayUser user={user} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should display user\'s first and last name', () => {
    const element = component.getByText(new RegExp(`${user.firstName} ${user.lastName}`));
    expect(element).toBeInTheDocument();
  });
  it('should display user\'s email', () => {
    const element = component.getByText(new RegExp(user.username));
    expect(element).toBeInTheDocument();
  });
  it('should display user\'s phone number', () => {
    const element = component.getByText(/\+1 123456787/i);
    expect(element).toBeInTheDocument();
  });
});
