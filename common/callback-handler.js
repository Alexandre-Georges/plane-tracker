const create = () => {
  let generalErrorCallback = null;
  const callbackMap = {};

  const addGeneralErrorCallback = (callback) => (generalErrorCallback = callback);
  const executeGeneralErrorCallback = (error) => generalErrorCallback(error);

  const addCallback = (id, callback) => (callbackMap[id] = callback);
  const executeCallback = (id, response, error) => {
    // const callback = callbackMap[id];
    // delete callbackMap[id];
    callbackMap[id](response, error);
  };

  return {
    addGeneralErrorCallback,
    executeGeneralErrorCallback,
    addCallback,
    executeCallback,
  };
};

module.exports = create;
