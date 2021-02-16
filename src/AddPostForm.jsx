import { useState } from "react";

const AddPostForm = (props) => {
  const { handleAddPost } = props;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (handleAddPost) handleAddPost({ title, body });
  };
  return (
    <form className="add-post-form" onSubmit={onSubmit}>
      <label>
        Title
        <input value={title} placeholder="title of post" onChange={(e) => setTitle(e.target.value.trim())} />
      </label>
      <label>
        Body
        <textarea value={body} placeholder="content of post" onChange={(e) => setBody(e.target.value.trim())} />
      </label>
      <button type="submit">Add Post</button>
    </form>
  );
};

export default AddPostForm;
