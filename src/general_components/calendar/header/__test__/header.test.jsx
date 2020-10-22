// Dependencies
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import { create } from 'react-test-renderer';
import moment from 'moment';

// Components
import Header from '../index';

describe('<Header />', () => {
  let component;
  let container = null;
  const props = {
    date: 'August 2020',
    prev: jest.fn(),
    next: jest.fn(),
    isThisToday: false,
    goToToday: jest.fn(),
    dateObject: moment(),
    dispatchDate: () => {},

  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    component = render(<Header {...props} />);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should match snapshot', () => {
    const tree = create(<Header {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display current month', () => {
    const month = component.getByText('August 2020');
    expect(month).toBeInTheDocument();
  });

  it('call functions with buttons', () => {
    let button = component.getByRole('button', { name: 'Today' });
    fireEvent.click(button);
    expect(props.goToToday).toHaveBeenCalled();
    button = component.getByLabelText('next-date');
    fireEvent.click(button);
    expect(props.next).toHaveBeenCalled();
    button = component.getByLabelText('previous-date');
    fireEvent.click(button);
    expect(props.prev).toHaveBeenCalled();
  });
});
