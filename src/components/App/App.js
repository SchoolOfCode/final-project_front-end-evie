import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
//import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import Mapp from '../Markers/Markers'




mapboxgl.accessToken='pk.eyJ1IjoibmVlbW9kYWIiLCJhIjoiY2w2MGpqNDVlMWtlMzNscnRzamk4MmJ6diJ9.I_R2v2UXU5W1-25uPNwePQ';


function App() {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(-1.898575);
//   const [lat, setLat] = useState(52.489471);
//   const [zoom, setZoom] = useState(9);

// useEffect(() => {
// if (map.current) return; // initialize map only once
// map.current = new mapboxgl.Map({
// container: mapContainer.current,
// style: 'mapbox://styles/mapbox/streets-v11',
// center: [lng, lat],
// zoom: zoom
// });
// map.current.addControl(
//         new MapboxDirections({
//           accessToken: mapboxgl.accessToken
//         }),
//         'top-right'
//       );

// });


// //Store new coordinates that you get when a user interacts with the map
// useEffect(() => {
// if (!map.current) return; // wait for map to initialize
// map.current.on('move', () => {
// setLng(map.current.getCenter().lng.toFixed(4));
// setLat(map.current.getCenter().lat.toFixed(4));
// setZoom(map.current.getZoom().toFixed(2));
// });
// });


  

  return (
    <>
   {/* <div>
    <div className="sidebar">
      Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
    </div>
    <div ref={mapContainer} className="map-container" />
  </div>
  <div>

  </div> */}
  <Mapp />
  </>

  );
}

export default App;
