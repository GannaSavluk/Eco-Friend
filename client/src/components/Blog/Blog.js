import React from "react";
import AllEntries from "./AllEntries";
import CreateEntry from "./CreateEntry";

import classes from "./Blog.module.css";

const Blog = () => {
  return (
    <div className={classes.Blog}>
      <CreateEntry />
      <AllEntries />
    </div>
  );
};
export default Blog;
