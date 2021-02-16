const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getAllPosts = () => fetch(`${BASE_URL}/posts`).then((response) => response.json());

export const addPost = ({ title, body, userId }) =>
  fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ title, body, userId }),
  }).then((response) => response.json());

export const deletePost = (postId) =>
  fetch(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE",
  }).then((response) => response.json());

export const editPost = ({ id, title, body, userId }) =>
  fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, title, body, userId }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((response) => response.json());
