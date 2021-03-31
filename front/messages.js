import uuid from '../common/uuid';

const getPlanesInZone = (latitudeMin, latitudeMax, longitudeMin, longitudeMax) => {
  const request = `
query myQuery($requestId: String!, $latitudeMin: Float!, $latitudeMax: Float!, $longitudeMin: Float!, $longitudeMax: Float!) {
  getPlanesInZone(requestId: $requestId, latitudeMin: $latitudeMin, latitudeMax: $latitudeMax, longitudeMin: $longitudeMin, longitudeMax: $longitudeMax) {
    requestId
    data {
      icao24
      callSign
      originCountry
      lastPositionTime
      latitude
      longitude
      angle
      velocity
      verticalRate
      isOnGround
      altitude
    }
    error {
      code
    }
  }
}`;
  const variables = {
    requestId: uuid(),
    latitudeMin,
    latitudeMax,
    longitudeMin,
    longitudeMax,
  };

  return {
    request,
    variables,
  };
};

export default {
  getPlanesInZone,
};
