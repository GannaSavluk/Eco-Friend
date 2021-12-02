import ACTypes from "../types";

const initialState = {
  entries: [],
  // currentNoteId: '',
};

export const entry = (state = initialState, action) => {
  switch (action.type) {
    case ACTypes.ALL_ENTRIES:
      return { ...state, entries: action.payload.entries };

    case ACTypes.ADD_ENTRY:
      console.log("action.payload.newentry", action.payload.entry);
      state.entries = [action.payload.entry, ...state.entries];
      console.log("entr", state.entries);
      return { ...state, entries: state.entries };
    case ACTypes.EDIT_ENTRY:
      state.entries = state.entries.map((post) => {
        if (post?._id === action.payload.id) {
          console.log("action.payload.author", action.payload.author);

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
    // console.log("EDIT_NOTE--->", 2, state.notes);
    // return { ...state, notes: state.notes };
    default:
      return state;
  }
};
