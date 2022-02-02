import {React, createContext, useState, useEffect } from "react";

import Axios from 'axios'
import { APIconfig } from '../Config'
import { Loading } from '../Pages/Loading';

const LoginContext = createContext({
    isLogged : false,
    user : {},
    setStatus: (status) => {},
    setUser: (name) => {}
});

export function LoginContextProvider(props) {

    const [isLoading, setIsLoading] = useState(true);
    const [loginStatus, setLoginStatus] = useState(false);
    const [user, setUser] = useState({});

    useEffect (() => {
        setIsLoading(true);
        Axios.defaults.withCredentials = true;
        Axios.get(`${APIconfig.url}/users/auth`)
           .then((res) => {
               if (res.status === 200) {
                setLoginStatus(true);
                setUser(res.data.user)
               }
           }).catch((error)=>{

           }).finally(() => setIsLoading(false))
    }, [])
    
    function setIsLoggedHandler(logged) {
        setLoginStatus(logged)
    }

    function setUserHandler(user) {
        setUser(user)
    }


    const context = {
        isLogged : loginStatus,
        user,
        setStatus: setIsLoggedHandler,
        setUser: setUserHandler

    };
    
    if (isLoading) {
        return (<Loading />);
    }

    return <LoginContext.Provider value={context}>
        {props.children}
    </LoginContext.Provider>
}

export default LoginContext;