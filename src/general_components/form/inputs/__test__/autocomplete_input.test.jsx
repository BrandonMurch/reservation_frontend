// Dependencies
import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import { create } from 'react-test-renderer';

// Components
import AutoCompleteInput from '../autocomplete_input';
import userEvent from '@testing-library/user-event';

// Stylesheet
import style from '../../form.module.css';

describe('<AutoCompleteInput />', () => {
  const props = {
    style,
    possibleEntries: ['apple', 'banana', 'baboon'],
    name: 'InputBox',
    onBlur: jest.fn(),
    updateValue: jest.fn(),
    label: 'Autocomplete!',
  };

  beforeEach(() => {
    render(
      <AutoCompleteInput {...props} />,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match snapshot', () => {
    const tree = create(
      <AutoCompleteInput {...props} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display suggestions when the user types', () => {
    const input = screen.getByRole('textbox', { name: 'Autocomplete!' });
    userEvent.click(input);
    userEvent.type(input, 'ba');
    expect(screen.getByText('banana')).toBeInTheDocument();
    expect(screen.getByText('baboon')).toBeInTheDocument();
    expect(screen.queryByText('apple')).toBeNull();
  });
  it('should display suggestions when the user types', () => {
    const input = screen.getByRole('textbox', { name: 'Autocomplete!' });
    userEvent.click(input);
    userEvent.type(input, 'ba');
    const suggestion = screen.getByText('banana');
    userEvent.click(suggestion);
    expect(props.onBlur).toHaveBeenCalledWith({ value: 'banana' });
  });
});
