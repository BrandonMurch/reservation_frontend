// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// CSS
import style from './reservation.module.css';

const ReservationForm = function CreateAReservationForm(props) {
  const { date, onSubmit } = props;
  const dateString = new Date(date).toDateString();
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('');
  const reservation = {
    date,
    time,
    partySize,
  };

  const submitDisabled = (time === '' || partySize === '');
  const timeDisabled = (reservation.partySize === '');

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
        value={reservation.partySize}
        onChange={({ target }) => {
          setPartySize(target.value);
          if (partySize === '') {
            setTime('');
          }
        }}
        autoFocus
      />
      <DropDownSelect
        type="time"
        label="Desired time:"
        value={reservation.time}
        disabled={timeDisabled}
        onChange={({ target }) => {
          setTime(target.value);
        }}
      />
      <input type="submit" value="Next" disabled={submitDisabled} />
    </form>
  );
};

ReservationForm.propTypes = {
  date: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const emptyOption = function createAnEmptyOptionForASelectInput() {
  return <option key={0} aria-label="emptyOption" value="" />;
};

const partySizeOptions = function createAListOfPartySizeOptionsForASelectInput() {
  // TODO: get max partysize from server
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

const availableTimes = function getAvailableTimesFromServer() {
  // todo this is a stub, will update later, and get real times from server
  return ['7:00PM', '8:30PM'];
};

const timeOptions = function getTimeOptionsForASelectInput() {
  const times = availableTimes();
  const options = [emptyOption()];

  times.forEach((time) => {
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
    autoFocus,
    onChange,
    type,
    value,
    label,
    disabled,
  } = props;

  // const [value, setValue] = useState(propValue);

  let options;
  if (type === 'partySize') {
    options = partySizeOptions();
  } else if (type === 'time') options = timeOptions();

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
        // TODO: autofocus??
        autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
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
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
};

DropDownSelect.defaultProps = {
  value: '',
  autoFocus: false,
  disabled: false,
};

export default ReservationForm;
