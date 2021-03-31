import callbackHandlerConstructor from '../common/callback-handler';
import createWebSocket from './web-socket';

const callbackHandler = callbackHandlerConstructor();
let sendWebSocket = null;

const sendRequest = (message, callback) => {
  callbackHandler.addCallback(message.variables.requestId, callback);
  sendWebSocket(message);
};

const processMessage = (response) => {
  const responseData = JSON.parse(response.data);
  if (responseData.error) {
    callbackHandler.executeGeneralErrorCallback(responseData.error);
    return;
  }
  const data = responseData.data;

  for (const queryName of Object.keys(data)) {
    const queryResponse = responseData.data[queryName];
    callbackHandler.executeCallback(queryResponse.requestId, queryResponse.data, queryResponse.error);
  }
};

const setGeneralErrorCallback = (callback) => callbackHandler.addGeneralErrorCallback(callback);

const executeWhenReady = (callback) => {
  sendWebSocket = createWebSocket(callback, processMessage);
};

export default {
  setGeneralErrorCallback,
  executeWhenReady,
  sendRequest,
};
