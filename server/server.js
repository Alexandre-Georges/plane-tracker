const path = require('path');
const http = require('http');

const graphql = require('./graphql');
const webSocketify = require('./web-socketify');

const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const PORT = 3000;

const app = express();

const distDir = path.join(__dirname, '../dist');

app.use(express.static(distDir));
app.get('/', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphql.schema,
    graphiql: true,
  })
);

const server = http.createServer(app);

// Upgrading the request with Web Sockets
server.on('upgrade', function upgrade(request, socket, head) {
  webSocketify(request, socket, head);
});

server.listen(PORT);
console.log('done');
