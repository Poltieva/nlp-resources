import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

function PublicOnlyRoute({children}) {
    const accessToken = false;
    const loading = false;
    const location = useLocation();

    if (!accessToken && !loading) {
        return children
    } else if (loading) {
        return <p>Loading...</p>
    } else if (accessToken && !loading) {
        return <Navigate to="/login" state={{from: location}} replace />
    } else {
        return <p>Something went wrong</p>
    }
}

export default PublicOnlyRoute