import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, CloseButton } from "react-bootstrap";

import { createCommentThunk } from "../../store/entry/actions";

const CreateComment = ({ entryId }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({ text: ""});
  

  const onInputText = ({ target: { value } }) => {
    setValue((prev) => ({ ...prev, text: value }));
  };

  const createNewPost = (event) => {
    event.preventDefault();
    dispatch(createCommentThunk(value, entryId));
    setValue({ text: "" });
  };

  // useEffect(() => {
  //   if (entryId) dispatch(createCommentThunk(entryId));
  // }, []);

  return (
    <div className="CreateComment">
      <form onSubmit={createNewPost}>
        <Form.Control
          as="textarea"
          type="text"
          name="text"
          placeholder="text here"
          style={{ height: "100px" }}
          value={value?.text}
          onChange={onInputText}
        />
        <button
          variant="primary"
          onClick={() => setValue({ text: ""})}
        >
          Reset
        </button>
        <button variant="primary" type="submit">
          Send
        </button>{" "}
      </form>
    </div>
  );
};
export default CreateComment;
