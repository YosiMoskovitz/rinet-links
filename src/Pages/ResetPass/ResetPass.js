import React, { useState } from 'react';

import { ResetPassEmailReq } from '../../Api/LoginApi';
import { ResetPassForm } from '../../Components/ResetPassForm';

export function ResetPass() {
    const [msg, setMsg] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const SendEmailSubmit = (email) => {
        setIsLoading(true)
        ResetPassEmailReq(email).then((res)=> {
            setMsg(res)
            setIsLoading(false)
        })
 
    }
        return (
            <section >
                <ResetPassForm onSubmit={SendEmailSubmit} message={msg} setMessage={setMsg} loading={isLoading}/>
            </section>
        )

}