import React, { useContext } from 'react';
import { AppContext } from '../../Components/AppContext';
import { deleteUser } from '../../network/api';
import '../../Components/styles.css';

const DeleteUser = ({ userId }) => {
    const { users, setUsers } = useContext(AppContext);

    const handleDelete = () => {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
    };

    return (
        <button className="button delete" onClick={handleDelete}>Delete User</button>
    );
};

export default DeleteUser;