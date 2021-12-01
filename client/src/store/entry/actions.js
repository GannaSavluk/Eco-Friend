import ACTypes from "../types";

export const getAllEntries = (entries) => ({
  type: ACTypes.ALL_ENTRIES,
  payload: { entries },
});

//CRUD
export const createEntry = (entry) => ({
  type: ACTypes.ADD_ENTRY,
  payload: { entry },
});
// export const deleteNote = (id) => ({ type: ACTypes.DELETE_ENTRY, payload: { id } })
export const editEntry = (id, author) => ({
  type: ACTypes.EDIT_ENTRY,
  payload: { id, author },
});

export const getAllEntriesThunk = () => async (dispatch) => {
  const response = await fetch("/entry", {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  const entries = await response.json();
  console.log("entries--->", entries);

  if (entries) dispatch(getAllEntries(entries));
};

export const createEntryThunk = (values) => async (dispatch) => {
  const response = await fetch("/entry/new", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ values }),
  });
  const entry = await response.json();

  dispatch(createEntry(entry));
};

export const likeEntryThunk = (id, author) => async (dispatch) => {
  const response = await fetch(`/entry/${id}/like`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
  });
  const entry = await response.json();

  dispatch(editEntry(id, author));
};

// export const deleteNoteThunk = (id) => async (dispatch) => {
//     try {
//         const response = await fetch(`/note/${id}`, {
//             method: 'delete',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ id })
//         })
//         const status = await response.json();

//         if (status) dispatch(deleteNote(id))
//     } catch (err) {
//         console.log('err', err);
//     }
// }

// export const editNoteFetch = (values, id) => async (dispatch) => {

//     await fetch(`/note/${id}`, {
//         method: 'put',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(values),
//     })

//     dispatch(isOpenEditNoteComponent(true))
//     dispatch(editNote(id, values.note))

// };
