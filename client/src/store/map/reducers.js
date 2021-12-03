import ACTypes from "../types";

const initialState = {
  map: [],
  point: [],// позиция по клику
};

export const map = (state = initialState, action) => {
  switch (action.type) {
    case ACTypes.MAP:
      return { ...state, map: action.payload.map };

    case ACTypes.POINT:
      return { ...state, point: action.payload.point }; // позиция по клику

    default:
      return state;
  }
};
