import { useEffect, useState } from "react";

const EditPostDialog = (props) => {
  const { post, handleEditPost, onClose } = props;
  const [formValue, setFormValue] = useState(post);
  useEffect(() => {
    setFormValue(post);
  }, [post]);
  const onSubmit = (e) => {
    e.preventDefault();
    handleEditPost(formValue);
  };
  return (
    <div className="edit-post-backdrop" onClick={onClose}>
      <div className="edit-post-modal" onClick={(e) => e.stopPropagation()}>
        <div className="edit-post-modal-heading">
          <h3>Edit post</h3>
          <button onClick={onClose}>close</button>
        </div>
        <form className="edit-post-form" onSubmit={onSubmit}>
          <label>
            Title:
            <input
              value={formValue.title}
              placeholder="title of post"
              onChange={(e) => setFormValue({ ...formValue, title: e.target.value.trim() })}
            />
          </label>
          <label>
            Body:
            <textarea
              rows="4"
              cols="50"
              value={formValue.body}
              placeholder="content of post"
              onChange={(e) => setFormValue({ ...formValue, body: e.target.value.trim() })}
            />
          </label>
          <button type="submit">confirm</button>
        </form>
      </div>
    </div>
  );
};

export default EditPostDialog;
