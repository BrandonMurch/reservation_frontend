// Dependencies
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render } from '@testing-library/react';
import { create } from 'react-test-renderer';
import moment from 'moment';

// Components
import Row from '../index';

describe('<CalendarRow />', () => {
  let component;
  let container = null;
  const dateObject = moment();
  const mockRenderFunction = jest.fn(({ setMessage }) => { setMessage('hello'); });

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    component = render(
      <table>
        <Row dateObject={dateObject} onDateRender={mockRenderFunction} />
      </table>,
    );
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('should match snapshot', () => {
    const tree = create(<Row dateObject={dateObject} onDateRender={mockRenderFunction} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have rendered cells', () => {
    const cells = component.getAllByRole('gridcell');
    expect(cells.length).toBeGreaterThan(dateObject.daysInMonth());
  });

  it('should call onDateRender prop', () => {
    expect(mockRenderFunction).toHaveBeenCalled();
  });
});
