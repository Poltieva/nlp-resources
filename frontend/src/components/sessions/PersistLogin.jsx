import {useEffect} from "react";
import { Outlet } from "react-router-dom";

function PersistLogin() {
    const accessToken = false;
    const loading = false;
    const refreshToken = null;

    useEffect(() => {
        function verifyRefreshToken() {
            try {
                // dispatch(refreshAccessToken(accessToken))
                console.log("Refreshing access token")
            } catch (error) {
                console.log("Error refreshing access token")
            }
            if (!accessToken) {
                verifyRefreshToken()
            }
        }
    }, [accessToken, refreshToken])

    return (
        <>{loading ? <p>Loading...</p> : <Outlet />}</>
    )

}

export default PersistLogin
