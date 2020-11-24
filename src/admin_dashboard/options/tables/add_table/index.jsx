// Dependencies
import React, { useState } from 'react';
import { useBannerContext, bannerTypes } from 'contexts/banner_context';
import { useTokenContext } from 'contexts/token_context';
import { useRefreshContext } from '../refresh_context';
import { fetchWrapper } from 'shared/useFetch';

// Components
import Loading from 'general_components/loading';
import { TextInput } from 'general_components/form/inputs';

// Stylesheet
import style from '../tables.module.css';

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

const AddTable = function AddTableInputInList() {
  const [isLoading, setIsLoading] = useState(false);
  const [displayButton, setDisplayButton] = useState(false);
  const [inputValues, setInputValues] = useState();
  const setBanner = useBannerContext();
  const refresh = useRefreshContext();

  const opacity = displayButton ? 1 : 0;

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div
      className={style.itemContainer}
      onBlur={() => setDisplayButton(false)}
    >
      <div className={style.itemBackground}>
        <div className={style.item}>
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
        </div>
        <div className={style.item}>
          <TextInput
            required
            onFocus={() => setDisplayButton(true)}
            onBlur={(updatedValue) => {
              setInputValues((prevState) => ({ ...prevState, seats: updatedValue }));
            }}
            style={style}
            name="numberOfSeats"
            label="Seats"
            type="text"
          />
        </div>

      </div>

      <button
        style={{ opacity }}
        className={style.addButton}
        onClick={() => {
          setDisplayButton(false);
          submit(inputValues, setIsLoading, setBanner);
          refresh();
        }}
        type="button"
      >
        Add Table
      </button>
    </div>
  );
};

export default AddTable;
