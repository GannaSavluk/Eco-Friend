import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Button, Card, CloseButton } from "react-bootstrap";

import {
  getAllEntriesThunk,
  likeEntryThunk,
  likeEntry,
} from "../../store/entry/actions";
import Comment from "./Comment";

const AllEntries = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);

  const entries = useSelector((store) => store.entry.entries);
  const user = useSelector((store) => store.auth.user);

  const onLike = (entryid, userid) => {
    dispatch(likeEntryThunk(entryid, userid));
    dispatch(likeEntry(entryid));
  };

  useEffect(() => {
    dispatch(getAllEntriesThunk());
  }, []);

  const changeState = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="AllEntries">
      {!isOpen && (
        <div className="d-grid gap-2">
          <Button variant="secondary" size="lg" onClick={changeState}>
            Open Blog
          </Button>
        </div>
      )}
      {isOpen && (
        <>
          <CloseButton onClick={changeState} />
          {entries?.map((entry) => (
            <div key={entry._id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src="data:image/jpeg;base64,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"
                  // src={entry?.img} //TODO КАРТИНКА ИЗ БД
                />
                <Card.Body>
                  <Card.Title>Category: {entry.category}</Card.Title>
                  <Card.Text>{entry.text}</Card.Text>
                  <Card.Text>Author: {entry.author.name}</Card.Text>
                  <Button variant="primary">Show comments</Button>
                  <svg
                    onClick={() => onLike(entry._id, user.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-hand-thumbs-up"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                  </svg>
                  <Card.Text>Likes: {entry.likes.length} </Card.Text>
                  {/* <Card.Text>Likes: {()=>getLikes(entry._id)} </Card.Text> */}
                </Card.Body>
              </Card>
            </div>
          ))}
        </>
      )}
      <div>
        <Comment />
      </div>
    </div>
  );
};

export default AllEntries;
