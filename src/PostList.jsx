const PostList = (props) => {
  const { loading, error, posts, handleDeletePost, handleEditPost } = props;
  return (
    <div className="post-list">
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>Could not load posts</div>
      ) : (
        <>
          {posts.map((post, i) => (
            <article key={i} className="post-list-item">
              <h4>{post.title}</h4>
              <p>{post.body}</p>
              <div className="post-actions">
                <button onClick={() => handleDeletePost(post.id)}>delete</button>
                <button onClick={() => handleEditPost(post, i)}>edit</button>
              </div>
            </article>
          ))}
        </>
      )}
    </div>
  );
};

export default PostList;
