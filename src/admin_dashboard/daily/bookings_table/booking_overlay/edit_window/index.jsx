// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Components
import Form from 'general_components/form';

// Stylesheets
import style from './edit_window.module.css';

const EditWindow = ({
  detailsString, inputs, onSubmit, submitLabel, deleteCallback, deleteText,
}) => (
  <div className={style.formContainer}>
    <div className={style.description}>{detailsString}</div>
    <Form
      inputs={inputs}
      onSubmit={onSubmit}
      submitLabel={submitLabel}
      styleProp={style}
    />
    <div className={style.buttonContainer}>
      <button
        className={style.button}
        type="button"
        onClick={deleteCallback}
      >
        {deleteText}
      </button>
    </div>
  </div>

);

EditWindow.propTypes = {
  detailsString: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
  deleteCallback: PropTypes.func.isRequired,
  deleteText: PropTypes.string.isRequired,

};

EditWindow.defaultProps = {
};

export default EditWindow;
