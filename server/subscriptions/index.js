const subscriptionMap = {};

const create = (key, callback, latestMessage, time) => {
  const subscription = subscriptionMap[key];
  if (subscription) {
    remove(key);
  }
  subscriptionMap[key] = { callback, latestMessage, time };
  executeAndRepeat(key);
};

const isLatestSubscription = (key, message) => subscriptionMap[key].latestMessage === message;

const remove = (key) => {
  const subscription = subscriptionMap[key];
  clearTimeout(subscription.timeoutId);
  delete subscriptionMap[key];
};

const executeAndRepeat = async (key) => {
  const subscription = subscriptionMap[key];
  await subscription.callback();
  subscription.timeoutId = setTimeout(() => executeAndRepeat(key), subscription.time);
};

module.exports = {
  create,
  isLatestSubscription,
};
