// Dependencies
import DraggableList from 'general_components/draggable_list';
import React, { useCallback } from 'react';
import useFetch from 'shared/useFetch';

// Stylesheets
import style from './tables.module.css';

/*
Create DraggableList component
Inside DraggableList is DragableItem
Draggable item wraps around contents of list to add a DragHere box.

Draggible list stores all entries in a list.
indexes are stored in a separate list.
    example:
      items[carrot, apple, banana],
      indexes[1,2,0],
      would display apple, banana, carrot
When a drag occurs, the place is taken from the draggable item.
The linked list is rearranged accordingly
the draggable list is reloaded
*/

const TableList = function RestaurantTableList() {
  const { response, alternativeRender } = useFetch('/restaurant/tables');

  const displayComponent = useCallback((table) => (
    <>
      <td className={style.cell}>{table.name}</td>
      <td className={style.cell}>{table.seats}</td>
      <td className={style.buttonContainer}>
        <button className={style.editButton} type="button">Edit</button>
      </td>
    </>
  ), []);

  if (alternativeRender) {
    return alternativeRender;
  }

  const updateList = () => {
    console.log('updated');
    // TODO: loop through list, change priority to match the index, send list to server
  };

  return (
    <DraggableList
      styleSheet={style}
      items={response}
      headers={['Name', 'Seats']}
      getDisplay={displayComponent}
      updateList={updateList}
    />
  );
};

export default TableList;
