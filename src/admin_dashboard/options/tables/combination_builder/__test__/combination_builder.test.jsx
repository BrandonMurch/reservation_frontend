// Dependencies
import React from 'react';
import {
  render, screen, createEvent, fireEvent, waitFor,
} from '@testing-library/react';
import { create } from 'react-test-renderer';

// Components
import CombinationBuilder from '../index';
import DraggableItem from 'general_components/draggable_list/draggable_item';
import { mockFetch } from 'test_utils';

const table = { name: 'name', seats: 2 };

const itemProps = {
  item: { name: 'name', seats: 2 },
  index: 0,
  DisplayComponent: ({ item }) => <p>{item.name}</p>,
  onDrop: jest.fn(),
  setHovered: jest.fn(),
};

describe('<CombinationBuilder />', () => {
  const fetchSpy = jest.spyOn(global, 'fetch')
    .mockImplementation(() => mockFetch(200));
  beforeEach(() => {
    render(
      <>
        <DraggableItem {...itemProps} />
        <CombinationBuilder />
      </>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const tree = create(
      <CombinationBuilder />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should order items when dragged and dropped', async () => {
    const combinationBuilder = screen.getByLabelText(/droppable/i);
    const dropEvent = createEvent.drop(combinationBuilder);
    Object.assign(dropEvent, { dataTransfer: { getData: jest.fn(() => JSON.stringify(table)) } });
    fireEvent(combinationBuilder, dropEvent);
    await waitFor(() => (
      expect(fetchSpy)
        .toHaveBeenCalled()
    ));
  });
});
