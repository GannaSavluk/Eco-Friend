import ACTypes from "../types";

const initialState = {
  user: null,
  currentImg: null,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case ACTypes.AUTH:
      return { ...state, user: { id: action.payload.id } };

    case ACTypes.USER_ROLE:
      return {
        ...state,
        user: {
          id: action.payload.id,
          name: action.payload.name,
          role: action.payload.role,
          rating: action.payload.rating,
          img: action.payload.img,
        },
      };

    case ACTypes.AUTH_LOGOUT:
      return { ...state, user: null };

    case ACTypes.CURRENT_IMG_USER:
      return { ...state, currentImg: action.payload.img };

    case ACTypes.CURRENT_IMG_CLEAR:
      return { ...state, currentImg: null };

    case ACTypes.SET_IMG:
      return { ...state, user: { ...state.user, img: action.payload.img } };

    default:
      return state;
  }
};
