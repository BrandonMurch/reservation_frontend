// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useFetch, { fetchWrapper } from 'shared/useFetch';
import { useOverlayContext } from 'contexts/overlay_context';
import { useTokenContext } from 'contexts/token_context';
import { useBannerContext, bannerTypes } from 'contexts/banner_context';
import { RefreshTableListContextProvider, useRefreshContext } from './refresh_context';

// Components
import DraggableList from 'general_components/draggable_list';
import { TextInput } from 'general_components/form/inputs';
import Confirmation from 'admin_dashboard/daily/bookings_table/booking_overlay/confirmation';
import OverlayContainer from 'admin_dashboard/daily/bookings_table/booking_overlay/overlay_container';
import Loading from 'general_components/loading';

// Stylesheets
import style from './tables.module.css';

const TableInput = function EditTableInputBox({ exit, table }) {
  const value = table.seats;
  const [isLoading, setIsLoading] = useState(false);
  const setBanner = useBannerContext();
  const onBlur = async function submitUpdateToServer(updatedValue) {
    if (updatedValue !== '' && updatedValue !== value) {
      table.seats = updatedValue;
      const { loading, error } = await fetchWrapper(
        `/restaurant/tables/${table.name}`,
        {
          method: 'PUT',
          body: JSON.stringify(table),
          authorization: `Bearer ${useTokenContext.getToken}`,
        },
      );
      setIsLoading(loading);
      if (error) {
        setBanner(bannerTypes.ERROR, error);
      }
    }
    exit();
  };

  if (isLoading) {
    return <Loading size="small" />;
  }

  return (
    <TextInput
      required
      onBlur={(updatedValue) => onBlur(updatedValue)}
      style={style}
      name="seats"
      label="Number of Seats"
      type="text"
    />
  );
};

TableInput.propTypes = {
  exit: PropTypes.func.isRequired,
  table: PropTypes.shape({
    name: PropTypes.string,
    seats: PropTypes.number,
  }).isRequired,
};

const deleteTable = async (table, setBanner, setIsLoading) => {
  // TODO: display tables that have not been reallocated in a permanent message.
  const { loading, error } = await fetchWrapper(
    `/restaurant/tables/${table.name}`,
    {
      method: 'DELETE',
      authorization: `Bearer ${useTokenContext.getToken}`,
    },
  );
  setIsLoading(loading);
  if (error) {
    setBanner(bannerTypes.ERROR, error);
  }
};

const DeleteConfirmation = ({ table, exit, refresh }) => {
  const setBanner = useBannerContext();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <OverlayContainer exit={exit}>
      {isLoading ? <Loading />
        : (
          <Confirmation
            message={'Deleting a table requires all bookings be allocated a new table. \n This may take a few minutes \n Are you sure you wish to continue'}
            confirm={() => {
              deleteTable(table, setBanner, setIsLoading);
              refresh();
              exit();
            }}
            cancel={() => exit()}
          />
        )}
    </OverlayContainer>
  );
};

DeleteConfirmation.propTypes = {
  table: PropTypes.shape({}).isRequired,
  exit: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired,
};

const submit = async (body, setIsLoading, setBanner) => {
  const { error, loading } = await fetchWrapper('/restaurant/tables', {
    body: JSON.stringify(body),
    method: 'POST',
    authorization: `Bearer: ${useTokenContext.getToken}`,
  });
  setIsLoading(loading);
  if (error) {
    setBanner(bannerTypes.ERROR, error);
  }
};

const AddTable = function AddTableInputInTable() {
  const setBanner = useBannerContext();
  const [isLoading, setIsLoading] = useState(false);
  const [displayButton, setDisplayButton] = useState(false);
  const [inputValues, setInputValues] = useState();
  const refresh = useRefreshContext();

  if (isLoading) {
    return (
      <td>
        <Loading size="small" />
      </td>
    );
  }

  return (
    <>
      <td className={style.cell}>
        <TextInput
          required
          onFocus={() => setDisplayButton(true)}
          onBlur={(updatedValue) => {
            setInputValues((prevState) => ({ ...prevState, name: updatedValue }));
          }}
          style={style}
          name="name"
          label="Name"
          type="text"
        />
      </td>
      <td className={style.cell}>
        <TextInput
          required
          onFocus={() => setDisplayButton(true)}
          onBlur={(updatedValue) => {
            setInputValues((prevState) => ({ seats: updatedValue, ...prevState }));
          }}
          style={style}
          name="numberOfSeats"
          label="Number of Seats"
          type="text"
        />
      </td>
      <td className={displayButton ? style.displayButtonContainer : style.buttonContainer}>
        <button
          className={style.button}
          onClick={() => {
            setDisplayButton(false);
            submit(inputValues, setIsLoading, setBanner);
            refresh();
          }}
          type="button"
        >
          Add Table
        </button>
      </td>
    </>
  );
};

const DisplayComponent = function ComponentToDisplayInsideDraggableList({ item: table }) {
  const setOverlay = useOverlayContext();
  const [displayEditInput, setDisplayEditInput] = useState(false);
  const refresh = useRefreshContext();
  return (
    <>
      <td className={style.cell}>{table.name}</td>
      <td className={style.cell}>
        {displayEditInput
          ? (
            <TableInput
              exit={() => {
                setDisplayEditInput(false);
              }}
              table={table}
            />
          )
          : table.seats}

      </td>
      <td className={style.buttonContainer}>
        <button
          className={style.editButton}
          onClick={() => setDisplayEditInput((current) => !current)}
          type="button"
        >
          Edit
        </button>
        <button
          className={style.editButton}
          type="button"
          onClick={() => {
            setOverlay(<DeleteConfirmation
              refresh={refresh}
              exit={() => setOverlay(null)}
              table={table}
            />);
          }}
        >
          Delete
        </button>
      </td>
    </>
  );
};

DisplayComponent.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    seats: PropTypes.number,
  }).isRequired,
};

const TableList = function RestaurantTableList() {
  const [fetchToggle, toggleFetch] = useState(false);
  const { response, alternativeRender } = useFetch('/restaurant/tables', {}, fetchToggle);
  const setOverlay = useOverlayContext();
  const setBanner = useBannerContext();

  if (alternativeRender) {
    return (
      <div className={style.loadingContainer}>
        {alternativeRender}
      </div>
    );
  }

  const refreshTableList = () => {
    toggleFetch((toggle) => !toggle);
  };

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
    <RefreshTableListContextProvider refreshFunction={refreshTableList}>
      <DraggableList
        key={response.length}
        getName={(table) => table.name}
        styleSheet={style}
        items={response}
        headers={['Name', 'Seats']}
        DisplayComponent={DisplayComponent}
        updateList={(tables) => {
          updatePriorities(tables);
          submitUpdate(tables);
        }}
        AddComponent={AddTable}
        refreshList={refreshTableList}
      />
    </RefreshTableListContextProvider>
  );
};

export default TableList;
