import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import {RootState, store} from '../../store';
import { refreshAccessToken } from './sessionSlice';

type AppDispatch = typeof store.dispatch

const useAppDispatch = () => useDispatch<AppDispatch>()
function PersistLogin() {
    const loading = useSelector((state: RootState) => state.session.loading);
    const accessToken = useSelector((state : RootState) => state.session.accessToken);
    const refreshToken = useSelector((state : RootState) => state.session.refreshToken);
    const dispatch = useAppDispatch();
    function verifyRefreshToken() {
        console.log(accessToken)
        try {
            dispatch(refreshAccessToken(refreshToken));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
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