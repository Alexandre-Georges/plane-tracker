import { DateTime } from 'luxon';

import './styling.css';
import messages from './messages';
import handler from './handler';
import store from './store';
import planeSvg from './plane.svg';

const updateSubscription = (map) => {
  updateBounds(map);
  setSubscription();
};

const updateBounds = (map) => {
  const bounds = map.getBounds();
  store.updateLocation(bounds.getSouth(), bounds.getNorth(), bounds.getWest(), bounds.getEast());
};

const setMarkerPopup = (marker, plane) => {
  marker.setPopup(new mapboxgl.Popup().setHTML(`
  <h1>${plane.icao24} - ${plane.callSign}</h1>
  <ul>
    <li>Country of origin: ${plane.originCountry}</li>
    <li>Last position time: ${DateTime.fromSeconds(plane.lastPositionTime).toFormat('dd \'of\' LLLL yyyy - HH:mm:ss')}</li>
    <li>Velocity (m/s): ${plane.velocity}</li>
    <li>Vertical rate (m/s): ${plane.verticalRate}</li>
    <li>Is on the ground: ${plane.isOnGround}</li>
    <li>Altitude (m): ${plane.altitude}</li>
  </ul>`));
};

const addMarker = (map, plane) => {
  const domIconElement = document.createElement('div');
  domIconElement.style.width = '30px';
  domIconElement.style.height = '30px';
  domIconElement.innerHTML = planeSvg;

  const marker = new mapboxgl.Marker({ element: domIconElement, rotation: plane.angle });
  marker.setLngLat([plane.longitude, plane.latitude]);
  setMarkerPopup(marker, plane);
  marker.addTo(map);

  return marker;
};

const renderMarkers = (map, markers) => {
  const newMarkers = {};

  const planes = store.getPlanes();
  const existingIcao24 = {};
  for (const key of Object.keys(markers)) {
    existingIcao24[key] = true;
  }

  for (const plane of planes) {
    const existingMarker = markers[plane.icao24];
    if (existingMarker) {
      const position = existingMarker.getLngLat();
      if (position.lat !== plane.latitude || position.lng !== plane.longitude) {
        existingMarker.setLngLat([plane.longitude, plane.latitude]);
        const isPopupOpen = existingMarker.getPopup().isOpen();
        setMarkerPopup(existingMarker, plane);
        if (isPopupOpen) {
          existingMarker.togglePopup();
        }
      }
      delete existingIcao24[plane.icao24];
      newMarkers[plane.icao24] = existingMarker;
    } else {
      newMarkers[plane.icao24] = addMarker(map, plane);
    }
  }

  for (const outOfRangeIcao24 of Object.keys(existingIcao24)) {
    markers[outOfRangeIcao24].remove();
  }
  return newMarkers;
};

const setSubscription = () => {
  const location = store.getLocation();
  handler.sendRequest(messages.getPlanesInZone(location.latitudeMin, location.latitudeMax, location.longitudeMin, location.longitudeMax), (message, error) => {
    if (error) {
      console.error('error', error);
      return;
    }
    store.updatePlanes(message);
    markers = renderMarkers(map, markers);
  });
};

const mapMoved = (map) => {
  updateSubscription(map);
  hasMoved = true;
};

mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleC1nZW8iLCJhIjoiY2ttdjZjYWg2MDI1MTJ2cGZjdnQ2ODZ6MyJ9.dYUMmgE_S2i1qgI3DzHVhQ';

let markers = {};
let hasMoved = false;

const originalLocation = {
  latitude: 49.261226,
  longitude: -123.113927,
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      if (!hasMoved) {
        map.setCenter([ position.coords.longitude, position.coords.latitude ]);
        updateSubscription(map);
      }
    },
    (error) => {
      console.error(error);
    },
  );
}

const map = new mapboxgl.Map({
  center: new mapboxgl.LngLat(originalLocation.longitude, originalLocation.latitude),
  container: 'map',
  dragRotate: false,
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 10,
});

map.on('resize', () => mapMoved(map));
map.on('zoomend', () => mapMoved(map));
map.on('dragend', () => mapMoved(map));

updateBounds(map);

handler.setGeneralErrorCallback((error) => {
  console.error('General error', error);
});

handler.executeWhenReady(setSubscription);
