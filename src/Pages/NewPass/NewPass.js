import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { ResetPassTokenValid, NewPassReq } from '../../Api/LoginApi';
import { NewPassForm } from '../../Components/NewPassForm';
import { Loading } from '../Loading';

export function NewPass() {
    const { userId, token } = useParams();
    const navigate = useNavigate();

    const [msg, setMsg] = useState(undefined);
    const [renewalToken, setRenewalToken] = useState(undefined);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        if (!userId || !token) navigate('/reset-password')
        ResetPassTokenValid(userId, token).then((res) => {
            setRenewalToken(res.token);
            setMsg(res)
            setPageLoading(false)
        })
    }, [userId, token, navigate])

    const NewPassSubmit = async ({password}) => {
        const res = await NewPassReq(userId, renewalToken, password);
        setMsg(res)
    }

    if (pageLoading) {
        return (<Loading />);
    }

    return (
        <section >
            <NewPassForm formSubmit={NewPassSubmit} message={msg} setMessage={setMsg} />
        </section>
    )

}