import React, { useState } from 'react';

import { SignupReq } from '../../Api/LoginApi';
import { SignupForm } from '../../Components/SignupForm';

export function Signup() {
    const [msg, setMsg] = useState(undefined);

    const SignupSubmit = async (user) => {
        console.log(user)
        const { email, firstName, lastName, password } = user;
        const res = await SignupReq({email, firstName, lastName, password});
        if (res.status === 'OK') {
            setMsg(res)
        }
        if (res.status === 'ERROR') {
            setMsg(res)
        }
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
            <SignupForm formSubmit={SignupSubmit} message={msg} setMessage={setMsg} />
        </section>
    )

}