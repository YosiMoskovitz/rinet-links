import React, { useState, useEffect } from 'react';
import { Modal, ModalTitle, Alert } from 'react-bootstrap';
import styles from './ErrorModal.module.css'

export const ErrorModal = ({ title, message, onClose }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            handelClose();
        }, 3000);
    })

    const handelClose = () => {
        setShow(false);
        onClose && onClose();
    }

    return (
        <Modal show={show} onHide={handelClose}>
            <Modal.Header closeButton>
                <ModalTitle className={styles.modalTitle}>{title}</ModalTitle>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="danger">
                    <Alert.Heading>אוי, לא!</Alert.Heading>
                    {message}
                </Alert>
            </Modal.Body>
        </Modal>
    )
}