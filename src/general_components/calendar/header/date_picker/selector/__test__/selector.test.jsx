// Dependencies
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import { create } from 'react-test-renderer';
import moment from 'moment';

// Components
import Selector from '../index';

describe('<Selector />', () => {
  let component;
  let container = null;
  const props = {
    setDisplayDatePicker: jest.fn(),
    dateObject: moment(),
    dispatchDate: jest.fn(),
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    component = render(<Selector {...props} />);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should match snapshot', () => {
    const tree = create(<Selector {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display current month', () => {
    const month = component.getByText(props.dateObject.format('MMMM YYYY'));
    expect(month).toBeInTheDocument();
  });

  it('should switch view when button is pressed', () => {
    const button = component.getByText(props.dateObject.format('MMMM YYYY'));
    fireEvent.click(button);
    const up = component.getByLabelText('months up');
    expect(up).toBeInTheDocument();
  });
});
