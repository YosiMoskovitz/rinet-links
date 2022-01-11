import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, ModalTitle, CloseButton, Alert, Spinner } from 'react-bootstrap';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { ChangePass } from '../../Pages/ChangePass';
// import { EditUser } from '../../Pages/EditUser';

import styles from './Modals.module.css'

export const Modals = ({ type, title, show, setShow, func }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(undefined);
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const navigate = useNavigate()

    const DeleteModal = () => {
        return (
            <div>
                {!message || message.data === undefined || message.status !== 'OK' ?
                    <div>
                        {isLoading ?
                            <div className={`d-flex justify-content-center ${styles.deleteContainer}`}>
                                <Button variant='warning' size="lg" disabled>
                                    <div>אנא המתן...  <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /></div>
                                </Button>
                            </div>
                            :
                            <div className={`d-flex justify-content-center ${styles.deleteContainer}`}>
                                <Button variant='danger' size="lg" onClick={handleDelete} className={styles.deleteBtns}>{'מחק'}</Button>
                                <Button variant='secondary' size="lg" onClick={handelClose} className={styles.deleteBtns}>{'ביטול'}</Button>
                            </div>
                        }
                    </div>
                    :
                    <Alert variant={message.status === 'OK' ? 'success' : 'danger'}>
                        {message.status === 'OK' ? <CheckCircleIcon color='success' fontSize='large' />
                            : <DangerousIcon color='danger' fontSize='large' />} {message.data}
                    </Alert>}
            </div>
        )
    }

    const handelClose = () => {
        setShow(false);
        if (shouldNavigate) navigate('/login', { replace: true })
    };

    const handleDelete = async () => {
        setIsLoading(true);
        const res = await func();
        setMessage(res);
        if (message.status === 'OK') setShouldNavigate(true);
        setIsLoading(false);
    }

    const getModal = (type) => {
        switch (type) {
            case 'changePass':
                return <ChangePass />
            case 'editUser':
                return <ChangePass formSubmit={func} />
            case 'delete':
                return <DeleteModal />
            default:
                break;
        }
    }

    return (
        <Modal show={show} onHide={handelClose}>
            <Modal.Header>
                <ModalTitle>{title}</ModalTitle>
                <CloseButton className={styles.closeButton} onClick={handelClose} />
            </Modal.Header>
            <Modal.Body>
                {getModal(type)}
                <Modal.Footer className="d-flex justify-content-start"></Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}

