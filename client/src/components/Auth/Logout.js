import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logoutFetch } from '../../store/auth/actions'

function Logout() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('quit')

        dispatch(logoutFetch());
        navigate('/')
    }, [navigate])

    return (
        <div className="Logout">
        </div>
    );
}

export default Logout;