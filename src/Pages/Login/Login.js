import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginReq } from '../../Api/LoginApi';
import LoginContext from '../../store/Login-context'

import { LoginForm } from '../../Components/LoginForm';

export function Login() {
    const [msg, setMsg] = useState(undefined);

    const LoginCtx = useContext(LoginContext);
    const navigate = useNavigate();

    const LoginSubmit = async (user) => {
        const res = await LoginReq(user);
        if (res.status === 'OK') {
            LoginCtx.setStatus(true);
            LoginCtx.setUser(res.data.user);
            navigate('/', { replace: true })
        }
        if (res.status === 'ERROR') {
            setMsg(res.data)
        }
    }

    return (
        <section>
            <LoginForm formSubmit={LoginSubmit} message={msg} />
        </section>
    )

}