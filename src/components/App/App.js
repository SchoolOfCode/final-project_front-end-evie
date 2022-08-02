import  React, { useRef, useEffect, useState } from 'react';
import './App.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
//import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
// import data from '../../libs/data';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import Fetch from './Fetch/Fetch'


mapboxgl.accessToken=process.env.REACT_APP_API_KEY;

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-1.898575);
  const [lat, setLat] = useState(52.489471);
  const [zoom, setZoom] = useState(13);
  
  //'mapbox://styles/neemodab/cl6274408001x15pbdsyuyn84'
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
container: mapContainer.current,
style: 'mapbox://styles/neemodab/cl6274408001x15pbdsyuyn84',
center: [lng, lat],
zoom: zoom
}
);

//Drop down directions
map.current.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken
  }),
  'top-right'
  );

// Add geolocate control to the map.
map.current.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
      })
      );
      async function Fetch() {
        const response = await fetch('https://api.openchargemap.io/v3/poi?maxresults=500&distance=200&includecomments=true&verbose=false&compact=true&boundingbox=(53.38997%2C%20-2.91819)%2C%20(51.36836%2C%20-0.16149)&key=267df5b8-6a34-4295-970a-3072b912f363');
        // waits until the request completes...
        const data = await response.json();
        console.log(`${data[0]}from line 56`);
        console.log(data[0].AddressInfo.Title)
        //popup and markers
            data.forEach((location) => {
              console.log(`${location.AddressInfo.Title}line 60`)
              console.log([location.AddressInfo.Longitude,location.AddressInfo.Latitude])
              // eslint-disable-next-line
              var marker = new mapboxgl.Marker()
                      .setLngLat([location.AddressInfo.Longitude,location.AddressInfo.Latitude])
                      .setPopup(new mapboxgl.Popup({ offset: 30 })
                      .setHTML('<h4>' + location.AddressInfo.Title + '<h4>' + location.AddressInfo.AddressLine1 + '<h4>' + location.AddressInfo.Town + '<h4>' + location.AddressInfo.Postcode))
                      .addTo(map.current);
        
            })
        return data;
      }
      Fetch()
});
		

//Store new coordinates that you get when a user interacts with the map
useEffect(() => {
if (!map.current) return; // wait for map to initialize
map.current.on('move', () => {
setLng(map.current.getCenter().lng.toFixed(4));
setLat(map.current.getCenter().lat.toFixed(4));
setZoom(map.current.getZoom().toFixed(2));
});
});

  return (
    <>
  <div>
    <div className="sidebar">
      Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
    </div>
    <div ref={mapContainer} className="map-container" />
  </div>
  <div>
  </div>
  {/* <Fetch/> */}
</>
  );
}

export default App;
