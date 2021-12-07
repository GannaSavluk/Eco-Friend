import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Card, Button, Tooltip, Carousel, Radio } from "antd";
import { SmileTwoTone, CloseOutlined, EditOutlined } from "@ant-design/icons";
import classes from "./NewsCarousel.module.css";

import {
  likeEntryThunk,
  likeEntry,
  deleteEntryThunk,
} from "../../store/entry/actions";

import EditEntry from "./EditEntry";
import EntryComments from "./EntryComments";
import NewsDetails from "./NewsDetails";

const { Meta } = Card;
const contentStyle = {
  height: "160px",
  color: "white",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const NewsCarousel = () => {
  const [dotPosition, setDotPosition] = React.useState("left");

  return (
    <div className={classes.NewsCarousel}>
      <Carousel dotPosition={dotPosition}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </div>
  );
};
export default NewsCarousel;
