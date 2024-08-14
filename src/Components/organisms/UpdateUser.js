import React, { useState, useContext } from 'react';
import { AppContext } from '../../Components/AppContext';
import { updateUser } from '../../network/api';
import '../../Components/styles.css';

const UpdateUser = ({ user }) => {
    const { users, setUsers } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(user.name);

    const handleUpdate = () => {
        const updatedUsers = users.map(u =>
            u.id === user.id ? { ...u, name } : u
        );
        setUsers(updatedUsers);
        setIsEditing(false);
    };

    return isEditing ? (
        <div>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button className="button update" onClick={handleUpdate}>Update</button>
            <button className="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
    ) : (
        <button className="button update" onClick={() => setIsEditing(true)}>Update User</button>
    );
};

export default UpdateUser;