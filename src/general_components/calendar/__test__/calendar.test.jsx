// Dependencies
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import { create } from 'react-test-renderer';
import moment from 'moment';

// Components
import Calendar from '../index';

const getMonth = function getMonthName(monthIndex) {
  return moment.months()[monthIndex];
};

describe('<Calendar />', () => {
  let component;
  let container = null;
  const mockOnDateRender = jest.fn();

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    component = render(<Calendar onDateRender={mockOnDateRender} />);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should match snapshot', () => {
    const tree = create(<Calendar />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call onDateRender', () => {
    expect(mockOnDateRender).toHaveBeenCalled();
  });

  it('should go to the next month when the button is pressed', () => {
    const dateObject = moment();
    const button = component.getByRole('button', { name: '>' });
    fireEvent.click(button);
    // 2 months is due to React.StrictMode calling the reducer twice in development.
    dateObject.add(2, 'months');
    const dateText = component.getByText(new RegExp(getMonth(dateObject.get('months'))));
    expect(dateText).toBeInTheDocument();
  });

  it('should go to the previous month when the button is pressed', () => {
    const dateObject = moment();
    const button = component.getByRole('button', { name: '<' });
    fireEvent.click(button);
    // 2 months is due to React.StrictMode calling the reducer twice in development.
    dateObject.subtract(2, 'months');
    const dateText = component.getByText(new RegExp(getMonth(dateObject.get('months'))));
    expect(dateText).toBeInTheDocument();
  });

  it('should go to the current month when the button is pressed', () => {
    const dateObject = moment();
    let button = component.getByRole('button', { name: '>' });
    fireEvent.click(button);
    fireEvent.click(button);
    button = component.getByRole('button', { name: 'Today' });
    fireEvent.click(button);
    const dateText = component.getByText(new RegExp(getMonth(dateObject.get('months'))));
    expect(dateText).toBeInTheDocument();
  });

  it('should render titles for days of week', () => {
    const monday = component.getByText(/Mon/i);
    expect(monday).toBeInTheDocument();
    const friday = component.getByText(/Fri/i);
    expect(friday).toBeInTheDocument();
  });
});
