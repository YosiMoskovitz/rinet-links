import { React } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikForm, InputTextField } from '../FormikForm';
import { Row, Col, Button, Alert, Spinner } from 'react-bootstrap'
import * as Yup from 'yup';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';

import translate from '../Utils/engToHeb.json'
import styles from '../layout/LoginContainer.module.css'

export function LoginForm({ formSubmit, message }) {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    }

    const schema = Yup.object({
        email: Yup.string().email(translate.reqEmailMsg).required(translate.requiredMsg),
        password: Yup.string().required(translate.requiredMsg),
    });


    const Fields = ({ isSubmitting }) => {
        return (
            <>
                <InputTextField
                    label={`כתובת דוא"ל:`}
                    type='email'
                    name="email"
                    placeholder={`הכנס כתובת דוא"ל`}
                    disabled={isSubmitting}
                />
                <InputTextField
                    label={`סיסמה:`}
                    name="password"
                    type='password'
                    placeholder={`הכנס סיסמה`}
                    disabled={isSubmitting}
                />
                <div className={`form-group d-grid gap-2 mx-auto ${styles.saveBtn}`}>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>{isSubmitting ?
                        <div>אנא המתן... <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /></div>
                        : "כניסה"}</Button>
                    <Row className="mb-3">
                        <Col onClick={handleForgat}><span id="forgot" className={`badge smallBtn ${styles.badgeLight}`}>שכחתי סיסמה</span></Col>
                        <Col onClick={handleRegister}><span id="register" className={`badge smallBtn ${styles.badgeLight}`}>הרשם</span></Col>
                    </Row>
                    {message && message.data !== undefined && message.status !== 'OK' ?
                        <Alert variant={'danger'} style={{ marginTop: 20 }}>{<DangerousIcon color='danger' fontSize='large' />} {message.data}</Alert> : null}
                </div>
            </>
        )
    };

    const handleForgat = () => {
        navigate('/reset-password')
    };

    const handleRegister = () => {
        navigate('/signup')
    };


    return (
        <div className={styles.felids}>
            <h3 className={styles.title}>כניסה למערכת</h3>
            <FormikForm
                initialValues={initialValues}
                schema={schema}
                formSubmit={formSubmit}
                Fields={Fields}
            >
            </FormikForm>
            {message && message !== undefined ?
                <Alert variant="danger" style={{ marginTop: 20 }}>{message}</Alert>
                : null
            }
        </div>
    )
}
