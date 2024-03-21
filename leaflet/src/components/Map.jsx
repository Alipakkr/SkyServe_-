import React from "react";
import { MapContainer, Marker,  TileLayer, GeoJSON } from "react-leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import icon from "./image/pointer.png";
import L from "leaflet";
import { useState } from "react";
import mapPolygon from "./data/polygon.json";
// import { useEffect } from "react";
import Button from "@mui/material/Button";
const Map = () => {
  // if use false so in the ui shift to all map in pre showing  if true if showing on starting 
  const [activeArea, setActiveArea] = useState(true);
  // const [activeArea, setActiveArea] = [true, true]
  // const [activeArea, setActiveArea] = useState(false);
  // const [clickedPosition, setClickedPosition] = useState(null);
  const position = [78.43815565109253, 17.351887730888155];
  const position2 = [29.953053679630752, 76.88996763526167];
  console.log(mapPolygon);
  const placeStyle = {
    fillColor: "orange",
    color: "green",
  };
  const markerIcon = new L.icon({
    iconUrl: icon,
    iconSize: [35, 45],
    iconAnchor: [17, 45],
  });
  const interactionOption = {
    zoomControl: true,
    doubleClickZoom: true,
    dragging: true,
    zoomSnap: true,
    zoomDelta: true,
    trackResize: true,
    touchZoom: true,
    scrollWheelZoom: true,
  };
  // const handleMapClick = (event) => {
  //   setClickedPosition(event.latlng); // Update clicked position
  // };
  return (
    <div className="main-div">
      <div className="default-map">
        <MapContainer
          className="map-container"
          center={position}
          zoom={3}
          scrollWheelZoom={true}
          // onClick={handleMapClick} 
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=iTsPaDR57nskqMELIEgC"
          />
          {activeArea &&   (
            <div>
              {/* <Marker position={position} icon={markerIcon}></Marker> */}
              <Marker position={position2} icon={markerIcon}></Marker>
              <GeoJSON style={placeStyle} data={mapPolygon.features} />
            </div>
          )}
        </MapContainer>
      </div>
      <div className="image-div">
        <div style={{ marginBottom: "10px" }}>
          <Button
            onClick={() => {
              setActiveArea(!activeArea);
            }}
            variant="contained"
          >
            {activeArea === false ? "See Desired Area" : "Default Map"}
          </Button>
        </div>
        {activeArea ? (
          <div className="photo">
            <MapContainer
              className="map-photo"
              center={position}
              zoom={14}
              scrollWheelZoom={true}
              {...interactionOption}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=iTsPaDR57nskqMELIEgC"
              />
              {activeArea && (
                <div>
                  {/* <Marker position={position} icon={markerIcon}></Marker> */}
                  <Marker position={position2} icon={markerIcon}></Marker>
                </div>
              )}
              { <GeoJSON style={placeStyle} data={mapPolygon.features} /> }
            </MapContainer>
          </div>
        ) : (
          <h2>Select Area to See</h2>
        )}
      </div>
    </div>
  );
};

export default Map;
