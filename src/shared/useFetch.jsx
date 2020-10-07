// Dependencies
import React, { useState, useEffect } from 'react';

// Components
import Loading from 'general_components/loading';
import Banner, { bannerTypes } from 'general_components/banner';

const getLoadingObject = function getLoadingComponent() {
  return {
    alternativeRender: <Loading />,
    response: null,
    error: null,
    loading: true,
  };
};

const getError = function getErrorObject(status = 500, error = 'Something went wrong... \n please try again later') {
  return {
    status,
    error,
    alternativeRender: <Banner type={bannerTypes.ERROR} message={error} />,
    loading: false,
  };
};

const isStatus2xx = function checkStatusForSuccessfulResponses(status) {
  return (status >= 200 && status < 300);
};

const addDefaults = function addFetchDefaultsIfNotPresent(fetchArguments) {
  if ('headers' in fetchArguments === false) {
    fetchArguments.headers = {};
  }
  fetchArguments.headers['Content-Type'] = 'application/json';
  if (!fetchArguments.method) {
    fetchArguments.method = 'GET';
  }
};

export const fetchWrapper = async function fetchFromServer(path, fetchArguments) {
  if (fetchArguments.skip) {
    return {
      status: null,
      alternativeRender: null,
      error: null,
      loading: false,
      body: null,
    };
  }
  const url = `http://localhost:8080${path}`;
  const args = fetchArguments === undefined ? {} : fetchArguments;
  addDefaults(args);
  let response;
  try {
    response = await fetch(url, args);
  } catch (e) {
    return getError();
  }

  let responseBody;
  try {
    responseBody = await response.json();
  } catch (e) {
    if (!isStatus2xx(response.status)) {
      return getError(response.status);
    }
    return {
      status: response.status,
      alternativeRender: null,
      error: null,
      loading: false,
      body: null,
    };
  }

  if (!isStatus2xx(response.status)) {
    if (responseBody && responseBody.message) {
      return getError(response.status, responseBody.message);
    }
    return getError(response.status);
  }
  return {
    status: response.status,
    alternativeRender: null,
    response: responseBody,
    error: null,
    loading: false,
  };
};

/**
 * @returns {alternativeRender, response, error, loading}
 * alternativeRender - REACT JSX - different components, ex. error, loading
 * response - OBJECT - response from server
 * error - STRING - for custom error handling
 * loading - BOOLEAN - if the screen is still loading
 *
 * @param {*} url
 * @param {*} method
 * @param {*} body
 */
const useFetch = function useFetch(path, args) {
  const [fetchResponse, setFetchResponse] = useState(getLoadingObject());

  useEffect(() => {
    const getResponse = (async () => {
      setFetchResponse(await fetchWrapper(path, args));
    });
    getResponse();
  // If this is set to change with args, it just constantly reloads the page...
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return fetchResponse;
};

export default useFetch;
