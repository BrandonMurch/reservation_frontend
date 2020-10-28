// Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch, { fetchWrapper } from 'shared/useFetch';

// Components
import TimeSelect from './select/time';
import PartySizeSelect from './select/party_size';

// CSS
import style from './reservation.module.css';

const ReservationForm = function CreateAReservationForm(props) {
  const { date, onSubmit, setError } = props;
  const dateString = new Date(date).toDateString();
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const reservation = { date, time, partySize };

  const { response: maxPartySize, alternativeRender } = useFetch('/restaurant/largest-table');

  useEffect(() => {
    if (date != null && partySize > 0) {
      const getAvailableTimes = async function getAvailableTimesFromServer() {
        setIsLoading(false);
        const path = `/restaurant/availability/?date=${date}&size=${partySize}`;
        const { response, error, loading } = await fetchWrapper(path);
        setError(error);
        setAvailableTimes(response);
        setIsLoading(loading);
      };
      getAvailableTimes();
    }
  }, [partySize, date, setError]);

  if (alternativeRender) {
    return alternativeRender;
  }
  return (
    <form
      onSubmit={(event) => {
        onSubmit(event, reservation);
      }}
      className={style.container}
    >
      <p className={style.title}>{`Desired date: ${dateString}`}</p>
      <PartySizeSelect
        label="Party size:"
        value={partySize}
        disabled={(isLoading)}
        max={maxPartySize}
        onChange={({ target }) => {
          setPartySize(target.value);
          if (partySize === '') {
            setTime('');
          }
        }}
      />
      <TimeSelect
        label="Desired time:"
        value={time}
        disabled={(isLoading || partySize === '0')}
        availableTimes={availableTimes}
        onChange={({ target }) => { setTime(target.value); }}
      />
      <input type="submit" value="Next" disabled={(time === '' || partySize === '') || isLoading} />
    </form>
  );
};

ReservationForm.propTypes = {
  date: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

ReservationForm.defaultProps = {
  date: new Date().toISOString().slice(0, 10),
};

export default ReservationForm;
