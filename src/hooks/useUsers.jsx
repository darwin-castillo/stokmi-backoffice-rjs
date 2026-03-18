import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { UserModel } from '../models/UserModel';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {
            setLoading(true);
            setError(null);
            const data = await userService.getAll();
            console.log("raw ", data);
            const rawUsers = data.value || data;

            const modeledUsers = rawUsers.map(item => UserModel(item));
            setUsers(modeledUsers);
        } catch (err) {
            setError(err.message || "Error al cargar usuarios");
        } finally {
            setLoading(false);
        }
    };

    const refresh = () => fetchUsers();

    return { users, loading, error, refresh };
};