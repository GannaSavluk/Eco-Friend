import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "cloudinary-react";

import { Form, CloseButton } from "react-bootstrap";

import { createEntryThunk, uploadImgThunk } from "../../store/entry/actions";

const CreateEntry = () => {
  const dispatch = useDispatch();
  const currentImg = useSelector((store) => store.entry.currentImg);

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState({ text: "", category: "",  file: "" });

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
    let link;
    if (currentImg) {
      link = `https://res.cloudinary.com/dwvm712y7/image/upload/v${currentImg.version}/${currentImg.public_id}.${currentImg.format}`;
      dispatch(createEntryThunk(value, link));
      setValue({ text: "", category: "" , file: ""});
    }
  };

  return (
    <div className="CreateEntry">
      {!isOpen && (
        <div className="d-grid gap-2">
          <button variant="secondary" size="lg" onClick={changeState}>
            Create new post
          </button>
        </div>
      )}
      {isOpen && (
        <div>
          <CloseButton onClick={changeState} />
          {currentImg && (
            <Image
              style={{ width: 200 }}
              cloudName="dwvm712y7"
              publicId={`https://res.cloudinary.com/dwvm712y7/image/upload/v${currentImg.version}/${currentImg.public_id}.${currentImg.format}`}
            />
          )}
          <form onSubmit={createNewPost}>
            <input
              type="file"
              name='file'
              // value={value?.file}
              onChange={(e) => {
                dispatch(uploadImgThunk(e.target.files[0]));
              }}
            />
            <Form.Control
              as="textarea"
              type="text"
              name="text"
              placeholder="text here"
              style={{ height: "100px" }}
              value={value?.text}
              onChange={onInputText}
            />
            <select
              aria-label="Floating label select example"
              name="category"
              onChange={onInputCategory}
            >
              <option>choose category</option>
              <option value="eco-news">eco-news</option>
              <option value="sorting">sorting</option>
              <option value="events">events</option>
            </select>
            <button
              variant="primary"
              onClick={() => setValue({ text: "", category: "" })}
            >
              Reset
            </button>
            <button variant="primary" type="submit">
              Send
            </button>{" "}
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateEntry;
