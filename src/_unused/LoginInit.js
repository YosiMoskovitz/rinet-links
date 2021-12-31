import { React, useState, useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Axios from 'axios'
import { APIconfig } from '../Config'
import LoginContext from '../store/Login-context';
import { Loading } from '../Pages/Loading';

export function LoginInit() {
    console.log('LoginInit has rendered')
    const LoginCtx = useContext(LoginContext);
    const [login, setLogin] = useState({status : undefined, user: undefined});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log('LoginInit useEffect API rendered');
        setIsLoading(true);
        Axios.defaults.withCredentials = true;
         Axios.get(`${APIconfig.url}/users/auth`)
            .then((res) => {
                if (res.status === 200) {
                    setLogin({
                        status: true,
                        user: res.data
                    });
                }
            }).catch((error)=>{
                setLogin({
                    status: false,
                    user: {}
                });
            })
            .finally(setIsLoading(false))
    }, []);

    useEffect(() => {
        console.log('LoginInit LoginCtx useEffect rendered')
        LoginCtx.setStatus(login.status);
        LoginCtx.setUser(login.user)
    }, [LoginCtx, login])

    
    if (isLoading) {
        return (<Loading />);
    }
    return (
        <Outlet />
    );
}