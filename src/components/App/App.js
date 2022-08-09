import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import Basic from "../forms/forms";
// import enhanceWithFormik(memo(FormModal)) from '../forms/formModal.js'
import FormMain from "../forms/FormMain";

mapboxgl.accessToken = process.env.REACT_APP_API_KEY;

function App() {
  const refModal = useRef();
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
      style: "mapbox://styles/neemodab/cl6274408001x15pbdsyuyn84",
      center: [lng, lat],
      zoom: zoom,
    });
    let directions;
    //Drop down directions
    map.current.on("load", function () {
      directions = new MapboxDirections({});
    });

    // Add geolocate control to the map.
    map.current.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        controls: { profileSwitcher: false },
        control: { instruction: true },
      }),
      "top-left"
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
    geolocate.on("geolocate", function (ev) {
      console.log(ev.coords);
      var lon = ev.coords.longitude;
      var lat = ev.coords.latitude;
      var position = [lon, lat];
      directions.setOrigin(position);
    });

    /*handleClick = () => {
      console.log("hello");
      alert("hello");
    };*/

    async function Fetch() {
      const response = await fetch(
        "https://api.openchargemap.io/v3/poi?maxresults=500&distance=200&includecomments=true&verbose=false&compact=true&boundingbox=(53.38997%2C%20-2.91819)%2C%20(51.36836%2C%20-0.16149)&key=267df5b8-6a34-4295-970a-3072b912f363"
      );
      // waits until the request completes...
      const data = await response.json();
      //popup and markers
      data.forEach((location) => {
        // eslint-disable-next-line

        var marker = new mapboxgl.Marker()
          .setLngLat([
            location.AddressInfo.Longitude,
            location.AddressInfo.Latitude,
          ])
          .setPopup(
            new mapboxgl.Popup({ offset: 30 }).setHTML(
              "<h4>" +
                location.AddressInfo.Title +
                "<h4>" +
                location.AddressInfo.AddressLine1 +
                "<h4>" +
                location.AddressInfo.Town +
                "<h4>" +
                location.AddressInfo.Postcode +
                "<h4>" +
                `<button class="btn">review this charger</button>`
            )
          )
          .addTo(map.current);
        //const btn = document.getElementsByClassName("btn")[0];
        //btn.addEventListener("click", handleClick);
      });
      return data;
    }
    Fetch();
  });

  //Store new coordinates that you get when a user interacts with the map
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  //toggle button on turn by turn navigation
  useEffect(() => {
    let routesummaryelement = document.getElementsByClassName(
      "mapbox-directions-route-summary"
    )[0];
    if (routesummaryelement) {
      let button = routesummaryelement.querySelector(".instruction-btn");
      //console.log("hello line 71 in creating a button")
      if (button === null) {
        const btn = document.createElement("button");
        btn.className = "instruction-btn";
        btn.addEventListener("click", toggledirections);
        btn.innerHTML = "hide directions";
        routesummaryelement.appendChild(btn);
      }
    }
  });

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
      <div>
        <div className="sidebar">
          {/*Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}*/}
        </div>
        <div ref={mapContainer} className="map-container" />
      </div>
      <div></div>
      <div id="map">
        <div>
          <img
            id="logoContainer"
            src="../blue-logo.png"
            alt="logo"
            width="70"
          />
        </div>
      </div>
      {/*<Basic/>*/}
      {/* <enhanceWithFormik(memo(FormModal))/> */}
      <div className="modal" ref={refModal} />
      <FormMain refModal={refModal} />
    </>
  );
}

export default App;
