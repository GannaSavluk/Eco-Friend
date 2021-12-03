import ACTypes from "../types";

const initialState = {
  entries: [],
  currentEntryId: "",
  currentImg: null,
  comments: [],
};

export const entry = (state = initialState, action) => {
  switch (action.type) {
    case ACTypes.ALL_ENTRIES:
      return { ...state, entries: action.payload.entries };

    case ACTypes.ADD_ENTRY:
      state.entries = [action.payload.entry, ...state.entries];
      return { ...state, entries: state.entries, currentImg: null };

    case ACTypes.EDIT_ENTRY:
      state.entries = state.entries.map((post) => {
        if (post?._id === action.payload.id) {
          return {
            ...post,
            likes:
              post.likes.indexOf(action.payload.author) === -1
                ? [...post.likes, action.payload.author]
                : post.likes.filter((el) => el !== action.payload.author),
          };
        }
        return post;
      });
      state.currentEntryId = "";
      return state;

    case ACTypes.LIKE_ENTRY:
      return {
        ...state,
        currentEntryId: action.payload.id,
      };

    case ACTypes.CURRENT_IMG:
      return { ...state, currentImg: action.payload.img };

    case ACTypes.ALL_COMMENTS:
      return { ...state, comments: action.payload.comments };

    default:
      return state;
  }
};
