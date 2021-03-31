const openSky = require('../open-sky');

module.exports = {
  Query: {
    getPlanesInZone: async (_, { requestId, latitudeMin, latitudeMax, longitudeMin, longitudeMax }, {}) => {
      const result = await openSky.getPlanesAroundZone(latitudeMin, latitudeMax, longitudeMin, longitudeMax);
      return {
        requestId,
        data: result.data,
        error: result.error,
      };
    },
  },
};
