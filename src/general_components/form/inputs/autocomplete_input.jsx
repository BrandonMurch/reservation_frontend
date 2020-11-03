// Dependencies
import React, {
  useRef, useReducer, useCallback,
} from 'react';
import PropTypes from 'prop-types';

// Components
import Input from './base_input';

// Stylesheets
import styleSheet from '../form.module.css';
import useEventListener from 'shared/useEventListener';

const getInitialSuggestionObject = (possibleEntries, filter) => ({
  displaySuggestions: false,
  selectedSuggestion: 0,
  suggestions: possibleEntries.filter((suggestion) => filter(suggestion, '')),
});

const reducer = ((state, action) => {
  switch (action.type) {
    case 'setDisplay':
      return {
        ...state,
        displaySuggestions: action.display,
      };
    case 'up':
      return {
        ...state,
        selectedSuggestion: state.selectedSuggestion > 0
          ? state.selectedSuggestion - 1
          : 0,
      };
    case 'down':
      return {
        ...state,
        selectedSuggestion:
        state.selectedSuggestion > state.suggestions.length - 1
          ? state.suggestions.length - 1
          : state.selectedSuggestion + 1,
      };
    case 'select':
      return { ...state, selectedSuggestion: action.index };
    case 'setSuggestions':
      return { ...state, suggestions: action.callBack() };
    default: throw new Error('No such action exists.');
  }
});

const AutoCompleteInput = ({
  possibleEntries,
  style = styleSheet,
  onBlur,
  filter = ((suggestion, input) => suggestion.indexOf(input) > -1),
  display = ((suggestion) => suggestion),
  ...props
}) => {
  const [
    { displaySuggestions, selectedSuggestion, suggestions }, dispatchSuggestions,
  ] = useReducer(reducer, getInitialSuggestionObject(possibleEntries, filter));

  const mouseOverSelections = useRef(false);
  const mouseOverInput = useRef(false);

  const closeSuggestions = useCallback(() => {
    if (!mouseOverSelections.current && !mouseOverInput.current && displaySuggestions) {
      dispatchSuggestions({ type: 'setDisplay', display: false });
    }
  }, [displaySuggestions]);

  useEventListener('click', closeSuggestions);

  const updateSuggestions = function updateSuggestionsOnChange(input) {
    dispatchSuggestions({
      type: 'setSuggestions',
      callBack: () => (
        possibleEntries
          .filter((suggestion) => filter(suggestion, input))
      ),
    });
  };

  const onSuggestionClick = function onSuggestionClickUpdateValue(selection) {
    dispatchSuggestions({ type: 'setDisplay', display: false });
    onBlur({ value: display(selection) });
  };
  props.type = 'text';

  return (
    <>
      <Input
        {...props}
        style={style}
        onFocus={() => dispatchSuggestions({ type: 'setDisplay', display: true })}
        onKeyDown={({ key }) => {
          if (key === 'ArrowDown') {
            dispatchSuggestions({ type: 'down' });
          } else if (key === 'ArrowUp') {
            dispatchSuggestions({ type: 'up' });
          } else if (key === 'Enter') {
            onSuggestionClick(suggestions[selectedSuggestion]);
          }
        }}
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
              (suggestion, index) => (
                <li key={display(suggestion)}>
                  <option
                    onMouseEnter={() => dispatchSuggestions({ type: 'select', index })}
                    onClick={() => onSuggestionClick(suggestion)}
                    key={suggestion}
                    className={index === selectedSuggestion ? style.hoveredSuggestion : null}
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
    hoveredSuggestion: PropTypes.string.isRequired,
  }),

};

AutoCompleteInput.defaultProps = {
  style: null,
};

export default AutoCompleteInput;
