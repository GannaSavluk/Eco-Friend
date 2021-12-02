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
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "../Map.module.css";
import ReactMapGL, {GeolocateControl, Marker, Popup} from "react-map-gl";
// import ReactMapGl, { Marker, Popup } from "react-map-gl";
// import * as mapData from "../data/skateboard-parks.json";

const geolocateControlStyle= {
  right: 10,
  top: 10
};


const Map = () => {

  const [viewport, setViewport] = useState({
    latitude: 45.4211, //!!
    longitude: -75.6903, //!!
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });

  const [selectedMapPoint, setSelectedMapPoint] = useState(null);

  const mapData = useSelector((store) => store?.map?.map);

  console.log("mapData---->", mapData);

  useEffect(() => {

    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedMapPoint(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

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
      {mapData?.map((mark) => (
          <Marker
            key={mark?._id}
            latitude={mark.coordinates[1]}
            longitude={mark.coordinates[0]}
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
                alt="icon"
              />
            </button>
            <p>{mark?.category}</p>
          </Marker>
        ))}

        {selectedMapPoint && (
          <Popup
            latitude={selectedMapPoint?.coordinates[1]}
            longitude={selectedMapPoint?.coordinates[0]}
            onClose={() => {
              setSelectedMapPoint(null);
            }}
          >
            <h2>{selectedMapPoint?.category}</h2>
            <img src={selectedMapPoint?.imgs[0]} width={100} height={100} alt="photo"/>
            <p>{selectedMapPoint?.adress}</p>
          </Popup>
        )}
    </ReactMapGL>
  );
}

export default Map;
