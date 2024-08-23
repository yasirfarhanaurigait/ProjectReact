import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../Components/styles.css';

const BlogDetail = () => {
  const location = useLocation();
  const { blog } = location.state || {}; // Fallback to an empty object if state is undefined

  if (!blog) {
    return <div>No blog data available.</div>;
  }

  return (
    <div className="blog-detail-container">
    <div className="blog-detail-card">
      <h2>{blog.title}</h2>
      <p>{blog.body}</p>
    </div>
    </div>
  );
};

export default BlogDetail;
