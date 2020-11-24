// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useFetch, { fetchWrapper } from 'shared/useFetch';
import { useOverlayContext } from 'contexts/overlay_context';
import { useTokenContext } from 'contexts/token_context';
import { useBannerContext, bannerTypes } from 'contexts/banner_context';
import { RefreshTableListContextProvider } from './refresh_context';

// Components
import DraggableList from 'general_components/draggable_list';
import Loading from 'general_components/loading';
import AddTable from './add_table';
import DisplayTables, { Headers } from './display_tables';

// Stylesheets
import style from './tables.module.css';

const FetchOnLoad = function TableListFetchWrapper() {
  const [fetchToggle, toggleFetch] = useState(false);
  const { response, alternativeRender } = useFetch('/restaurant/tables', {}, fetchToggle);
  const refreshTableList = () => {
    toggleFetch((toggle) => !toggle);
  };

  if (alternativeRender) {
    return (
      <div className={style.loadingContainer}>
        {alternativeRender}
      </div>
    );
  }

  return <TableList tableList={response} refresh={refreshTableList} />;
};

export const TableList = function RestaurantTableList({ tableList, refresh }) {
  const setOverlay = useOverlayContext();
  const setBanner = useBannerContext();

  const updatePriorities = function loopThroughTablesChangePriorityToReflectPosition(tables) {
    tables.forEach((table, index) => { table.priority = index; });
  };

  const submitUpdate = async function submitNewTablePrioritiesToServer(tables) {
    const {
      error, loading,
    } = await fetchWrapper('/restaurant/tables', {
      method: 'PUT',
      authorization: `Bearer: ${useTokenContext.getToken}`,
      body: JSON.stringify(tables),
    });

    if (loading) {
      setOverlay(<div className={style.loadingContainer}><Loading size="large" /></div>);
    } else if (error) {
      setBanner(bannerTypes.ERROR, error);
    }
  };

  return (
    <RefreshTableListContextProvider refreshFunction={refresh}>
      <DraggableList
        key={tableList.length}
        getName={(table) => table.name}
        styleSheet={style}
        items={tableList}
        DisplayComponent={DisplayTables}
        Headers={Headers}
        updateList={(tables) => {
          updatePriorities(tables);
          submitUpdate(tables);
        }}
        AddComponent={AddTable}
      />
    </RefreshTableListContextProvider>
  );
};

TableList.propTypes = {
  tableList: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
  refresh: PropTypes.func.isRequired,
};

export default FetchOnLoad;
