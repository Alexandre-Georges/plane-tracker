let store = {
  location: {
    latitudeMin: null,
    latitudeMax: null,
    longitudeMin: null,
    longitudeMax: null,
  },
  planes: [],
};

const updateLocation = (latitudeMin, latitudeMax, longitudeMin, longitudeMax) => {
  store = Object.assign({}, store, { location: { latitudeMin, latitudeMax, longitudeMin, longitudeMax } });
};

const updatePlanes = (planes) => {
  store = Object.assign({}, store, { planes });
};

const getLocation = () => store.location;
const getPlanes = () => store.planes;

export default {
  updateLocation,
  updatePlanes,
  getLocation,
  getPlanes,
};
