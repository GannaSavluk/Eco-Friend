import React from "react";
import AllEntries from "./AllEntries";
import CreateEntry from "./CreateEntry";

const Blog = () => {
  return (
    <div className="Blog">
      <CreateEntry />
      <AllEntries />
    </div>
  );
};
export default Blog;
