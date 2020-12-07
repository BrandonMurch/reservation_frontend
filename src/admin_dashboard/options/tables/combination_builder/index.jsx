import React, { useReducer } from 'react';
import { useRefreshContext } from '../refresh_context';

import style from './combination_builder.module.css';

const reducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      return [...state, action.item];
    }
    case 'remove': {
      return [...state.remove(action.item)];
    }
    case 'reset': {
      return [];
    }
    default: {
      console.error('Action not found.');
      return state;
    }
  }
};

const CombinationBuilder = function CreateTableCombinationsThroughDragAndDrop() {
  const [tables, dispatchTables] = useReducer(reducer, []);
  const refresh = useRefreshContext();

  const addCombination = function postCombinationToServer() {
    if (tables.length > 0) {
      console.log('CombinationAdded');
      refresh();
      dispatchTables({ type: 'reset' });
    }
  };

  const onDragOver = (event) => {
    // Without preventDefault, drag and drop doesn't work. The default action is to cancel the drag
    event.preventDefault();
  };

  const onDrop = function insertTableOnDrop(event) {
    event.preventDefault();
    console.log('drop');
    const item = JSON.parse(event.dataTransfer.getData('item'));
    console.log(item);
    dispatchTables({ type: 'add', item });
  };

  return (
    <div className={style.container}>
      <h1>Drag tables to create a combination</h1>
      <div className={style.droppableBox} aria-label="droppable" onDrop={onDrop} onDragOver={onDragOver}>
        {tables.map((table) => (
          <div key={table.name} className={style.itemContainer}>
            <div className={style.itemBackground}>
              <div className={style.item}>{table.name}</div>
              <div className={style.item}>{table.seats}</div>
            </div>
          </div>
        ))}

      </div>
      <button type="button" onClick={addCombination}>Create</button>
      <button type="button">Cancel</button>
    </div>
  );
};

export default CombinationBuilder;
