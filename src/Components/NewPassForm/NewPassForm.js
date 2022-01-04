import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import styles from '../layout/LoginContainer.module.css';

export function NewPassForm({ onSubmit, loading, message, setMessage }) {
    const navigate = useNavigate()
    const newPassRef = useRef();
    const newPassVerRef = useRef();

    const onFormSubmit = (e) => {
        e.preventDefault();
        const newPassword = newPassRef.current.value;
        const newPasswordVerify = newPassVerRef.current.value;

        if (newPasswordVerify !== newPassword) {
            setMessage({
                status: 'error',
                data: 'סיסמאות לא תואמות'
            })
            return
        }

        onSubmit && onSubmit(newPassword);
    }

    const handleChange = () => {
        setMessage &&
            setMessage(undefined)
    }

    const handleLoginPage = () => {
        navigate('/login')
    }


    return (
        <div className={styles.felids}>
            {message && message.data !== undefined && message.type === 'res' ?
                <Alert variant={message.status === 'OK' ? 'success' : 'danger'} style={{ marginTop: 20 }}>
                    {message.status === 'OK' ? <CheckCircleIcon color='success' fontSize='large' />
                    : <DangerousIcon color='danger' fontSize='large' />} {message.data}
                </Alert>
                :
                <div>
                    <h3 className={styles.title}>שנה סיסמה</h3>
                    <Form>
                        <Form.Group className="mb-3" controlId="newPassword">
                            <Form.Label>סיסמה חדשה</Form.Label>
                            <Form.Control type="password" placeholder="הכנס סיסמה חדשה" ref={newPassRef} disabled={loading} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="verifyNewPassword">
                            <Form.Label>אמת את הסיסמה חדשה</Form.Label>
                            <Form.Control type="password" placeholder="הכנס את הסיסמה חדשה שוב" ref={newPassVerRef} disabled={loading} onChange={handleChange} />
                        </Form.Group>
                        <div className={`d-grid gap-2 ${styles.loginBtn}`}>
                            <Button variant="primary" type="submit" onClick={onFormSubmit} disabled={loading} >שלח</Button>
                        </div>
                        <Row className="mb-3">
                            <Col onClick={handleLoginPage}><span id="login" className={`badge smallBtn ${styles.badgeLight}`}>כניסה למערכת</span></Col>
                        </Row>
                    </Form>
                </div>
            }
        </div>
    )
}
