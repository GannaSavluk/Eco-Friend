import ACTypes from "../types";

export const getMap = (map) => ({
  type: ACTypes.MAP,
  payload: { map },
});

export const pointAC = (point) => ({type: ACTypes.POINT, payload: {point}})// позиция по клику

export const mapFetchThunk = () => async (dispatch) => {

    const response = await fetch("/map", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    });
    const map = await response.json();
    // console.log("mapFetchThunk map---->", map);
    dispatch(getMap(map));

  };
