import * as React from 'react';
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import './App.css';


mapboxgl.accessToken ='pk.eyJ1IjoibmVlbW9kYWIiLCJhIjoiY2w2MGpqNDVlMWtlMzNscnRzamk4MmJ6diJ9.I_R2v2UXU5W1-25uPNwePQ'




function App() {
  return (
    <div className="App">
        <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
    </div>
  );
}

export default App;
