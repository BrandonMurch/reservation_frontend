// Dependencies
import React from 'react';
import {
  fireEvent,
  render, screen, waitForElementToBeRemoved,
} from '@testing-library/react';
import { create } from 'react-test-renderer';

// Components
import FetchForTableList, { TableList } from '../index';
import userEvent from '@testing-library/user-event';

describe('<TableList />', () => {
  let fetchSpy;
  const props = {
    tableList: [{
      name: '21',
      seats: 2,
      priority: 0,
    }, {
      name: '22',
      seats: 4,
      priority: 1,
    }],
    refresh: jest.fn(),
  };

  beforeEach(async () => {
    jest.restoreAllMocks();
    fetchSpy = jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve(
        props.tableList,
      ),
    }));
    render(<FetchForTableList {...props} />);
    await waitForElementToBeRemoved(() => screen.getByRole('presentation'));
  });

  it('should match snapshot', () => {
    const tree = create(
      <TableList {...props} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should call fetch on render', async () => {
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

  it('should display tables', () => {
    props.tableList.forEach((table) => {
      expect(screen.getByText(new RegExp(table.name))).toBeInTheDocument();
      expect(screen.getByText(table.seats.toString())).toBeInTheDocument();
    });
  });

  it('should display edit buttons', () => {
    expect(screen.getAllByRole('button', { name: 'Edit' })).toHaveLength(2);
  });

  it('should show an input on edit button click and hide number of seats', () => {
    const button = screen.getAllByRole('button', { name: 'Edit' })[0];
    userEvent.click(button);
    expect(screen.getByRole('textbox', { name: 'Number of Seats' }));
    expect(screen.queryByText(props.tableList[0].toString())).not.toBeInTheDocument();
  });

  it('should display delete buttons', () => {
    expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(2);
  });

  it('should display add table inputs', () => {
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Seats' })).toBeInTheDocument();
  });

  it('should display add table button', () => {
    expect(screen.getByRole('button', { name: 'Add Table' })).toBeInTheDocument();
  });

  it('should call fetch after adding table', async () => {
    const nameInput = screen.getByRole('textbox', { name: 'Name' });
    const seatsInput = screen.getByRole('textbox', { name: 'Seats' });
    const addButton = screen.getByRole('button', { name: 'Add Table' });
    const newTable = {
      name: 'tableName',
      seats: 2,
      priority: 2,
    };
    const updatedList = [...props.tableList, newTable];
    fetchSpy.mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve(
        updatedList,
      ),
    }));

    userEvent.type(nameInput, 'tableName');
    fireEvent.blur(nameInput);
    userEvent.type(seatsInput, '2');
    fireEvent.blur(seatsInput);
    userEvent.click(addButton);
    await screen.findByText(/tablename/i);

    // 1. initial call, 2. add table, 3. refresh table
    expect(fetchSpy).toHaveBeenCalledTimes(3);
    expect(fetchSpy).toHaveBeenCalledWith('http://localhost:8080/restaurant/tables', {
      method: 'POST',
      authorization: 'Bearer: undefined',
      body: JSON.stringify({
        name: 'tableName',
        seats: '2',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});
