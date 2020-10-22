// Dependencies
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import { create } from 'react-test-renderer';

// Components
import CalendarBox from '../index';

describe('<CalendarBox />', () => {
  let component;
  let container = null;
  const mockClickFunction = jest.fn();
  const message = 'is a message';

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    component = render(
      <table>
        <tbody>
          <tr>
            <CalendarBox date="2020-10-11" message={message} onClick={mockClickFunction} />
          </tr>
        </tbody>
      </table>,
    );
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should match snapshot', () => {
    const tree = create(<CalendarBox
      date="2020-10-11"
      message={message}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display the message', () => {
    const messageElement = component.getByText(message);
    expect(messageElement).toBeInTheDocument();
  });
  it('should display the date', () => {
    const messageElement = component.getByText('11');
    expect(messageElement).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const box = component.getByRole('gridcell');
    fireEvent.click(box);
    expect(mockClickFunction).toHaveBeenCalledWith('2020-10-11');
  });
});
