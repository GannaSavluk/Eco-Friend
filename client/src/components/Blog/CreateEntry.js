import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, FloatingLabel, Form, CloseButton } from "react-bootstrap";

import { createEntryThunk } from "../../store/entry/actions";

const CreateEntry = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState({ text: "", category: "" });

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
    dispatch(createEntryThunk(value));

    console.log(value);
  };

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
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
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
