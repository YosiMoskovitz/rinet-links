import React, { useState } from 'react';

import { ChangePassReq } from '../../Api/LoginApi';
import { ChangePassForm } from '../../Components/ChangePassForm';

export function ChangePass() {

    const [msg, setMsg] = useState(undefined);

    const ChangePassSubmit = async ({oldPassword, newPassword}) => {
        const res = await ChangePassReq(oldPassword, newPassword);
        setMsg(res)
    }

    return (
        <section >
            <ChangePassForm formSubmit={ChangePassSubmit} message={msg} setMessage={setMsg} />
        </section>
    )

}