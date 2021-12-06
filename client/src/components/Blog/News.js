import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Card, Avatar, Button, Tooltip } from "antd";
import {
  SmileTwoTone,
  CaretDownOutlined,
  CloseOutlined,
  EditOutlined,
} from "@ant-design/icons";
import classes from "./News.module.css";

import {
  likeEntryThunk,
  likeEntry,
  deleteEntryThunk,
} from "../../store/entry/actions";
// import { entry } from "../../store/entry/reducers";

import EditEntry from "./EditEntry";
import EntryComments from "./EntryComments";
import NewsDetails from "./NewsDetails";

const { Meta } = Card;

const News = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenText, setIsOpenText] = useState({ id: "" });
  const [isOpenComments, setIsOpenComments] = useState({ id: "" });
  const [isOpenEditEntryForm, setIsOpenEditEntryForm] = useState({ id: "" });
  const [isEmptyPrevComment, setIsEmptyPrevComment] = useState(false);

  const entries = useSelector((store) => store.entry.entries);
  const user = useSelector((store) => store.auth.user);

  console.log({ entries });
  const onLike = (entryid, userid) => {
    dispatch(likeEntryThunk(entryid, userid));
    dispatch(likeEntry(entryid));
  };

  const clickOpenComments = (id) => {
    setIsOpenComments("");
    setIsOpenComments({ [id]: true });
    setIsEmptyPrevComment(true);
  };

  // useEffect(() => {
  //   dispatch(getAllEntriesThunk());
  // }, []);

  const changeState = () => {
    setIsOpen(!isOpen);
  };
  const showUserInfo = (userId) => {
    console.log("show user ID", userId);
  };

  const openEditEntryForm = (entryid) => {
    console.log("openEditEntryForm", entryid);
    setIsOpenEditEntryForm({ id: entryid });
  };

  return (
    <div className={classes.News}>
      <img
        src="img/rest/Artboard-8Eco-News.png"
        // src="img/rest/HEN-logo-2021-website-header-272x93-1.png"
        // src="https://www.ifpri.org/sites/default/files/latest-icon.gif"
        // src="https://www.seedandlightinternational.org/wpimages/wpac3b23e1.gif"
        // src="https://storage.googleapis.com/proudcity/elgl/uploads/2018/04/Environmental-11.gif"
        alt=""
      />
      {isOpen && (
        <>
          {/* <CaretUpOutlined onClick={changeState} /> */}
          {entries?.map((entry) => (
            <>
              {entry.author.role === 0 && (
                <>
                  {isOpenEditEntryForm.id !== entry._id ? (
                    <>
                      <Card
                        className={classes.card}
                        key={entry._id}
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
                                // className={classes.img}
                                src={entry.author?.img}
                                onClick={() => showUserInfo(entry.author?._id)}
                              />
                            ) : (
                              <Avatar
                                className={classes.img}
                                src="/img/person/default_avatar.png"
                              />
                            )
                          }
                          title={
                            <div className={classes.title}>
                              {entry.category}
                              {(user?.id === entry.author?._id ||
                                user?.role === 0) && (
                                <div>
                                  <EditOutlined
                                    onClick={() => openEditEntryForm(entry._id)}
                                  />
                                  <CloseOutlined
                                    onClick={() =>
                                      dispatch(deleteEntryThunk(entry._id))
                                    }
                                  />
                                </div>
                              )}
                            </div>
                          }
                          description={
                            <div>
                              <div className={classes.cardDescription}>
                              {isOpenText.id !==entry._id && (
                                  <Tooltip title="click to read more">
                                    <p
                                      onClick={() => setIsOpenText({ id: entry._id })}
                                    >
                                      {entry.text.slice(0, 50)}...
                                    </p>
                                  </Tooltip>
                                )}
                               {(isOpenText.id===entry._id) && (
                                  <NewsDetails
                                    setIsOpenText={setIsOpenText}
                                    text={entry.text}
                                  />
                                )}
                                <p>Author: {entry.author?.name} </p>
                                <p>Posted: {entry?.date}</p>
                                <p>Likes: {entry.likes?.length} </p>
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
                              {/* {isEmptyPrevComment && isOpenComments[entry._id] && (
                          <Comment
                            key={`comment-${entry._id}`}
                            entryId={entry._id}
                          />
                        )} */}
                            </div>
                          }
                        />
                      </Card>
                      <div>
                        {isEmptyPrevComment && isOpenComments[entry._id] && (
                          <EntryComments
                            key={`comment-${entry._id}`}
                            entryId={entry._id}
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <EditEntry
                      entry={entry}
                      setIsOpenEditEntryForm={setIsOpenEditEntryForm}
                    />
                  )}
                </>
              )}
            </>
          ))}
        </>
      )}
    </div>
  );
};

export default News;
