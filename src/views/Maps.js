import React from "react";

// react-bootstrap components
import { Badge, Button, Navbar, Nav, Container } from "react-bootstrap";

function Maps() {
  const mapRef = React.useRef(null);
  React.useEffect(() => {

    // fusion chart code

  //   FusionCharts.ready(function() {
  //     var populationMap = new FusionCharts({
  //         type: 'maps/world',
  //         renderAt: 'chart-container',
  //         width: '800',
  //         height: '550',
  //         dataFormat: 'json',
  //         dataSource: {
  //             "chart": {
  //                 "caption": "Global Population",
  //                 "theme": "fusion",
  //                 "formatNumberScale": "0",
  //                 "numberSuffix": "M"
  //             },
  //             "colorrange": {
  //                 "color": [{
  //                     "minvalue": "0",
  //                     "maxvalue": "100",
  //                     "code": "#D0DFA3",
  //                     "displayValue": "< 100M"
  //                 }, {
  //                     "minvalue": "100",
  //                     "maxvalue": "500",
  //                     "code": "#B0BF92",
  //                     "displayValue": "100-500M"
  //                 }, {
  //                     "minvalue": "500",
  //                     "maxvalue": "1000",
  //                     "code": "#91AF64",
  //                     "displayValue": "500M-1B"
  //                 }, {
  //                     "minvalue": "1000",
  //                     "maxvalue": "5000",
  //                     "code": "#A9FF8D",
  //                     "displayValue": "> 1B"
  //                 }]
  //             },
  //             "data": [{
  //                 "id": "NA",
  //                 "value": "515"
  //             }, {
  //                 "id": "SA",
  //                 "value": "373"
  //             }, {
  //                 "id": "AS",
  //                 "value": "3875"
  //             }, {
  //                 "id": "EU",
  //                 "value": "727"
  //             }, {
  //                 "id": "AF",
  //                 "value": "885"
  //             }, {
  //                 "id": "AU",
  //                 "value": "32"
  //             }]
  //         }
  //     });
  //     populationMap.render();
  // });
    
    // let google = window.google;
    // let map = mapRef.current;
    // let lat = "40.748817";
    // let lng = "-73.985428";
    // const myLatlng = new google.maps.LatLng(lat, lng);
    // const mapOptions = {
    //   zoom: 13,
    //   center: myLatlng,
    //   scrollwheel: false,
    //   zoomControl: true,
    // };

    // map = new google.maps.Map(map, mapOptions);

    // const marker = new google.maps.Marker({
    //   position: myLatlng,
    //   map: map,
    //   animation: google.maps.Animation.DROP,
    //   title: "Light Bootstrap Dashboard PRO React!",
    // });

    // const contentString =
    //   '<div class="info-window-content"><h2>Light Bootstrap Dashboard PRO React</h2>' +
    //   "<p>A premium Admin for React-Bootstrap, Bootstrap, React, and React Hooks.</p></div>";

    // const infowindow = new google.maps.InfoWindow({
    //   content: contentString,
    // });

    // google.maps.event.addListener(marker, "click", function () {
    //   infowindow.open(map, marker);
    // });
  }, []);
  return (
    <>
      {/* <div className="map-container">
        <div id="map" ref={mapRef}></div>
      </div> */}
    </>
  );
}

export default Maps;
