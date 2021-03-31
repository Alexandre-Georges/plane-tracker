const WebSocket = require('ws');
const graphql = require('./graphql');
const subscriptions = require('./subscriptions');

const webSocketServer = new WebSocket.Server({ noServer: true });

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

const interval = setInterval(() => {
  webSocketServer.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.ping(noop);
  });
}, 5000);

webSocketServer.on('close', () => {
  clearInterval(interval);
});

webSocketServer.on('connection', async (context) => {
  context.isAlive = true;
  context.on('pong', heartbeat);
  console.log(`${webSocketServer.clients} client(s) connected`);

  context.on('message', (message) => {
    subscriptions.create(
      context,
      async () => {
        const result = await graphql.executeQuery(JSON.parse(message));
        if (subscriptions.isLatestSubscription(context, message)) {
          context.send(JSON.stringify(result));
        }
      },
      message,
      5000
    );
  });

  context.on('close', () => {
    console.log(`Connection closed: ${webSocketServer.clients.size} client(s) remaining`);
  });
});

module.exports = (request, socket, head) => {
  try {
    webSocketServer.handleUpgrade(request, socket, head, (ws) => {
      webSocketServer.emit('connection', ws, request);
    });
  } catch (exception) {
    console.log('upgrade exception', exception);
    socket.destroy();
    return;
  }
};
