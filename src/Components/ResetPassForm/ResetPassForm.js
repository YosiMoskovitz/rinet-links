import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import styles from '../layout/LoginContainer.module.css';

export function ResetPassForm({ onSubmit, loading, message, setMessage }) {
    const navigate = useNavigate()
    const emailInputRef = useRef();

    const onFormSubmit = (e) => {
        e.preventDefault();
        const email = emailInputRef.current.value;
        if (email === undefined || email === '' || email === null) {
            setMessage({
                type: 'req',
                status: 'error',
                data: 'אנא מלא את הפרטים'
            })
            return
        }
        onSubmit && onSubmit({ email });
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
                    <h3 className={styles.title}>איפוס סיסמה</h3>
                    <Form noValidate>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>אימייל</Form.Label>
                            <Form.Control type="email" placeholder={`הכנס כתובת דוא"ל`}  ref={emailInputRef} disabled={loading} onChange={handleChange} required/>
                        </Form.Group>
                        <div className={`d-grid gap-2 ${styles.loginBtn}`}>
                            <Button variant="primary" type="submit" onClick={onFormSubmit} disabled={loading} >שלח אימייל לאיפוס</Button>
                        </div>
                        <Row className="mb-3">
                            <Col onClick={handleLoginPage}><span id="login" className={`badge smallBtn ${styles.badgeLight}`}>חזרה למסך כניסה</span></Col>
                        </Row>
                    </Form>
                    {message && message.data !== undefined ?
                <Alert variant={message.status === 'OK' ? 'success' : 'danger'} style={{ marginTop: 20 }}>{message.data}</Alert> : null}
                </div>
            }
        </div>
    )
}
