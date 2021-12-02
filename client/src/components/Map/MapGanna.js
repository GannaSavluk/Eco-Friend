import React, { useState } from "react";
import classes from "./Map.module.css";
import ReactMapGl, { Marker, Popup } from "react-map-gl";
import * as mapData from "./data/skateboard-parks.json";

const MapGanna = () => {
  // TODO подставить координаты нахождения юзера
  const [viewport, setViewport] = useState({
    latitude: 45.4211, //!!
    longitude: -75.6903, //!!
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });
  const [selectedMapPoint, setSelectedMapPoint] = useState(null);

  return (
    <div className="Map">
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/gannasav/ckwomtvzu27wl14s9rbiu105y"
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {mapData.features.map((mark) => (
          <Marker
            key={mark.prorerties.BIN_ID}
            latitude={mark.geometry.coordinates[1]}
            longitude={mark.geometry.coordinates[0]}
          >
            <button
              className={classes.markerbt}
              onClick={(e) => {
                e.preventDefault();
                setSelectedMapPoint(mark);
              }}
            >
              <img
                className={classes.imgs}
                src="http://s1.iconbird.com/ico/2013/9/452/w448h5121380477116trash.png"
                alt="bin icon"
              />
            </button>
            <h1>{mark.type}</h1>
          </Marker>
        ))}
        {selectedMapPoint && (
          <Popup
          latitude={selectedMapPoint.geometry.coordinates[1]}
          longitude={selectedMapPoint.geometry.coordinates[0]}>
            <h2>{selectedMapPoint.type}</h2>
            <p>{selectedMapPoint.adress}</p>
          </Popup>
        )}
      </ReactMapGl>
    </div>
  );
};

export default MapGanna;
