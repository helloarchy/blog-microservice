import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`http://posts.com:4001/posts/${postId}/comments`, {
      content,
    });

    setContent(""); // Revert input to empty once submitted
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className={"form-group"}>
          <label>New comment</label>
          <input
            className={"form-control"}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className={"btn btn-primary"}>Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
