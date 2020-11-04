import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';

export const sleep = function sleepProgram(ms) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < ms);
};

// eslint-disable-next-line import/prefer-default-export
export const renderWithRouter = function createWrapperForRouting(
  ui,
  {
    route = '/',
    history = createMemoryHistory({
      initialEntries: [route],
    }),
  },
) {
  const Wrapper = ({ children }) => <Router history={history}>{children}</Router>;

  Wrapper.propTypes = {
    children: PropTypes.element,
  };

  Wrapper.defaultProps = {
    children: <div />,
  };

  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  };
};

export const mockFetch = function mockFetchResponse(status = 200, returnBody = {}) {
  return new Promise((resolve) => {
    resolve({
      status,
      headers: new Map(),
      ok: true,
      json: () => Promise.resolve(returnBody),
    });
  });
};
