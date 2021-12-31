import { useRef } from 'react';
import { Form, Button, Alert } from 'react-bootstrap'
import styles from './LoginForm.module.css'

export function LoginForm({ onSubmit, loading, message, setMessage }) {
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const onFormSubmit = (e) => {
        e.preventDefault();
        const email = emailInputRef.current.value;
        const password = passwordInputRef.current.value;

        onSubmit && onSubmit({email, password});

    }

    const handleChange = () => {
        setMessage &&
        setMessage(undefined)
    }

    return (
        <div>
            <h3 className={styles.title}>כניסה למערכת</h3>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>אימייל</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" ref={emailInputRef} disabled={loading} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>סיסמא</Form.Label>
                    <Form.Control type="password" placeholder="Password" ref={passwordInputRef} disabled={loading} onChange={handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={onFormSubmit} disabled={loading} >
                    כניסה
                </Button>
            </Form>
            {message && message !== undefined ?
                  <Alert variant="danger" style={{marginTop: 20}}>{message}</Alert>
                : null
            }
        </div>
    )
}
