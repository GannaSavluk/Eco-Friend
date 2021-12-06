import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Comment, Tooltip, Avatar, Button,  Divider } from "antd";
import classes from "./EntryComments.module.css";

import { getAllCommentsThunk } from "../../store/entry/actions";
import CreateComment from "./CreateComment";

const EntryComments = ({ entryId }) => {
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
            <div key={oneComment._id} className={classes.comments}>
              <Divider style={{width: '50%'}}/>
              <Comment
              className={classes.one_comment}
                // actions={actions}
                author={oneComment?.author?.name}
                avatar={
   
                  oneComment.author.img ? (
                    <Avatar
                      src={oneComment?.author?.img}
                      alt=""
                    />
                  ) : (
                    <Avatar
                      src="img/person/default_avatar.png"
                      alt=""
                    />
                  )
                }
                content={<p>{oneComment?.text}</p>}
                datetime={
                  <Tooltip title='Published:'>
                    <span>{oneComment.date}</span>
                  </Tooltip>
                }
              />

            </div>
          ))}
        </div>
      )}
      {user && <CreateComment className={classes.create_comment_form} entryId={entryId} />}
    </div>
  );
};
export default EntryComments;
