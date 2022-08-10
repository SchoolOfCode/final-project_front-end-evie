import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
// import Feedback from "../Feedback/feedback.js"
import { encode, decode } from "@googlemaps/polyline-codec";

mapboxgl.accessToken = process.env.REACT_APP_API_KEY;

function App() {
  // const refModal = useRef();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-1.898575);
  const [lat, setLat] = useState(52.489471);
  const [zoom, setZoom] = useState(13);

  var random
  //generate random number
  var randomNumber = () => {
    random = Math.floor(Math.random() * 18);
    return random;
  };
  randomNumber();
  
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

// let directions
    //Drop down directions
    // map.current.on('load', function() {
       let directions = new MapboxDirections({
      })
    // });
      
    var result
    directions.on("route", direction => {
        var originCoordsLong = directions.getOrigin().geometry.coordinates[0];
      console.log(originCoordsLong);
        var originCoordsLat = directions.getOrigin().geometry.coordinates[1];
      console.log(originCoordsLat);
        var destinationCoordsLong =  directions.getDestination().geometry.coordinates[0];
      console.log(destinationCoordsLong)
        var destinationCoordsLat = directions.getDestination().geometry.coordinates[1];
      console.log(destinationCoordsLat);
      const path = [
       [originCoordsLat,originCoordsLong],
        [destinationCoordsLat,destinationCoordsLong]
       ];
        console.log(encode(path, 5));
       result = encode(path, 5);
      console.log(result);

      const encoded = "_qs_ItejLzrI{qv@";
console.log(decode(encoded, 5));
    
      // console.log(e);

  // poly line 'https://api.openchargemap.io/v3/poi?polyline=csn_I%7CpqJjsFuxJ&key=267df5b8-6a34-4295-970a-3072b912f363'

      async function Fetchpolyline() {
     
        const res = await fetch(`https://api.openchargemap.io/v3/poi?polyline=${result}&key=267df5b8-6a34-4295-970a-3072b912f363`);
        // waits until the request completes...
        const info = await res.json();
       //popup and markers
   
       info.forEach((location) => {
        // eslint-disable-next-line
        var marker = new mapboxgl.Marker()
        .setLngLat([location.AddressInfo.Longitude,location.AddressInfo.Latitude])
        .setPopup(new mapboxgl.Popup({ offset: 30 })
        .setHTML('<h4>' + location.AddressInfo.Title + '<h4>' + location.AddressInfo.AddressLine1 + '<h4>' + location.AddressInfo.Town + '<h4>' + location.AddressInfo.Postcode))
                .addTo(map.current);
      })
      return info;
      }
      Fetchpolyline()
  
    });
    // Add geolocate control to the map.
      map.current.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        controls: {profileSwitcher:false},
        control:{instruction:true}
      }),
      'top-left'
      );


//toggle button refactor
map.current.on('idle', () => {
  addToggleDirectionButton();
  function addToggleDirectionButton() {
    let routesummaryelement = document.getElementsByClassName('mapbox-directions-route-summary')[0];
    if (routesummaryelement) {
      let button = routesummaryelement.querySelector('.instruction-btn');
      if (button === null) {
        const btn = document.createElement("button");
        btn.className = "instruction-btn";
        btn.addEventListener("click", toggledirections);
        btn.innerHTML = "hide directions";
        routesummaryelement.appendChild(btn);
        console.log('Added directions toggle button');
      }
    }
    return () => {
      // Do some cleanup
     }
  }
}
);

  const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true,
    });

    map.current.addControl(geolocate);
    // Set an event listener that fires
    // when a geolocate event occurs.

    geolocate.on('geolocate', function (ev) {
      var lon = ev.coords.longitude;
      var lat = ev.coords.latitude;
      var position = [lon, lat];

      directions.setOrigin(position)
      
      //coordinates for bounding box
      var topLeftLat = (lat + 0.051);
      var topLeftLon = (lon - 0.079);
      var bottomRightLat = (lat - 0.054);
      var bottomRightLon = (lon + 0.054);
//https://api.openchargemap.io/v3/poi?boundingbox=(${topLeftLat}%2C${topLeftLon})%2C(${bottomRightLat}%2C${bottomRightLon})&key=267df5b8-6a34-4295-970a-3072b912f363
      //https://api.openchargemap.io/v3/poi?boundingbox=(${topLeftLat}%2C${topLeftLon})%2C(${bottomRightLat}%2C${bottomRightLon})&key=267df5b8-6a34-4295-970a-3072b912f363
async function Fetch() {
  
  const response = await fetch(`https://api.openchargemap.io/v3/poi?compact=true&boundingbox=(${topLeftLat}%2C${topLeftLon})%2C(${bottomRightLat}%2C${bottomRightLon})&key=267df5b8-6a34-4295-970a-3072b912f363`);
  // waits until the request completes...
      const data = await response.json();
      //popup and markers
      data.forEach((location) => {
        // eslint-disable-next-line
              var marker = new mapboxgl.Marker()
              .setLngLat([location.AddressInfo.Longitude,location.AddressInfo.Latitude])
                      .setPopup(new mapboxgl.Popup({ offset: 30 })
                      .setHTML('<h4>' + location.AddressInfo.Title + '<h4>' + location.AddressInfo.AddressLine1 + '<h4>' + location.AddressInfo.Town + '<h4>' + location.AddressInfo.Postcode))
                      .addTo(map.current);
                      // console.log(`${location.Connections} line 133`);
                      //  console.log(`${location.Connections[0].ConnectionType.FormalName} line 134`);
                      //  console.log(`${location.Connections[0].ConnectionType.Title} line 135` );

                    })
                    return data;
                  }
                  Fetch()
                });
              });

//Store new coordinates that you get when a user interacts with the map
useEffect(() => {
if (!map.current) return; // wait for map to initialize
map.current.on('move', () => {
setLng(map.current.getCenter().lng.toFixed(4));
setLat(map.current.getCenter().lat.toFixed(4));
setZoom(map.current.getZoom().toFixed(2));
});
return () => {
  // Do some cleanup
 }
});



//toggle button on turn by turn navigation
  const toggledirections = (evt) => {
    //console.log("hello")
    let elements = document.getElementsByClassName(
      "mapbox-directions-instructions"
    );
    if (elements[0]) {
      if (elements[0].style.display === "none") {
        evt.target.innerHTML = "hide directions";
        elements[0].style.display = "block";
      } else {
        elements[0].style.display = "none";
        evt.target.innerHTML = "show directions";
      }
      //console.log(elements[0])
    }
  };

  return (
    <>
    <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">Map</Link> |{" "}
        <Link to="/Feedback">Feedback</Link> 
      </nav>
  <div>
    <div className="sidebar">
      {/*Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}*/}
    </div>
    <div ref={mapContainer} className="map-container" />
  </div>
  <div>
  </div>
   <div id="map" >
    <div>
      <img id="logoContainer" src="../blue-logo.png" alt="logo" width="70" />
    </div>
 </div>
</>
  );
}

export default App;
