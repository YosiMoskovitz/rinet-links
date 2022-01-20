import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Alert } from 'react-bootstrap'
import DangerousIcon from '@mui/icons-material/Dangerous';
import styles from '../../Components/layout/LoginContainer.module.css';

import { ResetPassTokenValid, NewPassReq } from '../../Api/LoginApi';
import { NewPassForm } from '../../Components/NewPassForm';
import { Loading } from '../Loading';

export function NewPass() {
    const { userId, token } = useParams();
    const navigate = useNavigate();

    const [msg, setMsg] = useState(undefined);
    const [renewalToken, setRenewalToken] = useState(undefined);
    const [pageLoading, setPageLoading] = useState(true);
    const [isValid, setIsValid] = useState(true);

    useEffect(() => {
        if (!userId || !token) navigate('/reset-password')
        ResetPassTokenValid(userId, token).then((res) => {
            if (res.token){
                setRenewalToken(res.token);
                setMsg(res);
                setPageLoading(false);
            }
            else {
                setMsg(res);
                setPageLoading(false);
                setIsValid(false);
            }
        })
    }, [userId, token, navigate])

    const NewPassSubmit = async ({ password }) => {
        const res = await NewPassReq(userId, renewalToken, password);
        res.newPassMsg = true;
        setMsg(res)
    }

    if (pageLoading) {
        return (<Loading />);
    }

    if (!isValid) {

        setTimeout(() => {
            navigate('/login', { replace: true })
        }, 10000);

        return (
            <div className={styles.felids}>
                <Alert variant={'danger'} style={{ marginTop: 20 }} >
                    <div className='row align-items-center mb-2'>
                        <DangerousIcon color='danger' fontSize='large' className='col' />
                    </div>
                    <div className='col align-items-center text-center'>
                        {msg.data}
                    </div>
                </Alert>
            </div>
        )
    }

    return (
        <section >
            <NewPassForm formSubmit={NewPassSubmit} message={msg} setMessage={setMsg} />
        </section>
    )

}