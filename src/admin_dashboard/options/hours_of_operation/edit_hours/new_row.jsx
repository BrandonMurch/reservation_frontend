import React, { useState } from 'react';
import PropTypes from 'prop-types';

import style from './edit_hours.module.css';

const NewRow = ({ addHours }) => {
  const [open, setOpen] = useState('');
  const [close, setClose] = useState('');
  return (
    <tr className={style.newRow}>
      <td>
        <input
          type="time"
          value={open}
          onChange={({ target }) => setOpen(target.value)}
        />
      </td>
      <td>
        <input
          type="time"
          value={close}
          onChange={({ target }) => setClose(target.value)}
        />
      </td>
      <td>
        <button
          className={style.button}
          type="submit"
          onClick={() => addHours(`${open} - ${close}`)}
        >
          Add
        </button>
      </td>
    </tr>
  );
};

NewRow.propTypes = {
  addHours: PropTypes.func.isRequired,
};

export default NewRow;
