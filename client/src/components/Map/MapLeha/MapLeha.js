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

import * as React from 'react';
import ReactMapGL, {GeolocateControl} from "react-map-gl";

const geolocateControlStyle= {
  right: 10,
  top: 10
};

const Map = () => {
  const [viewport, setViewport] = React.useState({
    width: 400,
    height: 400,
    longitude: -122.45,
    latitude: 37.78,
    zoom: 14
  });
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
    </ReactMapGL>
  );
}

export default Map;
