import React, { useState } from 'react';

import { SignupReq } from '../../Api/LoginApi';
import { SignupForm } from '../../Components/SignupForm';

export function Signup() {
    const [msg, setMsg] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const SignupSubmit = (user) => {
        const {email, firstName, lastName, password} = user;
        setIsLoading(true)
        SignupReq({email : email.toLowerCase(),
             firstName, lastName, password}).then((res)=> {
            if (res.status === 'OK'){
                setMsg(res)
            }
            if (res.status === 'ERROR') {
                setMsg(res)
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
            <section>
                <SignupForm formSubmit={SignupSubmit} loading={isLoading} message={msg}/>
            </section>
        )

}