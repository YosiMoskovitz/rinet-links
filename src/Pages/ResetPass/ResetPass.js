import React, { useState } from 'react';

import { ResetPassEmailReq } from '../../Api/LoginApi';
import { ResetPassForm } from '../../Components/ResetPassForm';

export function ResetPass() {
    const [msg, setMsg] = useState(undefined);

    const SendEmailSubmit = async (email) => {
        const res = await ResetPassEmailReq(email);
        setMsg(res)

    }
        return (
            <section >
                <ResetPassForm formSubmit={SendEmailSubmit} message={msg}/>
            </section>
        )

}