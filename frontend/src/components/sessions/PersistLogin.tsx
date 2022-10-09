import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import {RootState, store} from '../../store';
import { refreshAccessToken } from './sessionSlice';
import {getAccessToken} from "./storeTokens";

type AppDispatch = typeof store.dispatch

const useAppDispatch = () => useDispatch<AppDispatch>()
function PersistLogin() {
    const [loading, setLoading] = useState(useSelector((state: RootState) => state.session.loading));
    const accessToken = getAccessToken();
    const refreshToken = useSelector((state : RootState) => state.session.refreshToken);
    const dispatch = useAppDispatch();
    function verifyRefreshToken() {
        try {
            dispatch(refreshAccessToken(refreshToken));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!accessToken) {
            verifyRefreshToken();
        } else {
            setLoading(false)
            console.log(loading)
        }
    }, [accessToken, refreshToken]);

    return (
        <>
            {loading ? <p>Loading...</p> : <Outlet />}
        </>
    )
}

export default PersistLogin