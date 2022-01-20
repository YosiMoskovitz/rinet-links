import React, { useState } from 'react';

import { ChangePassReq } from '../../Api/LoginApi';
import { ChangePassForm } from '../../Components/ChangePassForm';

export function EditUser(user) {

    const [msg, setMsg] = useState(undefined);

    const EditUserSubmit = async (user) => {
        const res = await ChangePassReq(user);
        setMsg(res)
    }

    return (
        <section >
            <ChangePassForm formSubmit={EditUserSubmit} message={msg} setMessage={setMsg} />
        </section>
    )

}