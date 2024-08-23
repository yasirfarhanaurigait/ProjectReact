import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, Route, Routes, Navigate } from 'react-router-dom';
import { AppContext } from '../../Components/AppContext';
import AddUser from '../../Components/organisms/AddUser';
import UpdateUser from '../../Components/organisms/UpdateUser';
import DeleteUser from '../../Components/organisms/DeleteUser';
import '../../Components/styles.css';

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
  export default UsersComponent;