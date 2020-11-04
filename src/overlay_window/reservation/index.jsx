// Dependencies
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetch, { fetchWrapper } from 'shared/useFetch';

// Components
import TimeSelect from './select/time';
import PartySizeSelect from './select/party_size';

// CSS
import style from './reservation.module.css';
import { useBannerContext, bannerTypes } from 'contexts/banner_context';

const ReservationForm = function CreateAReservationForm(props) {
  const { date, onSubmit } = props;
  const dateString = new Date(date).toDateString();
  const [time, setTime] = useState('');
  const [partySize, setPartySize] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const reservation = { date, time, partySize };
  const setBanner = useBannerContext();

  const { response: maxPartySize, alternativeRender } = useFetch('/restaurant/largest-table');

  useEffect(() => {
    if (date != null && partySize > 0) {
      const getAvailableTimes = async function getAvailableTimesFromServer() {
        setIsLoading(true);
        const path = `/restaurant/availability/?date=${date}&size=${partySize}`;
        const { response, error, loading } = await fetchWrapper(path);
        if (error) {
          setBanner(bannerTypes.ERROR, error);
        } else {
          setAvailableTimes(response);
        }
        setIsLoading(loading);
      };
      getAvailableTimes();
    }
  }, [partySize, date, setBanner]);

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
        loading={isLoading}
        label="Desired time:"
        value={time}
        disabled={(isLoading || partySize === '0' || partySize === '')}
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
};

ReservationForm.defaultProps = {
  date: new Date().toISOString().slice(0, 10),
};

export default ReservationForm;
