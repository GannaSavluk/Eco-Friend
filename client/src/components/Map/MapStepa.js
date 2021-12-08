import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { createMarkerAndFetchMapThunk } from "../../store/map/actions";
import useSupercluster from "use-supercluster";
import classes from "./Map.module.css";
import ReactMapGl, {
  Marker,
  Popup,
  FlyToInterpolator,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

const geolocateControlStyle = {
  right: 10,
  top: 10,
};
const getRightCategoryIcon = (category) => {
  console.log('category--',category );
  if (category === "plastic") return "/img/categories/bottle.png";
  if (category === "paper") return "/img/categories/paper.png";
  if (category === "electronics") return "/img/categories/electronics.png";
  if (category === "event") return "/img/categories/event.png";
  if (!category) return "/img/categories/unknown.png";
};

const MapStepa = () => {
  const [viewport, setViewport] = useState({
    latitude: 45.4211, //!!
    longitude: -75.6903, //!!
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });
  const [selectedMapPoint, setSelectedMapPoint] = useState(null);

  const user = useSelector((store) => store.auth.user);

  const [newMarker, setNewMarker] = useState(null);

  const dispatch = useDispatch();

  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const mapRef = useRef();
  const geoRef = useRef();
  const categoryRef = useRef();
  const descRef = useRef();

  const mapData = useSelector((store) => store?.map?.map);

  console.log("mapData---->", mapData);

  const points = mapData.map((point) => ({
    type: "Feature",
    properties: {
      cluster: false,
      pointId: point._id,
      category: point.category,
      imgs: point.imgs,
      adress: point.adress,
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(point.coordinates[0]),
        parseFloat(point.coordinates[1]),
      ],
    },
  }));

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  const handleGeocoderResult = async (e) => {
    console.log(e.result);
    await setNewMarker([
      ...e.result.center,
      e.result.place_name,
      e.result.properties.address,
    ]);
  };

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

  function onSaveMarker() {
    console.log(user, newMarker);
    const marker = {
      category: categoryRef.current.value,
      description: descRef.current.value,
      author: user.id, // take author from session
      coordinates: [newMarker[0], newMarker[1]],
      adress: newMarker[3],
    };
    console.log(marker);
    dispatch(createMarkerAndFetchMapThunk(marker));
    setNewMarker(null);
  }

  return (
    <div className="Map">
      <ReactMapGl
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={process.env.REACT_APP_MAPBOX_STYLE}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
        ref={mapRef}
      >
        <Geocoder
          className={classes.geocoder}
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          onResult={handleGeocoderResult}
          mapboxApiAccessToken={
            "pk.eyJ1IjoiZ2FubmFzYXYiLCJhIjoiY2t3b2dweWRoMDJvYTJ2cG1samw0bGhhNCJ9.zFlq-4XRaeQQ9NvOn0_gsQ"
          }
          position="top-left"
          ref={geoRef}
        />
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          //auto
        />
        <NavigationControl className={classes.navigation} showCompass={false} />
        {clusters.map((cluster) => {
          // every cluster point has coordinates
          const [longitude, latitude] = cluster.geometry.coordinates;
          // the point may be either a cluster or a crime point
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          // we have a cluster to render
          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  className={classes.cluster}
                  style={{
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );

                    setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 2,
                      }),
                      transitionDuration: "auto",
                    });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }
          return (
            <Marker
              key={`point-${cluster.properties.pointId}`}
              latitude={latitude}
              longitude={longitude}
            >
              <button
                className={classes.markerbt}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedMapPoint(cluster);
                }}
              >
                <img
                  className={classes.imgs}
                  src={getRightCategoryIcon(cluster.properties.category)}
                  alt="icon"
                />
              </button>
            </Marker>
          );
        })}

        {selectedMapPoint && (
          <Popup
            latitude={selectedMapPoint?.geometry.coordinates[1]}
            longitude={selectedMapPoint?.geometry.coordinates[0]}
            onClose={() => {
              setSelectedMapPoint(null);
            }}
          >
            <h2>{selectedMapPoint?.properties.category}</h2>
            <img
              src={selectedMapPoint?.properties.imgs[0]}
              alt="photo"
              width={100}
              height={100}
            />
            <p>{selectedMapPoint?.properties.adress}</p>
          </Popup>
        )}
        {newMarker && (
          <Popup
            latitude={newMarker[1]}
            longitude={newMarker[0]}
            onClose={() => {
              setNewMarker(null);
            }}
          >
            <h2>{newMarker[2]}</h2>
            <form>
              <input type="text" placeholder="category" ref={categoryRef} />
              <input type="text" placeholder="description" ref={descRef} />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onSaveMarker();
                }}
              >
                Save
              </button>
            </form>
          </Popup>
        )}
      </ReactMapGl>
    </div>
  );
};

export default MapStepa;
