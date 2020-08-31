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

const getError = function getErrorObject(error = 'Something went wrong... \n please try again later') {
  return {
    error,
    alternativeRender: <Banner type={bannerTypes.ERROR} message={error} />,
    loading: false,
  };
};

const isStatus2xx = function checkStatusForSuccessfulResponses(status) {
  return (status >= 200 && status < 300);
};

export const fetchWrapper = async function fetchFromServer(url, method, body) {
  const serverAddress = 'http://localhost:8080';

  let response;
  let responseBody;
  try {
    response = await fetch(`${serverAddress}${url}`, {
      method,
      body,
      headers: { 'Content-Type': 'application/json' },
    });
    responseBody = await response.json();
  } catch (e) {
    return getError();
  }

  if (!isStatus2xx(response.status)) {
    if (responseBody && responseBody.message) {
      return getError(responseBody.message);
    }
    return getError();
  }
  return {
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
const useFetch = function useFetch(url, method = 'get', body) {
  const [fetchResponse, setFetchResponse] = useState(getLoadingObject());

  useEffect(() => {
    const getResponse = (async () => {
      setFetchResponse(await fetchWrapper(url, method, body));
    });
    getResponse();
  }, [url, method, body]);

  return fetchResponse;
};

export default useFetch;
