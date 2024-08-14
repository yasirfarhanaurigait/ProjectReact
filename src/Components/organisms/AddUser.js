import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import { addUser } from '../../network/api';
import '../../Components/styles.css';

const AddUser = () => {
    const [name, setName] = useState('');
    const { users, setUsers } = useContext(AppContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = { id: Date.now(), name };
        setUsers([...users, newUser]);  
        setName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter user name"
                required
            />
            <button className="button add" type="submit">Add User</button>
        </form>
    );
};

export default AddUser;