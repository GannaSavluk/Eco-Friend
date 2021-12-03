import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";

// import { getAllCommentsThunk } from "../../store/entry/actions";

const CreateComment = ({ entryId }) => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (entryId) dispatch(createCommentThunk(entryId));
  // }, []);

  return (
    <div className="CreateComment">
      <button>Create</button>
    </div>
  );
};
export default CreateComment;
