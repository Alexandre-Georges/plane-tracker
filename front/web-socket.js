const create = (onStart, receiver) => {
  const socket = new WebSocket(`${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}`);

  socket.addEventListener('open', (event) => {
    onStart(event);
  });

  socket.addEventListener('message', (event) => {
    receiver(event);
  });

  return (data) => socket.send(JSON.stringify(data));
};

export default create;
