// Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// CSS
import style from './reservation.module.css';

const getAvailableTimes = function getAvailableTimesFromServer(
  date, partySize, setIsLoaded, setError, setAvailableTimes,
) {
  if (partySize === '' || date == null) {
    return;
  }

  setIsLoaded(false);
  fetch(`http://localhost:8080/availability/?date=${date}&size=${partySize}`)
    .then((res) => res.json())
    .then(
      (result) => {
        setAvailableTimes(result);
        setIsLoaded(true);
      },
      (error) => {
        setError(error);
        setIsLoaded(true);
        return ['7:00PM', '8:30PM'];
      },
    );
};

const ReservationForm = function CreateAReservationForm(props) {
  const { date, onSubmit } = props;
  const dateString = new Date(date).toDateString();
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const reservation = {
    date,
    time,
    partySize,
  };

  const submitDisabled = (time === '' || partySize === '');
  const timeDisabled = (!isLoaded || partySize === '');

  useEffect(() => {
    getAvailableTimes(date, partySize, setIsLoaded, setError, setAvailableTimes);
  }, [partySize, date]);

  if (error) {
    return <div>error.message</div>;
  }
  return (
    <form
      onSubmit={(event) => {
        onSubmit(event, reservation);
      }}
      className={style.container}
    >
      <p className={style.title}>{`Desired date: ${dateString}`}</p>
      <DropDownSelect
        type="partySize"
        label="Party size:"
        value={partySize}
        onChange={({ target }) => {
          setPartySize(target.value);
          if (partySize === '') {
            setTime('');
          }
        }}
        autoFocus
        setIsLoaded={setIsLoaded}
      />
      <DropDownSelect
        type="time"
        label="Desired time:"
        value={time}
        disabled={timeDisabled}
        onChange={({ target }) => {
          setTime(target.value);
        }}
        setIsLoaded={setIsLoaded}
        availableTimes={availableTimes}
      />
      <input type="submit" value="Next" disabled={submitDisabled} />
    </form>
  );
};

ReservationForm.propTypes = {
  date: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

ReservationForm.defaultProps = {
  date: new Date().toISOString().slice(0, 10),
};

const emptyOption = function createAnEmptyOptionForASelectInput() {
  return <option key={0} aria-label="emptyOption" value="" />;
};

const partySizeOptions = function createAListOfPartySizeOptionsForASelectInput() {
  const maxPartySize = 8;
  const options = [emptyOption()];

  for (let i = 1; i <= maxPartySize; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>,
    );
  }
  return options;
};

const timeOptions = function getTimeOptionsForASelectInput(availableTimes) {
  const options = [emptyOption()];

  availableTimes.forEach((time) => {
    options.push(
      <option key={time} value={time}>
        {time}
      </option>,
    );
  });
  return options;
};

const DropDownSelect = function CreateADropDownSelectForAForm(props) {
  const {
    onChange,
    type,
    value,
    label,
    disabled,
    availableTimes,
  } = props;

  // const [value, setValue] = useState(propValue);

  let options;
  if (type === 'partySize') {
    options = partySizeOptions();
  } else if (type === 'time') options = timeOptions(availableTimes);

  return (
    <div className={style.inputGroup}>
      <label className={style.labelText} htmlFor={type}>
        {label}
      </label>
      <select
        key={type}
        className={style.selectBox}
        value={value}
        name={type}
        id={type}
        disabled={disabled}
        onChange={(event) => {
          onChange(event);
        }}
      >
        {options}
      </select>
    </div>
  );
};

DropDownSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  availableTimes: PropTypes.arrayOf(String),
};

DropDownSelect.defaultProps = {
  value: '',
  disabled: false,
  availableTimes: [],
};

export default ReservationForm;
