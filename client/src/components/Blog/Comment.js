import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllCommentsThunk } from "../../store/entry/actions";
import CreateComment from "./CreateComment";

const Comment = ({ entryId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((store) => store.entry.comments);

  useEffect(() => {
    if (entryId) dispatch(getAllCommentsThunk(entryId));
  }, []);

  return (
    <div className="Comment">
      {comments && (
        <div>
          {comments.map((oneComment) => (
            <div>
              <p>{oneComment?.author?.name}</p>
            </div>
          ))}
        </div>
      )}
      <CreateComment entryId={entryId} />
    </div>
  );
};
export default Comment;
