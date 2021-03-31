const axios = require('axios');

const getPlanesAroundZone = async (latitudeMin, latitudeMax, longitudeMin, longitudeMax) => {
  try {
    const response = await axios.get(`https://opensky-network.org/api/states/all?lamin=${latitudeMin}&lamax=${latitudeMax}&lomin=${longitudeMin}&lomax=${longitudeMax}`);
    const planes = [];
    if (response.data.states) {
      for (const plane of response.data.states) {
        planes.push({
          icao24: plane[0],
          callSign: plane[1].trim(),
          originCountry: plane[2],
          lastPositionTime: plane[3],
          longitude: plane[5],
          latitude: plane[6],
          angle: plane[10],
          velocity: plane[9],
          verticalRate: plane[11],
          isOnGround: plane[8],
          altitude: plane[7],
        });
      }
    }
    return {
      data: planes,
    };
  } catch (exception) {
    console.error('exception', exception);
    return {
      error: {
        code: 'OPEN_SKY_API_ERROR',
      },
    };
  }
};

module.exports = {
  getPlanesAroundZone,
};
