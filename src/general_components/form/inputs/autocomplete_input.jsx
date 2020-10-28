// Dependencies
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

// Components
import Input from './base_input';

// Stylesheets
import styleSheet from '../form.module.css';

const AutoCompleteInput = ({
  possibleEntries,
  propsStyle,
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

  const mouseOverSelections = useRef(false);
  const mouseOverInput = useRef(false);

  const updateSuggestions = function updateSuggestionsOnChange(input) {
    setSuggestions(() => (
      possibleEntries
        .filter((suggestion) => filter(suggestion, input))
    ));
  };

  window.addEventListener('click', () => {
    if (!mouseOverSelections.current && !mouseOverInput.current && displaySuggestions) {
      setDisplaySuggestions(false);
    }
  });

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
  // eslint-disable-next-line
  possibleEntries: PropTypes.array.isRequired,
  onBlur: PropTypes.func.isRequired,
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
