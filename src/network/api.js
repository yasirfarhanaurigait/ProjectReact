import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = () => axios.get(`${API_URL}/users`).then(response => response.data);
export const fetchBlogs = () => axios.get(`${API_URL}/posts`).then(response => response.data);

export const addUser = (user) => axios.post(`${API_URL}/users`, user);
export const updateUser = (id, user) => axios.put(`${API_URL}/users/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);

export const addBlog = (blog) => axios.post(`${API_URL}/posts`, blog);
export const updateBlog = (id, blog) => axios.put(`${API_URL}/posts/${id}`, blog);
export const deleteBlog = (id) => axios.delete(`${API_URL}/posts/${id}`);