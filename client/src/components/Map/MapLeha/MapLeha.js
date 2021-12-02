// import React, { useState } from "react";
// import ReactMapGL from "react-map-gl";

// const Map = () => {
//   const [viewport, setViewport] = useState({
//     width: 400,
//     height: 400,
//     latitude: 37.7577,
//     longlatitude: -122.4376,
//     zoom: 8,
//     // width: window.innerWidth,
//     // heigth: window.innerHeight,
//   });

//   return (
//     <ReactMapGL
//       mapboxApiAccessToken={
//         "pk.eyJ1IjoiZ2FubmFzYXYiLCJhIjoiY2t3b2dweWRoMDJvYTJ2cG1samw0bGhhNCJ9.zFlq-4XRaeQQ9NvOn0_gsQ"
//       }
//       {...viewport}
//       onViewportChange={(nextViewport) => setViewport(nextViewport)}
//       ></ReactMapGL>
//   );
// };

// export default Map;

// import * as React from 'react';
import React, { useState } from "react";
import ReactMapGL, {GeolocateControl, Marker, Popup} from "react-map-gl";
import classes from "../Map.module.css";
// import ReactMapGl, { Marker, Popup } from "react-map-gl";
import * as mapData from "../data/skateboard-parks.json";

const geolocateControlStyle= {
  right: 10,
  top: 10
};


const Map = () => {

  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    longitude: -122.45,
    latitude: 37.78,
    zoom: 14
  });

  const [selectedMapPoint, setSelectedMapPoint] = useState(null);

  return (
    <ReactMapGL 
    mapboxApiAccessToken={
              "pk.eyJ1IjoiZ2FubmFzYXYiLCJhIjoiY2t3b2dweWRoMDJvYTJ2cG1samw0bGhhNCJ9.zFlq-4XRaeQQ9NvOn0_gsQ"
            }
    {...viewport} width="100vw" height="100vh" onViewportChange={setViewport}>
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true}
        auto
      />
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
    </ReactMapGL>
  );
}

export default Map;
