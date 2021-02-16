import { useEffect, useState } from "react";
import AddPostForm from "./AddPostForm";
import { addPost, deletePost, editPost, getAllPosts } from "./api";
import EditPostDialog from "./EditPostDialog";
import { useConfirmation } from "./EditPostProvider";
import PostList from "./PostList";
const userId = 1;
function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const confirm = useConfirmation();

  useEffect(() => {
    setLoading(true);
    getAllPosts()
      .then(setPosts)
      .then(() => setLoading(false))
      .catch(setError);
  }, []);
  const handleAddPost = ({ title, body }) => {
    const id = posts.length + 1;
    addPost({ title, body, userId }).then((addedPost) => setPosts([...posts, { ...addedPost, id }]));
  };
  const handleDeletePost = (postId) => {
    deletePost(postId).then(() => {
      setPosts(posts.filter((post) => post.id !== postId));
    });
  };
  const handleEditPost = async ({ id, title, body }, index) => {
    const post = { id, title, userId, body };
    let editedPost = { ...post };
    try {
      editedPost = await confirm({ post });
    } catch (error) {
      return;
    }
    try {
      const response = await editPost(editedPost);
      const postsCopy = [...posts];
      postsCopy.splice(index, 1, editedPost);
      setPosts(postsCopy);
    } catch (error) {
      alert("could not edit post. Check your internet connection");
    }
  };

  return (
    <div className="App">
      <PostList
        posts={posts}
        error={error}
        loading={loading}
        handleDeletePost={handleDeletePost}
        handleEditPost={handleEditPost}
      />
      <AddPostForm handleAddPost={handleAddPost} />
    </div>
  );
}

export default App;
