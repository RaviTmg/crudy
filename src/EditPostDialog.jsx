import { useEffect, useState } from "react";

const EditPostDialog = (props) => {
  const { post, handleEditPost, open, onClose } = props;
  const [formValue, setFormValue] = useState(post);
  useEffect(() => {
    setFormValue(post);
  }, [post]);
  const onSubmit = (e) => {
    e.preventDefault();
    handleEditPost(formValue);
  };
  return open && formValue ? (
    <div className="edit-post-form">
      <div>
        <h3>Edit post</h3>
        <button onClick={onClose}>close</button>
      </div>
      <form onSubmit={onSubmit}>
        <label>
          Title
          <input
            value={formValue.title}
            placeholder="title of post"
            onChange={(e) => setFormValue({ ...formValue, title: e.target.value.trim() })}
          />
        </label>
        <label>
          Body
          <textarea
            value={formValue.body}
            placeholder="content of post"
            onChange={(e) => setFormValue({ ...formValue, body: e.target.value.trim() })}
          />
        </label>
        <button type="submit">confirm</button>
      </form>
    </div>
  ) : (
    <></>
  );
};

export default EditPostDialog;
