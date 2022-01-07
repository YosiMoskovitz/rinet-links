import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button, Alert } from 'react-bootstrap'
import styles from '../layout/LoginContainer.module.css'

export function LoginForm({ onSubmit, loading, message, setMessage }) {
    const navigate = useNavigate()

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const onFormSubmit = (e) => {
        e.preventDefault();
        const email = emailInputRef.current.value.toLowerCase();
        const password = passwordInputRef.current.value;

        onSubmit && onSubmit({ email, password });

    }

    const handleChange = () => {
        setMessage &&
            setMessage(undefined)
    }

    const handleForgat = () => {
        navigate('/reset-password')
    }

    const handleRegister = () => {
        navigate('/signup')
    }

    return (
        <div className={styles.felids}>
            <h3 className={styles.title}>כניסה למערכת</h3>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>אימייל</Form.Label>
                    <Form.Control type="email" placeholder={`הכנס כתובת דוא"ל`} ref={emailInputRef} disabled={loading} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>סיסמא</Form.Label>
                    <Form.Control type="password" placeholder="הכנס סיסמה" ref={passwordInputRef} disabled={loading} onChange={handleChange} />
                </Form.Group>
                <div className={`d-grid gap-2 ${styles.loginBtn}`}>
                    <Button variant="primary" type="submit" onClick={onFormSubmit} disabled={loading} >כניסה</Button>
                </div>
                <Row className="mb-3">
                    <Col onClick={handleForgat}><span id="forgot" className={`badge smallBtn ${styles.badgeLight}`}>שכחתי סיסמה</span></Col>
                    <Col onClick={handleRegister}><span id="register" className={`badge smallBtn ${styles.badgeLight}`}>הרשם</span></Col>
                </Row>
            </Form>
            {message && message !== undefined ?
                <Alert variant="danger" style={{ marginTop: 20 }}>{message}</Alert>
                : null
            }
        </div>
    )
}
