import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, FloatingLabel, Form, CloseButton } from "react-bootstrap";

import { createEntryThunk } from "../../store/entry/actions";

const CreateEntry = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState({ text: "", category: "" });
  const [isUploud, setIsUploud] = useState({});

  const onInputText = ({ target: { value } }) => {
    setValue((prev) => ({ ...prev, text: value }));
  };
  const onInputCategory = ({ target: { value } }) => {
    setValue((prev) => ({ ...prev, category: value }));
  };
  const changeState = () => {
    setIsOpen(!isOpen);
  };
  const createNewPost = (event) => {
    event.preventDefault();
    // const data = new FormData();
    // data.append("file", event.target.files[0]);
    dispatch(createEntryThunk(value));
  };

  // const uploadHandler = async (event) => {
  //   const data = new FormData();
  //   data.append("file", event.target.files[0]);
  //   console.log('data-->',data);
  //   setIsUploud(data)
  // };
  return (
    <div className="CreateEntry">
      {!isOpen && (
        <div className="d-grid gap-2">
          <Button variant="secondary" size="lg" onClick={changeState}>
            Create new post
          </Button>
        </div>
      )}
      {isOpen && (
        <div>
          <CloseButton onClick={changeState} />
          <form onSubmit={createNewPost}>
            {/* <input
              className="upload-imgs"
              type="file"
              name="file"
              // onChange={uploadHandler}
            /> */}
            <FloatingLabel label="Text here">
              <Form.Control
                as="textarea"
                type="text"
                name="text"
                placeholder="Leave a comment here"
                style={{ height: "100px" }}
                onChange={onInputText}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingSelect" label="category">
              <Form.Select
                aria-label="Floating label select example"
                name="category"
                onChange={onInputCategory}
              >
                <option>choose category</option>
                <option value="eco-news">eco-news</option>
                <option value="sorting">sorting</option>
                <option value="events">events</option>
              </Form.Select>
            </FloatingLabel>
            <Button variant="primary">Reset</Button>{" "}
            <Button variant="primary" type="submit">
              Send
            </Button>{" "}
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateEntry;
