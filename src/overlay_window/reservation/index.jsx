// Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Components
import TimeSelect from './select/time';
import PartySizeSelect from './select/party_size';

// CSS
import style from './reservation.module.css';

const getAvailableTimes = function getAvailableTimesFromServer(
  date, partySize, setIsLoaded, setError, setAvailableTimes,
) {
  if (partySize === 0 || date == null) {
    return;
  }

  setIsLoaded(false);
  fetch(`http://localhost:8080/restaurant/availability/?date=${date}&size=${partySize}`)
    .then((res) => res.json())
    .then(
      (result) => {
        setAvailableTimes(result);
        setIsLoaded(true);
      },
      (error) => {
        setError(error);
      },
    );
};

const ReservationForm = function CreateAReservationForm(props) {
  const { date, onSubmit, setError } = props;
  const dateString = new Date(date).toDateString();
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState(0);
  const [isLoaded, setIsLoaded] = useState(true);
  const [availableTimes, setAvailableTimes] = useState([]);
  const reservation = {
    date,
    time,
    partySize,
  };

  const isSubmitDisabled = (time === '' || partySize === '');
  const isTimeDisabled = (!isLoaded || partySize === 0);

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
            setPartySize(parseInt(target.value, 10));
            if (partySize === '') {
              setTime('');
            }
          }}
        />
        <TimeSelect
          label="Desired time:"
          value={time}
          disabled={isTimeDisabled}
          setIsLoaded={setIsLoaded}
          availableTimes={availableTimes}
          onChange={({ target }) => {
            setTime(target.value);
          }}
        />
        <input type="submit" value="Next" disabled={isSubmitDisabled} />
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
