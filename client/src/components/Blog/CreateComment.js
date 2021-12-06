import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Form} from "react-bootstrap";
import {DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { Button} from "antd";
import classes from "./CreateComment.module.css";

import { createCommentThunk } from "../../store/entry/actions";

const CreateComment = ({ entryId }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({ text: "" });

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
    <div className={classes.CreateComment}>
      <form onSubmit={createNewPost}
      className={classes.CreateCommentForm}>
        <Form.Control
          as="textarea"
          type="text"
          name="text"
          placeholder="text here"
          style={{ height: "100px" }}
          value={value?.text}
          onChange={onInputText}
        />
        <div className={classes.btns}>
          {/* <Button
            onClick={() => {
              setValue({ text: "", category: "" });
              setIsOpen(false);
            }}
          >
            <DeleteOutlined style={{ color: "red" }} />
          </Button> */}
          <Button variant="primary" htmlType="submit">
            Send <CheckOutlined style={{ color: "green" }} />
          </Button>
        </div>
        {/* <button variant="primary" onClick={() => setValue({ text: "" })}>
          Reset
        </button> */}
        {/* <button variant="primary" type="submit">
          Send
        </button>{" "} */}
      </form>
    </div>
  );
};
export default CreateComment;
