import React, { createContext, useState,useEffect } from 'react';
import { fetchUsers, fetchBlogs, addUser, updateUser, deleteUser, addBlog, updateBlog, deleteBlog } from '../network/api';


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const usersData = await fetchUsers();
                console.log('Fetched users:', usersData);  
                setUsers(usersData);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        loadUsers();
    }, []);

    return (
        <AppContext.Provider value={{ users, setUsers, blogs, setBlogs }}>
            {children}
        </AppContext.Provider>
    );
};