// Dependencies
import React from 'react';
import {
  render, fireEvent, screen, cleanup,
} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import { create } from 'react-test-renderer';
import moment from 'moment';
import types from '../window_types';

// Components
import EditBooking from '../index';

describe('<EditBooking />', () => {
  let component;
  let container = null;
  const props = {
    exit: jest.fn(),
    setErrorBanner: jest.fn(),
    entryWindow: types.CREATE,
    date: '2020-10-24',
    booking: {
      id: 20,
      startTime: moment().format(),
      partySize: 2,
      user: {
        firstName: 'name',
      },
    },
  };

  const clearRender = () => {
    jest.clearAllMocks();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  };

  const buildComponent = () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    component = render(
      <EditBooking {...props} />,
    );
  };

  beforeEach(async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({ status: 200 }));
    buildComponent();
  });

  afterEach(() => {
    clearRender();
  });

  it('should match snapshot', () => {
    const tree = create(
      <EditBooking {...props} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should display an exit button', () => {
    const exitButton = component.getByRole('button', { name: 'X' });
    expect(exitButton).toBeInTheDocument();
  });

  it('should display create window', () => {
    const createDisplay = component.getByText(/Create (b|B)ooking/i);
    expect(createDisplay).toBeInTheDocument();
  });

  it('should display edit window', async () => {
    props.entryWindow = types.EDIT;
    buildComponent();
    const editDisplay = component.getByText(/Save (b|B)ooking/i);
    expect(editDisplay).toBeInTheDocument();
  });

  it('should display delete window', async () => {
    props.entryWindow = types.DELETE;
    buildComponent();
    const editDisplay = component.getByText(/delete the booking/i);
    expect(editDisplay).toBeInTheDocument();
    const submitButton = screen.getByRole('button', { name: 'Yes' });
    fireEvent.click(submitButton);
  });

  it('should call setErrorBanner on error', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('Error!')));
    cleanup();
    buildComponent();
    const submitButton = screen.getByRole('button', { name: 'Yes' });
    fireEvent.click(submitButton);
    expect(props.setErrorBanner).toHaveBeenCalled();
  });

  it('should call exit after fetch', () => {
    const submitButton = screen.getByRole('button', { name: 'Yes' });
    fireEvent.click(submitButton);
    expect(props.exit).toHaveBeenCalled();
  });

  it('should display loading after fetch', async () => {
    const submitButton = screen.getByRole('button', { name: 'Yes' });
    fireEvent.click(submitButton);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
