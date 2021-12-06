import ACTypes from "../types";

export const getAllEntries = (entries) => ({
  type: ACTypes.ALL_ENTRIES,
  payload: { entries },
});
export const createEntry = (entry) => ({
  type: ACTypes.ADD_ENTRY,
  payload: { entry },
});
export const editEntry = (id, author) => ({
  type: ACTypes.EDIT_ENTRY,
  payload: { id, author },
});
export const likeEntry = (id) => ({
  type: ACTypes.LIKE_ENTRY,
  payload: { id },
});
export const deleteEntry = (id) => ({
  type: ACTypes.DELETE_ENTRY,
  payload: { id },
});
export const saveCurrentImg = (img) => ({
  type: ACTypes.CURRENT_IMG,
  payload: { img },
});
export const getAllComments = (comments) => ({
  type: ACTypes.ALL_COMMENTS,
  payload: { comments },
});
export const createComment = (comment) => ({
  type: ACTypes.ADD_COMMENT,
  payload: { comment },
});
export const isLoadingComments = (status) => ({
  type: ACTypes.LOADING_COMMENTS,
  payload: { status },
});
export const deleteComment = (id) => ({
  type: ACTypes.DELETE_COMMENT,
  payload: { id },
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

export const createEntryThunk = (values, link) => async (dispatch) => {
  const response = await fetch("/entry/new", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ values, link }),
  });
  const entry = await response.json();

  console.log("createEntryThunk entry---->", entry);

  dispatch(createEntry(entry));
};
export const editEntryThunk = (values, link, id) => async (dispatch) => {
  const response = await fetch(`/entry/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ values, link }),
  });
  const entry = await response.json();

  console.log("editEntryThunk entry---->", entry);

  dispatch(editEntry(entry));
};
export const deleteEntryThunk = (id) => async (dispatch) => {
  const response = await fetch(`/entry/delete`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  const result = await response.json();

  console.log("entry deleted", result);

  dispatch(deleteEntry(id));
};

export const likeEntryThunk = (id, author) => async (dispatch) => {
  const response = await fetch(`/entry/${id}/like`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
  });
  const entry = await response.json();
  dispatch(editEntry(id, author));
};

export const uploadImgThunk = (imgSelected) => async (dispatch) => {
  const formData = new FormData();
  formData.append("file", imgSelected);
  formData.append("upload_preset", "bh4tv9ap");

  const sendImg = await fetch(
    `https://api.cloudinary.com/v1_1/dwvm712y7/image/upload`,
    {
      method: "post",
      body: formData,
    }
  );
  const img = await sendImg.json();
  dispatch(saveCurrentImg(img));
  console.log("uploadImgThunk", img);
};

export const getAllCommentsThunk = (id) => async (dispatch) => {
  console.log({ id });
  dispatch(isLoadingComments(true));
  const response = await fetch(`/entry/${id}`, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  });
  const comments = await response.json();
  console.log("comments--->", comments);

  if (comments) dispatch(getAllComments(comments));
  dispatch(isLoadingComments(false));
};

export const createCommentThunk = (values, entryId) => async (dispatch) => {
  const response = await fetch("/entry/comment/new", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ values, entryId }),
  });
  const comment = await response.json();

  console.log("createcommentThunk comment---->", comment);

  dispatch(createComment(comment));
};

export const deleteCommentThunk = (id) => async (dispatch) => {
  console.log('id', id)
  const response = await fetch(`/entry/comment/delete`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  const result = await response.json();

  console.log("comment deleted", result);

  dispatch(deleteComment(id));
};