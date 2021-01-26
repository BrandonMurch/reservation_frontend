// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import {
  render, fireEvent, screen, createEvent,
} from '@testing-library/react';
import { create } from 'react-test-renderer';

// Components
import DraggableItem from '../index';

const DisplayComponent = ({ item }) => <h2>{item.text}</h2>;
DisplayComponent.propTypes = {
  item: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
};

describe('<DraggableItem />', () => {
  const props = {
    item: { text: 'Hello World' },
    index: 0,
    DisplayComponent,
    onDrop: jest.fn(),
    displayDroppable: true,
    setHovered: jest.fn(),
  };

  beforeEach(() => {
    render(
      <DraggableItem {...props} />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const tree = create(
      <DraggableItem {...props} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should call setData on dragStart', () => {
    const item = screen.getByText(/hello world/i);
    const mockSetData = jest.fn();
    const dragStartEvent = createEvent.dragStart(item);
    Object.assign(dragStartEvent, { dataTransfer: { setData: mockSetData } });
    fireEvent(item, dragStartEvent);
    expect(mockSetData).toHaveBeenCalled();
  });

  it('should call setHovered on dragEnter', () => {
    const item = screen.getByText(/hello world/i);
    fireEvent.dragEnter(item);
    expect(props.setHovered).toHaveBeenCalled();
  });

  it('should call setHovered on dragEnd', () => {
    const item = screen.getByText(/hello world/i);
    const dragEndEvent = createEvent.dragEnd(item);
    Object.assign(dragEndEvent, { dataTransfer: { dropEffect: 'none' } });
    fireEvent(item, dragEndEvent);
    expect(props.setHovered).toHaveBeenCalledWith(-1);
  });

  it('should call handleDrop on drop', () => {
    const item = screen.getByText(/hello world/i);
    fireEvent.drop(item);
    expect(props.onDrop).toHaveBeenCalled();
  });
});
