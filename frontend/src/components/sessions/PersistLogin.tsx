import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
// import {RootState, store} from '../../store';
import { refreshAccessToken } from './sessionSlice';
import {getAccessToken} from "./storeTokens";

// type AppDispatch = typeof store.dispatch
// const useAppDispatch = () => useDispatch<AppDispatch>()
function PersistLogin() {
    // const loading = useSelector((state: RootState) => state.session.loading);
    // const accessToken = getAccessToken();
    // console.log(accessToken)
    // const refreshToken = useSelector((state : RootState) => state.session.refreshToken);
    // const dispatch = useAppDispatch();

    // useEffect(() => {
    //     function verifyRefreshToken() {
    //         try {
    //             dispatch(refreshAccessToken(refreshToken));
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     if (!accessToken) {
    //         verifyRefreshToken();
    //     }
    // }, [accessToken, refreshToken]);
    //
    // return (
    //     <>
    //         {!accessToken ? <p>Loading...</p> : <Outlet />}
    //     </>
    // )
}

export default PersistLogin