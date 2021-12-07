import React from "react";
import AllEntries from "./AllEntries";
import News from "./News";

import classes from "./Blog.module.css";
import NewsCarousel from "./NewsCarousel";

const Blog = () => {
  return (
    <div className={classes.Blog}>
      <div className={classes.entries_blocks}>
      <AllEntries />
      <News/>
      {/* <NewsCarousel/> */}
      </div>
    </div>
  );
};
export default Blog;
