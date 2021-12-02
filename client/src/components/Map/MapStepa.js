import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useSupercluster from "use-supercluster";
import classes from "./Map.module.css";
import ReactMapGl, {
  Marker,
  Popup,
  FlyToInterpolator,
  GeolocateControl,
} from "react-map-gl";

const geolocateControlStyle = {
  right: 10,
  top: 10,
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

  const mapRef = useRef();

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
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
        />
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
                  src="http://s1.iconbird.com/ico/2013/9/452/w448h5121380477116trash.png"
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
      </ReactMapGl>
    </div>
  );
};

export default MapStepa;
