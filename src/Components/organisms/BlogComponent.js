import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, Route, Routes, Navigate } from 'react-router-dom';
import { AppContext } from '../../Components/AppContext';

import AddUser from './AddUser';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';
import '../../Components/styles.css';

 const BlogsComponent = () => {
  const { blogs } = useContext(AppContext);
  const navigate = useNavigate();


  const handleBlogClick = (blogId) => {
    const selectedBlog = blogs.find(blog => blog.id === blogId);
    navigate(`/blogs/${blogId}`, { state: { blog: selectedBlog } });
  };
  return (
    <div className="container">
      <h2>Blogs</h2>
      <ul className="blog-list">
        {blogs.map(blog => (
          <li key={blog.id} onClick={() => handleBlogClick(blog.id)}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default BlogsComponent;