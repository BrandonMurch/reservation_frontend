// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

const OpenCloseRow = ({ open, close, remove }) => (
  <tr>
    <td>{open}</td>
    <td>{close}</td>
    <button type="button" onClick={() => remove()}>Remove</button>
  </tr>
);

OpenCloseRow.propTypes = {
  open: PropTypes.string.isRequired,
  close: PropTypes.string.isRequired,
  remove: PropTypes.func.isRequired,
};

export default OpenCloseRow;
