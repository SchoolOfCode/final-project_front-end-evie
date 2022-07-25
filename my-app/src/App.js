import * as React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import './App.css';
import Maps from './components/Map/Maps';


mapboxgl.accessToken=process.env.Key


function App() {





  return (
    <div className="App">
        <Maps/>
    </div>
  );
}

export default App;
