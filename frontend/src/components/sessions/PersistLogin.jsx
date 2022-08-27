import {useEffect} from "react";
import { Outlet } from "react-router-dom";

function PersistLogin() {
    const accessToken = false;
    const loading = false;
    const refreshToken = null;

    useEffect(() => {
        function verifyRefreshToken() {
            try {
                // dispatch(refreshAccessToken(refreshToken));
            } catch (error) {
                console.log(error);
            }
        }
        if (!accessToken) {
            verifyRefreshToken();
        }
    }, [accessToken, refreshToken]);

    return (
        <>
            {loading ? <p>Loading...</p> : <Outlet />}
        </>
    )
}

export default PersistLogin