import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, Route, Routes, Navigate } from 'react-router-dom';
import withLoading from '../../Components/organisms/withLoading';
import { AppContext } from '../../Components/AppContext';
import { fetchUsers, fetchBlogs } from '../../network/api';
import AddUser from '../../Components/organisms/AddUser';
import UpdateUser from '../../Components/organisms/UpdateUser';
import DeleteUser from '../../Components/organisms/DeleteUser';
import '../../Components/styles.css';
import Login from '../auth/Login';
import homeImage from '../../assets/home-image.jpg';
import PrivateRoute from '../../Components/PrivateRoute';

const UsersComponent = () => {
  const { users } = useContext(AppContext);
  const navigate = useNavigate();

  const handleUserClick = (userId) => {
    navigate(`/users/${userId}`);
  };

  return (
    <div className="container">
      <h2>Users</h2>
      <AddUser />
      <ul className="user-list">
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            <UpdateUser user={user} />
            <DeleteUser userId={user.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const BlogsComponent = ({ data }) => {
  const { setBlogs } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setBlogs(data);
  }, [data, setBlogs]);

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  return (
    <div className="container">
      <h2>Blogs</h2>
      <ul className="blog-list">
        {data.map(blog => (
          <li key={blog.id} onClick={() => handleBlogClick(blog.id)}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

const UsersWithLoading = withLoading(UsersComponent, fetchUsers);
const BlogsWithLoading = withLoading(BlogsComponent, fetchBlogs);

const UserDetail = ({ userId }) => {
  return <div>User Detail for {userId}</div>;
};

const BlogDetail = ({ blogId }) => {
  return <div>Blog Detail for {blogId}</div>;
};

const HomeComponent = ({ data }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imageLoading, setImageLoading] = useState(true); 
  const navigate = useNavigate();
  const { setUsers, setBlogs } = useContext(AppContext);

  useEffect(() => {
    const { users, blogs } = data;
    setUsers(users);
    setBlogs(blogs);
  }, [data, setUsers, setBlogs]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <div>
      {isAuthenticated && (
        <div className="App">
          <nav className="navbar">
            <Link to="/" className="active">Home</Link>
            <Link to="/users">Users</Link>
            <Link to="/blogs">Blogs</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </nav>
        </div>
      )}
      <Routes>
        <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route index element={
            <div className="home-image-container">
              {imageLoading && <div className="loading"><div className="spinner"></div></div>}
              <img src={homeImage} alt="Home" className="home-image" onLoad={handleImageLoad} style={{ display: imageLoading ? 'none' : 'block' }} />
            </div>
          } />
          <Route path="users" element={<UsersWithLoading />} />
          <Route path="blogs" element={<BlogsWithLoading />} />
          <Route path="users/:userId" element={<UserDetail />} />
          <Route path="blogs/:blogId" element={<BlogDetail />} />
        </Route>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

const fetchData = async () => {
  const users = await fetchUsers();
  const blogs = await fetchBlogs();
  return { users, blogs };
};

const HomeWithLoading = withLoading(HomeComponent, fetchData);

export default HomeWithLoading;
