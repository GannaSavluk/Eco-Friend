import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Card, Avatar, Button } from "antd";
import {
  SmileTwoTone,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import classes from "./AllEntries.module.css";

import {
  getAllEntriesThunk,
  likeEntryThunk,
  likeEntry,
} from "../../store/entry/actions";
import Comment from "./Comment";
const { Meta } = Card;

const AllEntries = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenComments, setIsOpenComments] = useState({ id: "" });
  const [isEmptyPrevComment, setIsEmptyPrevComment] = useState(false);

  const entries = useSelector((store) => store.entry.entries);
  const user = useSelector((store) => store.auth.user);

  const onLike = (entryid, userid) => {
    dispatch(likeEntryThunk(entryid, userid));
    dispatch(likeEntry(entryid));
  };

  const clickOpenComments = (id) => {
    setIsOpenComments("");
    setIsOpenComments({ [id]: true });
    setIsEmptyPrevComment(true);
  };

  useEffect(() => {
    dispatch(getAllEntriesThunk());
  }, []);

  const changeState = () => {
    setIsOpen(!isOpen);
  };
  const showUserInfo = (userId) => {
    console.log("show user ID", userId);
  };

  return (
    <div className="AllEntries">
      {!isOpen && (
        <div className="d-grid gap-2">
          <button variant="secondary" size="lg" onClick={changeState}>
            Open Blog <CaretDownOutlined />
          </button>
        </div>
      )}
      {isOpen && (
        <>
          <CaretUpOutlined onClick={changeState} />
          {entries?.map((entry) => (
            <Card
              className={classes.card}
              key={entry._id}
              style={{ maxWidth: 900 }}
              cover={
                <img
              // className={classes.photo}

                  style={{ width: 300 }}
                  variant="top"
                  src={entry?.img}
                  alt=" "
                />
              }
            >
              <Meta
                avatar={
                  entry.author?.img ? (
                    <Avatar
                      src={entry.author?.img}
                      onClick={() => showUserInfo(entry.author?._id)}
                    />
                  ) : (
                    <Avatar src="/img/person/default_avatar.png" />
                  )
                }
                title={entry.category}
                description={
                  <div>
                    <div className={classes.cardDescription}>
                      <p>{entry.text}</p>
                      <p>Author: {entry.author.name} </p>
                      <p>Posted: {entry.date}</p>
                      <p>Likes: {entry.likes.length} </p>
                    </div>
                    <div className={classes.like_btn}>
                      <Button
                        className={classes.button_comment}
                        type="link"
                        variant="primary"
                        onClick={() => clickOpenComments(entry._id)}
                      >
                        Comments
                      </Button>
                      {user && (
                        <SmileTwoTone
                          style={{ fontSize: 20, width: 50 }}
                          onClick={() => onLike(entry._id, user.id)}
                        />
                      )}
                    </div>
                    {isEmptyPrevComment && isOpenComments[entry._id] && (
                      <Comment
                        key={`comment-${entry._id}`}
                        entryId={entry._id}
                      />
                    )}
                  </div>
                }
              />
            </Card>
          ))}
        </>
      )}
    </div>
  );
};

export default AllEntries;
