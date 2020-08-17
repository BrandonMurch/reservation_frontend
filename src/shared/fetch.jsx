const isStatus2xx = function checkStatusForSuccessfulResponses(status) {
  return (status >= 200 && status < 300);
};

/**
 *  Throws exception
 */
const fetchWrapper = async function fetchFromServer(path, method, body) {
  const serverAddress = 'http://localhost:8080';

  let response;
  let responseBody;
  try {
    response = await fetch(`${serverAddress}${path}`, {
      method,
      body,
      headers: { 'Content-Type': 'application/json' },
    });
    responseBody = await response.json();
  } catch (error) {
    throw new Error('Something went wrong... \n please try again later');
  }

  if (!isStatus2xx(response.status)) {
    if (responseBody && responseBody.message) {
      throw new Error(responseBody.message);
    } else {
      throw new Error('Something went wrong... \n please try again later');
    }
  }
  return responseBody;
};

export default fetchWrapper;
