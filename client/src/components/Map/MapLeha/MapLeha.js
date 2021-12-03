

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "../Map.module.css";
import ReactMapGL, {
  GeolocateControl,
  Layer,
  Marker,
  NavigationControl,
  Popup,
  Source,
} from "react-map-gl";
import { pointAC } from "../../../store/map/actions";


const geolocateControlStyle = {
  right: 10,
  top: 10,
};
const navControlStyle = {
  right: 10,
  top: 10,
};

const geojson = {
  type: 'FeatureCollection',
  features: [
    {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
  ]
};

const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 10,
    'circle-color': '#007cbf'
  }
};


const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 55.7702, //!!
    longitude: 37.5533, //!!
    width: "100vw",
    height: "100vh",
    zoom: 8,
  });

  
  const coords = useSelector((store) => store.map.point);
  console.log("123", coords);
  const dispatch = useDispatch();
  const pointHandler = (target) => {
    dispatch(pointAC(target.lngLat));
  };
  
  
  return (
    <ReactMapGL
      onClick={pointHandler}
      mapboxApiAccessToken={
        "pk.eyJ1IjoiZ2FubmFzYXYiLCJhIjoiY2t3b2dweWRoMDJvYTJ2cG1samw0bGhhNCJ9.zFlq-4XRaeQQ9NvOn0_gsQ"
      }
      {...viewport}
      width="100vw"
      height="100vh"
      onViewportChange={setViewport}
      captureDoubleClick={false}
    >
      <NavigationControl style={navControlStyle} />
      <GeolocateControl
        style={geolocateControlStyle}
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        auto={false}
        
      />
      {coords.map((item) => (
      <Marker
        latitude={item[1]}
        longitude={item[0]}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <div>
          <img
            alt="photo"
            src="https://icon-library.com/images/map-pinpoint-icon/map-pinpoint-icon-14.jpg"
            width={50}
            height={50}
          />
        </div>
      </Marker>
      ))}
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>



      
    </ReactMapGL>
  );
};

export default Map;
