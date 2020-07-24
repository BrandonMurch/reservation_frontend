import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import PropTypes from 'prop-types';

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

export const mockFetch = function mockFetchResponse(status, returnBody) {
  return new Promise((resolve) => {
    resolve({
      ok: true,
      status: status || 200,
      json: () => Promise.resolve(returnBody || {}),
    });
  });
};
