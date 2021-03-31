# Plane Tracker

## Technical stack

The back-end queries the [OpenSky API](https://opensky-network.org/) to get the location and other information regarding the planes.

The project relies on:

- Websockets (native websockets for the front-end and [ws](https://github.com/websockets/ws) for the back-end)
- [Webpack 5](https://webpack.js.org/)
- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [GraphQL](https://github.com/graphql/graphql-js)
- [Axios](https://github.com/axios/axios) to call OpenSky
- [Luxon](https://moment.github.io/luxon) to format dates

## Installation

```bash
npm install
```

## How to run the project

### Development mode

```bash
npm run webpack:dev
```

```bash
npm run server:dev
```

### Production mode

```bash
npm run webpack:prod
```

```bash
npm run server:prod
```

### Browser

Go to [http://localhost:4000/](http://localhost:4000/).