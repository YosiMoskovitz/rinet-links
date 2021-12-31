import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginReq } from './LoginApi';
import LoginContext from '../../store/Login-context'

import styles from './Login.module.css';
import { LoginForm } from '../../Components/LoginForm';

export function Login() {
    const [msg, setMsg] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const LoginCtx = useContext(LoginContext);
    const navigate = useNavigate();

    const LoginSubmit = (user) => {
        setIsLoading(true)
        LoginReq(user).then((res)=> {
            if (res.status === 'OK'){
                LoginCtx.setStatus(true);
                LoginCtx.setUser(res.data.user);
                navigate('/', { replace: true })
            }
            if (res.status === 'ERROR') {
                setMsg(res.data)
                setIsLoading(false)
            }
        })
        
 
    }
    // const EmailCheck = (email)=> {
    //     Axios.get(`${APIconfig.url}/users/${email}`)
    //     .then((res) => {
    //         if (res.status === 302) {
    //             return false;
    //         }
    //     }).catch((err) => {
    //         return err.message;
    //     })
    // }

        return (
            <section className={styles.main}>
                <LoginForm onSubmit={LoginSubmit} message={msg} setMessage={setMsg} loading={isLoading}/>
            </section>
        )

}