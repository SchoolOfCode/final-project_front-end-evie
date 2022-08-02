import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
//import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import data from '../../libs/data';



mapboxgl.accessToken=process.env.REACT_APP_API_KEY;



function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-1.898575);
  const [lat, setLat] = useState(52.489471);
  const [zoom, setZoom] = useState(9);
  

  //'mapbox://styles/neemodab/cl6274408001x15pbdsyuyn84'
useEffect(() => {
if (map.current) return; // initialize map only once
map.current = new mapboxgl.Map({
container: mapContainer.current,
style: 'mapbox://styles/neemodab/cl6274408001x15pbdsyuyn84',
center: [lng, lat],
zoom: zoom
});
map.current.addControl(
        new MapboxDirections({
          accessToken: mapboxgl.accessToken,
          controls: {profileSwitcher:false},
          control:{instruction:true}
        }),
        'top-left'
      );

      data.forEach((location) => {
        console.log(location)
        // eslint-disable-next-line
        var marker = new mapboxgl.Marker()
                .setLngLat(location.coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 30 })
                .setHTML('<h4>' + location.name + '</h4>' + location.location + '<h4>' + location.city + '<h4>' + location.status))
                .addTo(map.current);
  
      })
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


//toggle button on turn by turn navigation  
useEffect(()=>{
let routesummaryelement = document.getElementsByClassName('mapbox-directions-route-summary')[0]
if(routesummaryelement){
let button = routesummaryelement.querySelector('.instruction-btn')
//console.log("hello line 71 in creating a button")
if(button === null){
const btn = document.createElement("button");
btn.className = "instruction-btn";
btn.addEventListener("click", toggledirections);
btn.innerHTML = "hide directions";
routesummaryelement.appendChild(btn);
}
}})


const toggledirections = (evt) => {
  //console.log("hello")
  let elements = document.getElementsByClassName('mapbox-directions-instructions')
  if (elements[0]){
    if (elements[0].style.display === "none") {
      evt.target.innerHTML="hide directions"
    elements[0].style.display = "block";
  } else {
    elements[0].style.display = "none";
    evt.target.innerHTML="show directions"
  }
  //console.log(elements[0])
}


}



  

  return (
    <>
  <div>
   
    <div className="sidebar">
      {/*Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}*/}
    </div>
    <div ref={mapContainer} className="map-container" />
  </div>
  <div>

  </div>
  </>

  );
}

export default App;
