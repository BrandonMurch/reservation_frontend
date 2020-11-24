// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import {
  render, fireEvent, screen, createEvent,
} from '@testing-library/react';
import { create } from 'react-test-renderer';

// Components
import DraggableList from '../index';
import { act } from 'react-dom/test-utils';

const DisplayComponent = ({ item }) => (
  <div>
    <h1>{item.name}</h1>
    <h1>{item.gender}</h1>
  </div>
);

DisplayComponent.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    gender: PropTypes.string,
  }).isRequired,
};

describe('<DraggableList />', () => {
  const props = {
    DisplayComponent,
    items: [{
      name: 'George',
      gender: 'male',
    }, {
      name: 'Sarah',
      gender: 'female',
    }],
    Headers: () => (
      <>
        <h2>Name</h2>
        <h2>Gender</h2>
      </>
    ),
    updateList: jest.fn(),
    getName: (person) => person.name,
    AddComponent: () => <button type="button">Add</button>,
  };
  beforeEach(() => {
    render(
      <DraggableList {...props} />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const tree = create(
      <DraggableList {...props} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('should order items when dragged and dropped', () => {
    const first = screen.getByText(/george/i);
    const second = screen.getByTestId(/endOfList/i);
    act(() => {
      const dragStart = createEvent.dragStart(first);
      const dropEvent = createEvent.drop(second);
      Object.assign(dragStart, { dataTransfer: { setData: jest.fn() } });
      fireEvent(first, dragStart);
      Object.assign(dropEvent, { dataTransfer: { getData: jest.fn(() => 0) } });
      fireEvent(second, dropEvent);
    });
    expect(props.updateList).toHaveBeenCalledWith([props.items[1], props.items[0]]);
  });
  it('should order items when dragged and dropped in reverse', () => {
    const first = screen.getByText(/sarah/i);
    const second = screen.getByText(/george/i);
    act(() => {
      const dragStart = createEvent.dragStart(first);
      const dropEvent = createEvent.drop(second);
      Object.assign(dragStart, { dataTransfer: { setData: jest.fn() } });
      fireEvent(first, dragStart);
      Object.assign(dropEvent, { dataTransfer: { getData: jest.fn(() => 1) } });
      fireEvent(second, dropEvent);
    });
    expect(props.updateList).toHaveBeenCalledWith([props.items[1], props.items[0]]);
  });
});
