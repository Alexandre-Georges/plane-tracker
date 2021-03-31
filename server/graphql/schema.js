module.exports = `
  type Error {
    code: String!
  }
  interface Response {
    requestId: String!
    error: Error
  }
  type PlaneData {
    icao24: String!
    callSign: String
    originCountry: String!
    lastPositionTime: Int
    latitude: Float
    longitude: Float
    angle: Float
    velocity: Float
    verticalRate: Float
    isOnGround: Boolean
    altitude: Float
  }
  type GetPlanesInZoneResponse implements Response {
    requestId: String!
    error: Error
    data: [PlaneData]
  }
  type Query {
    getPlanesInZone(requestId: String!, latitudeMin: Float, latitudeMax: Float, longitudeMin: Float, longitudeMax: Float): GetPlanesInZoneResponse
  }
  schema {
    query: Query
  }
`;

/*
query myQuery($requestId: String!, $latitudeMin: Float!, $latitudeMax: Float!, $longitudeMin: Float!, $longitudeMax: Float!) {
  getPlanesInZone(requestId: $requestId, latitudeMin: $latitudeMin, latitudeMax: $latitudeMax, longitudeMin: $longitudeMin, longitudeMax: $longitudeMax) {
    requestId
    planes {
      icao24
      callSign
      originCountry
      lastPositionTime
      latitude
      longitude
    }
  }
}
{
  "requestId": "ewqewqewqewqeqw",
  "latitudeMin": 49.005399,
  "latitudeMax": 49.424904,
  "longitudeMin": -123.43534,
  "longitudeMax": -122.575886
}
*/
