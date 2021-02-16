import { useEffect, useState } from "react";
import AddPostForm from "./AddPostForm";
import { addPost, deletePost, editPost, getAllPosts } from "./api";
import { useConfirmation } from "./EditPostProvider";
import PostList from "./PostList";
const userId = 1;
const ALERT_MESSAGE = "Oops!!\nCould not complete the request. try again";
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
    addPost({ title, body, userId })
      .then((addedPost) => setPosts([...posts, { ...addedPost, id }]))
      .catch((err) => {
        alert(ALERT_MESSAGE);
      });
  };
  const handleDeletePost = (postId) => {
    document.body.style.cursor = "wait";
    deletePost(postId)
      .then(() => setPosts(posts.filter((post) => post.id !== postId)))
      .then(() => {
        document.body.style.cursor = "default";
      })
      .catch((err) => alert(ALERT_MESSAGE));
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
      document.body.style.cursor = "wait";
      await editPost(editedPost);
      const postsCopy = [...posts];
      postsCopy.splice(index, 1, editedPost);
      setPosts(postsCopy);
      document.body.style.cursor = "default";
    } catch (error) {
      alert(ALERT_MESSAGE);
    }
  };

  return (
    <div className="App">
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>Could not load posts. Try refreshing the page</div>
      ) : (
        <>
          <PostList
            posts={posts}
            error={error}
            loading={loading}
            handleDeletePost={handleDeletePost}
            handleEditPost={handleEditPost}
          />
          <AddPostForm handleAddPost={handleAddPost} />
        </>
      )}
    </div>
  );
}

export default App;
