// src/hooks/useAuth.ts
import { useSelector } from 'react-redux';

interface User {
    user: any;
}

export const useAuth = () => {
    const { user, loading } = useSelector((state: User) => state.user);
    return {user, loading};
};