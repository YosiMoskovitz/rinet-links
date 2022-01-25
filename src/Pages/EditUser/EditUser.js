import React, { useState, useEffect } from 'react';

import { EditUserReq, EditUserAdminReq } from '../../Api/LoginApi';
import { EditUserForm } from '../../Components/EditUserForm';

export function EditUser({user}) {

    const [msg, setMsg] = useState(undefined);
    const [editFunc, setEditFunc] = useState(undefined);

    useEffect(() => {
        if (user.role.title === 'admin') {
            setEditFunc(()=> EditUserAdminReq);
        }
        else setEditFunc(()=> EditUserReq);
    }, [user])

    const EditUserSubmit = async (user) => {
        const res = await editFunc(user);
        setMsg(res)
    }
    return (
        <section >
            <EditUserForm formSubmit={EditUserSubmit} message={msg} user={user} />
        </section>
    )

}