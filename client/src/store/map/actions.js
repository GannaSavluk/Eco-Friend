import ACTypes from "../types";

export const getMap = (map) => ({
  type: ACTypes.MAP,
  payload: { map },
});

export const mapFetchThunk = () => async (dispatch) => {
  
  const response = await fetch("/map", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  const map = await response.json();
  // console.log("mapFetchThunk map---->", map);
  dispatch(getMap(map));

};

export const createMarkerAndFetchMapThunk = (marker) => async (dispatch) => {
  await fetch("/map", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(marker),
  });

  const res = await fetch("/map", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });

  const map = await res.json();

  dispatch(getMap(map));
};
