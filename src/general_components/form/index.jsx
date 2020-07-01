// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Components
import Checkbox from './Checkbox';
import Input from './Input';

// CSS
import style from './form.module.css';

const updateAfterClick = function updateCheckboxValueOnClick(obj, name, value) {
  const object = obj;
  object[name] = value;
};

const onBlur = function updateObjectValueOnBlur({ target }, obj) {
  const object = obj;
  object[target.name] = target.value;
};

const getInputs = function createListOfInputsForForm(inputs, object) {
  const inputList = [];

  inputs.forEach((input, index) => {
    const autoFocus = (index === 0);
    if (input.type === 'checkbox') {
      inputList.push(
        <Checkbox
          key={input.name}
          onClick={(name, value) => updateAfterClick(object, name, value)}
          name={input.name}
          label={input.label}
          autoFocus={autoFocus}
        />,
      );
    } else if (input.type === 'submit') {
      inputList.push(
        <input
          key="submit"
          className={style.submit}
          type="submit"
          value="Next"
          // TODO: autofocus??
          autoFocus={autoFocus} // eslint-disable-line jsx-a11y/no-autofocus
        />,
      );
    } else {
      inputList.push(
        <Input
          key={input.name}
          name={input.name}
          type={input.type}
          label={input.label}
          onBlur={(event) => onBlur(event, object)}
          autoFocus={autoFocus}
        />,
      );
    }
  });

  return inputList;
};

export default function Form(props) {
  const { object, inputs, onSubmit } = props;
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event, onSubmit, object);
      }}
      className={style.container}
    >
      {getInputs(inputs, object)}
    </form>
  );
}

Form.propTypes = {
  // TODO: fix these proptypes
  object: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  inputs: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  onSubmit: PropTypes.func.isRequired,
};
