// Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import fetchWrapper from 'shared/fetch';
import TimeSelect from './select/time';
import PartySizeSelect from './select/party_size';

// CSS
import style from './reservation.module.css';

const getAvailableTimes = async function getAvailableTimesFromServer(
  date, partySize, setIsLoaded, setError, setAvailableTimes,
) {
  if (partySize === 0 || date == null) {
    return;
  }

  setIsLoaded(false);
  const urlPath = `/restaurant/availability/?date=${date}&size=${partySize}`;
  fetchWrapper(urlPath, 'get')
    .then((result) => {
      if (result.length === 0) {
        setError('There are no available times for the party size you have selected');
      } else {
        setError(undefined);
        setAvailableTimes(result);
      }
      setIsLoaded(true);
    },
    (error) => {
      setIsLoaded(true);
      setError(error.message);
    });
};

const ReservationForm = function CreateAReservationForm(props) {
  const { date, onSubmit, setError } = props;
  const dateString = new Date(date).toDateString();
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('0');
  const [isLoaded, setIsLoaded] = useState(true);
  const [availableTimes, setAvailableTimes] = useState([]);
  const reservation = { date, time, partySize };

  useEffect(() => {
    getAvailableTimes(date, partySize, setIsLoaded, setError, setAvailableTimes);
  }, [partySize, date, setError]);

  if (isLoaded) {
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
          setIsLoaded={setIsLoaded}
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
          disabled={(!isLoaded || partySize === '0')}
          setIsLoaded={setIsLoaded}
          availableTimes={availableTimes.current}
          onChange={({ target }) => { setTime(target.value); }}
        />
        <input type="submit" value="Next" disabled={(time === '' || partySize === '')} />
      </form>
    );
  }
  return null;
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
