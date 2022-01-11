import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'

import LoginContext from '../../store/Login-context'
import translate from '../../Components/Utils/engToHeb.json';

const SetupInterceptors = () => {
    const LoginCtx = useContext(LoginContext);
    const navigate = useNavigate()

    const redirectToLogin = () => {
        window.location.pathname !== '/login' && navigate('/login', { replace: true })
    }

    Axios.interceptors.response.use(
        function (response) {
            // Do something with response data
            response.handler = resHandler(response)
            return response;
        },
        function (error) {
            // Do something with response error
            if (error.response) {
                error.response.handler = resHandler(error.response)
            }
            return Promise.reject(error);
        }
    );

    const resHandler = (res) => {
        var handler = { type: '', title: '', message: '', then: undefined }
        switch (res.status) {
            case 200:
                handler = {
                    code: 200,
                    type: 'success',
                    message: 'הצליח',
                    then: null
                };
                break;
            case 400:
                handler = {
                    type: 'error',
                    code: 400,
                    title: null,
                    message: 'לינק לא תקין או שפג תוקפו',
                    then: null
                };
                break;
            case 401:
            case 403:
                handler = {
                    type: 'error',
                    code: 403,
                    title: 'כשל באימות',
                    message: <p>לא הצלחנו לאמת את החשבון.<br />מפנים אותך למסך כניסה מחדש...</p>,
                    then: redirectToLogin
                };
                LoginCtx.setStatus(false);
                LoginCtx.setUser({})
                break;
            case 409:
                handler = {
                    type: 'error',
                    code: 409,
                    title: null,
                    message: translate[res.data],
                    then: null
                };
                break;
            case 500:
                handler = {
                    type: 'error',
                    cose: 500,
                    title: 'שגיאת שרת',
                    message: 'אירעה שגיאה בשרת. נסה שנית',
                    then: null
                };
                break;
            default:
                handler = {
                    type: 'error',
                    title: 'שגיאת לא ידועה',
                    message: 'אירעה שגיאה לא ידועה. אנא נסה שנית מאוחר יותר',
                    then: null
                };
                break;
        }
        return handler;
    }
};




export default SetupInterceptors;