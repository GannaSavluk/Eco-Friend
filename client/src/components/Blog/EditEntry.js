import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "cloudinary-react";

import classes from "./EditEntry.module.css";
import { DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Input } from "antd";

import { editEntryThunk, uploadImgThunk } from "../../store/entry/actions";

const EditEntry = ({ entry, setIsOpenEditEntryForm }) => {
  const dispatch = useDispatch();
  const currentImg = useSelector((store) => store.entry.currentImg);
  const user = useSelector((store) => store.auth.user);

  const [value, setValue] = useState({ text: "", category: "", file: "" });

  const onInputText = ({ target: { value } }) => {
    setValue((prev) => ({ ...prev, text: value }));
  };
  const onInputCategory = ({ target: { value } }) => {
    setValue((prev) => ({ ...prev, category: value }));
  };

  const updateEntry = (event) => {
    event.preventDefault();
    let link;
    if (currentImg) {
      link = `https://res.cloudinary.com/dwvm712y7/image/upload/v${currentImg.version}/${currentImg.public_id}.${currentImg.format}`;
      dispatch(editEntryThunk(value, link, entry._id));
      setValue({ text: "", category: "", file: "" });
    } else {
      dispatch(editEntryThunk(value, entry.img, entry._id));
    }
    setIsOpenEditEntryForm({ id: "" });
  };

  return (
    <div className={classes.EditEntry}>
      <div>
        <div>
          {user && (
            <div>
              <img src={entry.img} style={{ width: 200 }} alt="" />
              {currentImg && (
                <>
                  <Image
                    style={{ width: 200 }}
                    cloudName="dwvm712y7"
                    publicId={`https://res.cloudinary.com/dwvm712y7/image/upload/v${currentImg.version}/${currentImg.public_id}.${currentImg.format}`}
                  />
                </>
              )}
              <form onSubmit={updateEntry}>
                <input
                  type="file"
                  name="file"
                  onChange={(e) => {
                    dispatch(uploadImgThunk(e.target.files[0]));
                  }}
                />
                <Input
                  as="textarea"
                  type="text"
                  name="text"
                  placeholder="text here"
                  style={{ height: "100px" }}
                  defaultValue={entry.text}
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
                <div className={classes.btns}>
                  <Button onClick={() => setIsOpenEditEntryForm({ id: "" })}>
                    <DeleteOutlined style={{ color: "red" }} />
                  </Button>
                  <Button variant="primary" htmlType="submit">
                    <CheckOutlined style={{ color: "green" }} />
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditEntry;
