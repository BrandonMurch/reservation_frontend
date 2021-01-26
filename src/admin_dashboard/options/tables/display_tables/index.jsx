// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fetchWrapper } from 'shared/useFetch';
import { useOverlayContext } from 'contexts/overlay_context';
import { useTokenContext } from 'contexts/token_context';
import { useBannerContext, bannerTypes } from 'contexts/banner_context';
import { useRefreshContext } from '../refresh_context';

// Components
import Confirmation from 'admin_dashboard/daily/bookings_table/booking_overlay/confirmation';
import OverlayContainer from 'admin_dashboard/daily/bookings_table/booking_overlay/overlay_container';
import Loading from 'general_components/loading';
import TextInput from 'general_components/form/inputs/text';

// StyleSheets
import style from '../tables.module.css';

const EditTable = function EditTableInputBox({ exit, table }) {
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

EditTable.propTypes = {
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

export const Headers = () => {
  const headers = ['Name', 'Seats'];
  return (
    headers.map((header) => (
      <h2
        className={style.header}
        key={header}
      >
        {header}
      </h2>
    )));
};

const DisplayTables = function ComponentToDisplayInsideDraggableList({ item: table }) {
  const setOverlay = useOverlayContext();
  const [displayEditInput, setDisplayEditInput] = useState(false);
  const refresh = useRefreshContext();
  return (
    <div
      className={style.itemContainer}
    >
      <div className={style.itemBackground}>
        <div className={style.item}>{table.name}</div>
        <div className={style.item}>
          {displayEditInput
            ? (
              <EditTable
                exit={() => {
                  setDisplayEditInput(false);
                }}
                table={table}
              />
            )
            : table.seats}

        </div>
      </div>

      <button
        className={style.editButton}
        onClick={() => setDisplayEditInput((current) => !current)}
        type="button"
      >
        Edit
      </button>
      <button
        className={style.deleteButton}
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
    </div>
  );
};

DisplayTables.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    seats: PropTypes.number,
  }).isRequired,
};

export default DisplayTables;
