// Dependencies
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import { create } from 'react-test-renderer';
import moment from 'moment';
import { getMonth } from 'shared/dateHelper';

// Components
import Selector from '../index';

describe('<Selector />', () => {
  let component;
  let container = null;
  const props = {
    dateObject: moment(),
    dispatchDate: jest.fn(),
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    component = render(<Selector {...props} />);
  });

  afterEach(() => {
    props.dispatchDate.mockClear();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should match snapshot', () => {
    const tree = create(<Selector {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should change the year when a year button is pressed', () => {
    const year = props.dateObject.year() + 1;
    const button = component.getByRole('button', { name: year.toString() });
    fireEvent.click(button);
    expect(props.dispatchDate).toHaveBeenCalledWith({
      unit: 'years',
      number: year,
      type: 'set',
    });
  });

  it('should augment the year when the up button is pressed', () => {
    const button = component.getByLabelText('years up');
    fireEvent.click(button);
    expect(props.dispatchDate).toHaveBeenCalledWith({
      unit: 'years',
      number: -1,
      type: 'jumpUnit',
    });
  });

  it('should decrement the year when the down button is pressed', () => {
    const button = component.getByLabelText('years down');
    fireEvent.click(button);
    expect(props.dispatchDate).toHaveBeenCalledWith({
      unit: 'years',
      number: 1,
      type: 'jumpUnit',
    });
  });
  it('should change the month when a month button is pressed', () => {
    const month = props.dateObject.month() + 1;
    const monthText = getMonth(month).short;
    const button = component.getByRole('button', { name: monthText });
    fireEvent.click(button);
    expect(props.dispatchDate).toHaveBeenCalledWith({
      unit: 'months',
      number: month,
      type: 'set',
    });
  });

  it('should augment the month when the up button is pressed', () => {
    const button = component.getByLabelText('months up');
    fireEvent.click(button);
    expect(props.dispatchDate).toHaveBeenCalledWith({
      unit: 'months',
      number: -1,
      type: 'jumpUnit',
    });
  });

  it('should decrement the month when the down button is pressed', () => {
    const button = component.getByLabelText('months down');
    fireEvent.click(button);
    expect(props.dispatchDate).toHaveBeenCalledWith({
      unit: 'months',
      number: 1,
      type: 'jumpUnit',
    });
  });
});
