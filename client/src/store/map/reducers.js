import ACTypes from "../types";

const initialState = {
  map: [],
  point: [], // позиция по клику
  currentImg: null,
  currentPoint: {},
};

export const map = (state = initialState, action) => {
  // console.log("MAP", state.map);
  switch (action.type) {
    case ACTypes.MAP:
      return { ...state, map: action.payload.map };

    case ACTypes.POINT:
      return { ...state, point: action.payload.point }; // позиция по клику

    case ACTypes.CURRENT_IMG_MAP:
      return { ...state, currentImg: action.payload.img };

    case ACTypes.CONFIRM_POINT:
      console.log("1111");
      state.map = state.map.map((point) => {
        console.log("action.payload.point._id", action.payload.point);
        if (point?._id === action.payload.point._id) {
          return {
            ...point,
            confirmed: true,
          };
        }
        return point;
      });
      state.currentPoint = {};
      return state;

    case ACTypes.DELETE_POINT:
      state.map = state.map.filter(
        (el) => el._id !== action.payload.id
      );
      return { ...state, map: state.map };

    default:
      return state;
  }
};
