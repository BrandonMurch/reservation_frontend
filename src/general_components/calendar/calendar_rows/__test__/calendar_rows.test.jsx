// Dependencies
import React from 'react';
import { render, screen } from '@testing-library/react';
import { create } from 'react-test-renderer';
import moment from 'moment';

// Components
import Row from '../index';

describe('<CalendarRow />', () => {
  const dateObject = moment('2020-10-23');
  let mockRenderFunction;

  beforeEach(() => {
    mockRenderFunction = jest.fn().mockImplementation(({ setMessage }) => setMessage('hellou'));
    render(
      <table>
        <Row dateObject={dateObject} onDateRender={mockRenderFunction} />
      </table>,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should match snapshot', () => {
    const tree = create(<Row dateObject={dateObject} onDateRender={mockRenderFunction} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have rendered cells', () => {
    const cells = screen.getAllByRole('gridcell');
    expect(cells.length).toBeGreaterThan(dateObject.daysInMonth());
  });

  it('should call onDateRender prop', () => {
    expect(mockRenderFunction).toHaveBeenCalled();
  });
});
