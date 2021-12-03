import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getAllCommentsThunk } from "../../store/entry/actions";
import CreateComment from "./CreateComment";

const Comment = ({ entryId }) => {
  console.log("COMMENT entryId", entryId);
  const dispatch = useDispatch();
  const comments = useSelector((store) => store.entry.comments);
  const isLoading = useSelector((store) => store.entry.loadingCommentStatus);
  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    if (entryId) dispatch(getAllCommentsThunk(entryId));
  }, []);

  if (isLoading) {
    return (
      <div>
        <img style={{ width: 40 }} src="img/spinner/spinner.gif" alt="" />
      </div>
    );
  }

  return (
    <div className="Comment">
      {comments && (
        <div>
          {comments.map((oneComment) => (
            <div key={oneComment._id}>
              {/* <Link> */}
              <h3>{oneComment?.author?.name}</h3>
              {/* </Link> */}
              <p>{oneComment?.text}</p>
            </div>
          ))}
        </div>
      )}
      {user && <CreateComment entryId={entryId} />}
    </div>
  );
};
export default Comment;
