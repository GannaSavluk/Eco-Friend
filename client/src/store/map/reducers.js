import ACTypes from "../types";

const initialState = {
  map: [],
};

export const map = (state = initialState, action) => {
  switch (action.type) {
    case ACTypes.MAP:
      return { ...state, map: action.payload.map };

    default:
      return state;
  }
};
