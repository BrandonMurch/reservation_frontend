// Dependencies
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

// Components
import Input from './base_input';

// Stylesheets
import styleSheet from '../form.module.css';

const AutoCompleteInput = ({
  possibleEntries,
  style: propStyle,
  onBlur,
  filter: propsFilter,
  display: propsDisplay,
  ...props
}) => {
  const [displaySuggestions, setDisplaySuggestions] = useState(false);
  const style = propStyle ?? styleSheet;
  const mouseOverSelections = useRef(false);
  const mouseOverInput = useRef(false);
  const filter = propsFilter
    ?? ((suggestion, input) => suggestion.indexOf(input) > -1);
  const display = propsDisplay ?? ((suggestion) => suggestion);
  const [suggestions, setSuggestions] = useState(
    possibleEntries.filter((suggestion) => filter(suggestion, '')),
  );

  const updateSuggestions = function updateSuggestionsOnChange(input) {
    setSuggestions(() => (
      possibleEntries
        .filter((suggestion) => filter(suggestion, input))
    ));
  };

  const closeSuggestions = function closeSuggestionsBoxIfNotHoveringAndOpen() {
    if (!mouseOverSelections.current && !mouseOverInput.current && displaySuggestions) {
      setDisplaySuggestions(false);
    }
  };
  window.addEventListener('click', closeSuggestions);

  const onSuggestionClick = function onSuggestionClickUpdateValue(selection) {
    setDisplaySuggestions(false);
    props.value = selection;
    onBlur({ value: display(selection) });
  };
  props.type = 'text';

  return (
    <>
      <Input
        {...props}
        style={style}
        onFocus={() => setDisplaySuggestions(true)}
        onMouseEnter={() => { mouseOverInput.current = true; }}
        onMouseLeave={() => { mouseOverInput.current = false; }}
        onChange={({ value }) => {
          updateSuggestions(value);
        }}
        onBlur={(target, reset) => {
          if (!mouseOverSelections.current) {
            onBlur(target, reset);
          }
        }}
      />
      {displaySuggestions && suggestions.length > 0
        ? (
          <ul
            className={style.suggestionContainer}
            onMouseEnter={() => { mouseOverSelections.current = true; }}
            onMouseLeave={() => { mouseOverSelections.current = false; }}
          >
            {suggestions.map(
              (suggestion) => (
                <li key={display(suggestion)}>
                  <option
                  // TODO: how to trigger a key press here?
                    onKeyPress={(event) => console.log(event)}
                    onClick={() => onSuggestionClick(suggestion)}
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
  // eslint-disable-next-line
  possibleEntries: PropTypes.array.isRequired,
  onBlur: PropTypes.func.isRequired,
  filter: PropTypes.func.isRequired,
  display: PropTypes.func.isRequired,
  style: PropTypes.shape({
    suggestionContainer: PropTypes.string.isRequired,
    suggestion: PropTypes.string.isRequired,
  }),

};

AutoCompleteInput.defaultProps = {
  style: null,
};

export default AutoCompleteInput;
