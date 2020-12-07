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
import { TokenContextProvider } from 'contexts/token_context';
import userEvent from '@testing-library/user-event';
import { RefreshTableListContextProvider } from '../../refresh_context';

const table = { name: 'name', seats: 2 };

const itemProps = {
  item: { name: 'name', seats: 2 },
  index: 0,
  DisplayComponent: ({ item }) => <p>{item.name}</p>,
  onDrop: jest.fn(),
  setHovered: jest.fn(),
};

describe('<CombinationBuilder />', () => {
  let fetchSpy;
  let mockRefresh;
  beforeEach(() => {
    mockRefresh = jest.fn();
    fetchSpy = jest.spyOn(global, 'fetch')
      .mockImplementation(() => mockFetch(200));
    render(
      <TokenContextProvider defaultValue="Token">
        <RefreshTableListContextProvider refreshFunction={mockRefresh}>
          <DraggableItem {...itemProps} />
          <CombinationBuilder />
        </RefreshTableListContextProvider>
      </TokenContextProvider>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const tree = create(
      <TokenContextProvider defaultValue="Token">
        <CombinationBuilder />
      </TokenContextProvider>,

    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should order items when dragged and dropped', async () => {
    const combinationBuilder = screen.getByLabelText(/droppable/i);
    const dropEvent = createEvent.drop(combinationBuilder);
    const addButton = screen.getByRole('button', { name: 'Create' });
    Object.assign(dropEvent, { dataTransfer: { getData: jest.fn(() => JSON.stringify(table)) } });
    fireEvent(combinationBuilder, dropEvent);
    userEvent.click(addButton);
    await waitFor(() => (
      expect(fetchSpy)
        .toHaveBeenCalledWith('http://localhost:8080/restaurant/combinations',
          {
            body: table.name,
            method: 'POST',
            authorization: 'Token',
            headers: { 'Content-Type': 'application/json' },
          })
    ));
  });
});
