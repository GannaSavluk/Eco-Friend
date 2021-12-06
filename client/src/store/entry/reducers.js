import ACTypes from "../types";

const initialState = {
  entries: [],
  currentEntryId: "",
  currentImg: null,
  comments: [],
  loadingCommentStatus: true,
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

    case ACTypes.DELETE_ENTRY:
      state.entries = state.entries.filter(
        (el) => el._id !== action.payload.id
      );
      return { ...state, entries: state.entries };

    case ACTypes.LIKE_ENTRY:
      return {
        ...state,
        currentEntryId: action.payload.id,
      };

    case ACTypes.CURRENT_IMG:
      return { ...state, currentImg: action.payload.img };

    case ACTypes.ALL_COMMENTS:
      return { ...state, comments: action.payload.comments };

    case ACTypes.ADD_COMMENT:
      state.comments = [...state.comments, action.payload.comment];
      return { ...state, comments: state.comments };

    case ACTypes.DELETE_COMMENT:
      state.comments = state.comments.filter(
        (el) => el._id !== action.payload.id
      );
      return { ...state, comments: state.comments };

    case ACTypes.LOADING_COMMENTS:
      return { ...state, loadingCommentStatus: action.payload.status };

    default:
      return state;
  }
};
