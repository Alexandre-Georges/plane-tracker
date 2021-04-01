# Plane Tracker

## Technical stack

The back-end queries the [OpenSky API](https://opensky-network.org/) to get the location and other information regarding the planes.

The map itself comes from [MapBox](https://www.mapbox.com/).

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

The project should be running at this address [http://localhost:3000/](http://localhost:3000/).

GraphiQL is available [here](http://localhost:3000/graphql?query=query%20myQuery(%24requestId%3A%20String!%2C%20%24latitudeMin%3A%20Float!%2C%20%24latitudeMax%3A%20Float!%2C%20%24longitudeMin%3A%20Float!%2C%20%24longitudeMax%3A%20Float!)%20%7B%0A%20%20getPlanesInZone(requestId%3A%20%24requestId%2C%20latitudeMin%3A%20%24latitudeMin%2C%20latitudeMax%3A%20%24latitudeMax%2C%20longitudeMin%3A%20%24longitudeMin%2C%20longitudeMax%3A%20%24longitudeMax)%20%7B%0A%20%20%20%20requestId%0A%20%20%20%20data%20%7B%0A%20%20%20%20%20%20icao24%0A%20%20%20%20%20%20callSign%0A%20%20%20%20%20%20originCountry%0A%20%20%20%20%20%20lastPositionTime%0A%20%20%20%20%20%20latitude%0A%20%20%20%20%20%20longitude%0A%20%20%20%20%20%20angle%0A%20%20%20%20%20%20velocity%0A%20%20%20%20%20%20verticalRate%0A%20%20%20%20%20%20isOnGround%0A%20%20%20%20%20%20altitude%0A%20%20%20%20%7D%0A%20%20%20%20error%20%7B%0A%20%20%20%20%20%20code%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&operationName=myQuery&variables=%7B%0A%20%20%22requestId%22%3A%20%22ewqewqewqewqeqw%22%2C%0A%20%20%22latitudeMin%22%3A%2049.005399%2C%0A%20%20%22latitudeMax%22%3A%2049.424904%2C%0A%20%20%22longitudeMin%22%3A%20-123.43534%2C%0A%20%20%22longitudeMax%22%3A%20-122.575886%0A%7D).
