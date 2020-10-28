// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import Input from './base_input';

// Stylesheets
import styleSheet from '../form.module.css';

const AutoCompleteInput = ({
  possibleEntries,
  propsStyle,
  onChange,
  onBlur,
  filter: propsFilter,
  display: propsDisplay,
  ...props
}) => {
  const [suggestions, setSuggestions] = useState(possibleEntries);
  const [displaySuggestions, setDisplaySuggestions] = useState(false);
  const style = propsStyle ?? styleSheet;

  const defaultFilter = (suggestion, input) => suggestion.indexOf(input) > -1;
  const defaultDisplay = (suggestion) => suggestion;
  const filter = propsFilter ?? defaultFilter;
  const display = propsDisplay ?? defaultDisplay;

  let mouseOverSelections = false;

  const updateSuggestions = function updateSuggestionsOnChange(input) {
    setSuggestions(() => (
      possibleEntries
        .filter((suggestion) => filter(suggestion, input))
    ));
  };

  const onClick = (selection) => {
    setDisplaySuggestions(false);
    props.value = selection;
    onBlur({ value: display(selection) });
  };
  props.type = 'text';

  return (
    <>
      <Input
        {...props}
        onBlur={(value) => {
          if (!mouseOverSelections) {
            setDisplaySuggestions(false);
            onBlur(value);
          }
        }}
        onFocus={() => setDisplaySuggestions(true)}
        style={style}
        onChange={(target) => {
          updateSuggestions(target.value);
          onChange(target);
        }}
      />
      {displaySuggestions && suggestions.length > 0
        ? (
          <ul
            className={style.suggestionContainer}
            onMouseEnter={() => { mouseOverSelections = true; }}
            onMouseLeave={() => { mouseOverSelections = false; }}
          >
            {suggestions.map(
              (suggestion) => (
                <li>
                  <option
                  // TODO: how to trigger a key press here?
                    onKeyPress={(event) => console.log(event)}
                    onClick={() => onClick(suggestion)}
                    key={suggestion}
                    className={style.suggestion}
                  >
                    {display(suggestion)}
                  </option>
                </li>
              ),
            )}
          </ul>
        )
        : null}
    </>
  );
};

AutoCompleteInput.propTypes = {
  possibleEntries: PropTypes.arrayOf(PropTypes.string).isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.func.isRequired,
  display: PropTypes.func.isRequired,
  propsStyle: PropTypes.shape({
    suggestionContainer: PropTypes.string.isRequired,
    suggestion: PropTypes.string.isRequired,
  }),

};

AutoCompleteInput.defaultProps = {
  propsStyle: null,
};

export default AutoCompleteInput;
