import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { accountTokenValid } from '../../Api/LoginApi';
import { Loading } from '../Loading';

import { Alert, Row, Col, } from 'react-bootstrap'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import styles from '../../Components/layout/LoginContainer.module.css';

export function AccountVeri() {
    const { userId, token } = useParams();
    const navigate = useNavigate();

    const [msg, setMsg] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!userId || !token) navigate('/login')
        accountTokenValid(userId, token).then((res) => {
            setMsg(res)
            setIsLoading(false)
        })
    }, [userId, token, navigate])

    if (isLoading) {
        return (<Loading />);
    }

    return (
        <div className={styles.felids}>
            <Alert variant={msg.status === 'OK' ? 'success' : 'danger'} style={{ marginTop: 20 }}>
                {msg.status === 'OK' ? <CheckCircleIcon color='success' fontSize='large' />
                    : <DangerousIcon color='danger' fontSize='large' />} {msg.data}
            </Alert>
            <Row className="mb-3">
                <Col onClick={()=> navigate('/login')}><span id="login" className={`badge smallBtn ${styles.badgeLight}`}>חזרה למסך כניסה</span></Col>
            </Row>
        </div>
    )

}