import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../Components/Users.css';
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div><h1 className="users-container">Users List</h1>
  
    <div className="users-container">
      {users.map(user => (
        <div key={user.id} className="card">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default Users;
