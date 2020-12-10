import React, { useReducer, useState } from 'react';
import { fetchWrapper } from 'shared/useFetch';
import { useRefreshContext } from '../refresh_context';
import { useTokenContext } from 'contexts/token_context';
import { useBannerContext, bannerTypes } from 'contexts/banner_context';

import style from './combination_builder.module.css';
import Loading from 'general_components/loading';

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
      return state;
    }
  }
};

const getTableString = function getTableStringFromArrayOfTables(tables) {
  const tableNames = tables.map((table) => table.name);
  return tableNames.join(', ');
};

const CombinationBuilder = function CreateTableCombinationsThroughDragAndDrop() {
  const [tables, dispatchTables] = useReducer(reducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const setBanner = useBannerContext();
  const refresh = useRefreshContext();
  const tokenContext = useTokenContext();
  const token = tokenContext?.getToken ?? '';

  const addCombination = async function postCombinationToServer() {
    if (tables.length > 0) {
      const body = getTableString(tables);
      const {
        loading, error,
      } = await fetchWrapper('/restaurant/combinations', { body, method: 'POST', authorization: token });
      if (error) {
        setBanner(bannerTypes.ERROR, error);
      }
      setIsLoading(loading);
      refresh();
    }
  };

  const onDragOver = (event) => {
    // Without preventDefault, drag and drop doesn't work. The default action is to cancel the drag
    event.preventDefault();
  };

  const onDrop = function insertTableOnDrop(event) {
    event.preventDefault();
    const item = JSON.parse(event.dataTransfer.getData('item'));
    dispatchTables({ type: 'add', item });
  };

  if (isLoading) {
    return (
      <div className={style.container}>
        <Loading />
      </div>
    );
  }

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
      <button type="button" onClick={() => dispatchTables({ type: 'reset' })}>Cancel</button>
    </div>
  );
};

export default CombinationBuilder;
