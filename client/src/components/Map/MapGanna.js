import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Map.module.css";
import ReactMapGl, { Marker, Popup } from "react-map-gl";

const MapGanna = () => {
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

  const getRightCategoryIcon = (category) => {
    console.log({category})
    if (category === "plastic") return "/img/categories/bottle.png";
    if (category === "paper") return "/img/categories/paper.png";
    if (category === "electronics") return "/img/categories/electronics.png";
    if (category === "event") return "/img/categories/event.png";
    if (!category) return "/img/categories/unknown.png";
  };

  return (
    <div className="Map">
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
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
                src={getRightCategoryIcon(mark.category)}
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
            <img
              src={selectedMapPoint?.imgs[0]}
              alt="item"
              width={100}
              height={100}
            />
            <p>{selectedMapPoint?.adress}</p>
          </Popup>
        )}
      </ReactMapGl>
    </div>
  );
};

export default MapGanna;
