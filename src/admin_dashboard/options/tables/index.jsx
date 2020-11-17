// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useFetch, { fetchWrapper } from 'shared/useFetch';
import { useOverlayContext } from 'contexts/overlay_context';
import { useTokenContext } from 'contexts/token_context';
import { useBannerContext, bannerTypes } from 'contexts/banner_context';

// Components
import DraggableList from 'general_components/draggable_list';
import { TextInput } from 'general_components/form/inputs';
import Confirmation from 'admin_dashboard/daily/bookings_table/booking_overlay/confirmation';
import OverlayContainer from 'admin_dashboard/daily/bookings_table/booking_overlay/overlay_container';
import Loading from 'general_components/loading';

// Stylesheets
import style from './tables.module.css';

const TableInput = function EditTableInputBox({ exit, value }) {
  const onBlur = function submitUpdateToServer(updatedValue) {
    // TODO: submit update to server
    if (updatedValue !== '' && updatedValue !== value) {
      console.log(`submitted ${updatedValue}`);
    }
    exit();
  };

  return (
    <TextInput
      required
      onBlur={(updatedValue) => onBlur(updatedValue)}
      style={style}
      name="numberOfSeats"
      label="Number of Seats"
      type="text"
    />
  );
};

TableInput.propTypes = {
  exit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const deleteTable = () => {
  // TODO: display tables that have not been reallocated in a permanent message.

  console.log('deleted');
};

const DisplayComponent = function ComponentToDisplayInsideDraggableList({ item: table }) {
  const setOverlay = useOverlayContext();
  const [displayEditInput, setDisplayEditInput] = useState(false);
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
              value={table.seats}
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
            setOverlay(
              <OverlayContainer exit={() => setOverlay(null)}>
                <Confirmation
                  message="Deleting a table requires all bookings be allocated a new table. \n This may take a few minutes \n Are you sure you wish to continue?"
                  confirm={() => {
                    deleteTable(table);
                    setOverlay(null);
                  }}
                  cancel={() => setOverlay(null)}
                />
              </OverlayContainer>
              ,
            );
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
  const { response, alternativeRender } = useFetch('/restaurant/tables');
  const setOverlay = useOverlayContext();
  const setBanner = useBannerContext();

  if (alternativeRender) {
    return (
      <div className={style.loadingContainer}>
        {alternativeRender}
      </div>
    );
  }

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
    <>
      <DraggableList
        getName={(table) => table.name}
        styleSheet={style}
        items={response}
        headers={['Name', 'Seats']}
        DisplayComponent={DisplayComponent}
        updateList={(tables) => {
          updatePriorities(tables);
          submitUpdate(tables);
        }}
      />
    </>
  );
};

export default TableList;
