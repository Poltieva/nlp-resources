import { Navigate, useLocation } from "react-router-dom";
import {useEffect} from "react";

function PrivateRoute({children}) {
    const accessToken = false;
    const loading = false;
    const location = useLocation();

    if (accessToken) {
        return children
    } else if (loading) {
        return <p>Loading...</p>
    } else if (!accessToken && !loading) {
        return <Navigate to="/login" state={{from: location}} replace />
    } else {
        return <p>Something went wrong</p>
    }
}

export default PrivateRoute