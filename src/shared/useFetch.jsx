// Dependencies
import React, { useState, useEffect } from 'react';

// Components
import Loading from 'general_components/loading';
import Banner, { bannerTypes } from 'general_components/banner';

const getLoadingObject = function getLoadingComponent() {
  return {
    alternativeRender: <Loading size="large" />,
    response: null,
    error: null,
    loading: true,
  };
};

const getError = function getErrorObject(status = 500, passedInError, forceFetch) {
  let error = passedInError;
  // Server sends this message and I can't figure out where it is coming from...
  if (!error || error === 'No message available') {
    error = 'Something went wrong... \n please try again later';
  }

  return {
    forceFetch,
    status,
    error,
    alternativeRender: <Banner type={bannerTypes.ERROR} message={error} />,
    loading: false,
  };
};

const isStatus2xx = function checkStatusForSuccessfulResponses(status) {
  return (status >= 200 && status < 300);
};

const getMessageWithSubErrors = (message, subErrors) => {
  const subErrorsText = subErrors
    .map((subError) => `${subError.object} : ${subError.message}`)
    .join(', ');
    // TODO: return message \n subErrors
  return (
    <>
      <p>{message}</p>
      <p>{subErrorsText}</p>
    </>
  );
};

export const fetchWrapper = async function fetchFromServer(
  path,
  // Defaults: an object that contains an empty header object, and a 'GET' method
  { method = 'GET', headers = {}, ...fetchArguments } = {},
) {
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
  let response;
  headers['Content-Type'] = 'application/json';
  try {
    response = await fetch(url, { method, headers, ...fetchArguments });
  } catch (e) {
    return getError();
  }

  let forceFetch;
  if (response.headers && response.headers.has('forcible-request')) {
    headers.force = true;
    forceFetch = () => fetchWrapper(path, { method, headers, ...fetchArguments });
  }
  let responseBody;
  try {
    responseBody = await response.json();
  } catch (e) {
    if (!isStatus2xx(response.status)) {
      return getError(response.status, null, forceFetch);
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
    if (responseBody.subErrors && responseBody.subErrors.length > 0) {
      const message = getMessageWithSubErrors(response.message, response.subErrors);
      return getError(response.status, message, forceFetch);
    }
    if (responseBody.message) {
      return getError(response.status, responseBody.message, forceFetch);
    }
    return getError(response.status, null, forceFetch);
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
const useFetch = function useFetch(path, args, toggle = false) {
  const [fetchResponse, setFetchResponse] = useState(getLoadingObject());

  useEffect(() => {
    const getResponse = (async () => {
      setFetchResponse(await fetchWrapper(path, args));
    });
    getResponse();
  // If this is set to change with args, it just constantly reloads the page...
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, toggle]);

  return fetchResponse;
};

export default useFetch;
