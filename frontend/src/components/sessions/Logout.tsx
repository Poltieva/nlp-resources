import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {RootState, store} from '../../store';
import { logoutUser } from './sessionSlice';

type AppDispatch = typeof store.dispatch
const useAppDispatch = () => useDispatch<AppDispatch>()
function Logout() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const accessToken = useSelector((state : RootState) => state.session.accessToken);

    useEffect(() => {
        if (accessToken) {
            dispatch(logoutUser(accessToken));
        }
        navigate('/login');
    }, []);

    return (
        <div>Logout</div>
    )
}

export default Logout