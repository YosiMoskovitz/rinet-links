import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikForm, InputTextField } from '../FormikForm';
import { Row, Col, Button, Alert, Spinner } from 'react-bootstrap'
import * as Yup from 'yup';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import styles from '../layout/LoginContainer.module.css';
import translate from '../Utils/engToHeb.json'

export function ResetPassForm({ formSubmit, message }) {
    const navigate = useNavigate()

    const initialValues = {
        email: '',
    }

    const schema = Yup.object({
        email: Yup.string().email(translate.reqEmailMsg).required(translate.requiredMsg),
    });

    const handleLoginPage = () => {
        navigate('/login')
    }

    const Fields = ({ isSubmitting }) => {
        return (
            <>
                <InputTextField
                    label={`כתובת דוא"ל`}
                    type='email'
                    name="email"
                    placeholder={`הכנס כתובת דוא"ל`}
                    disabled={isSubmitting}
                />
                <div className={`form-group d-grid gap-2 mx-auto ${styles.saveBtn}`}>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>{isSubmitting ?
                        <div>אנא המתן... <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /></div>
                        : "שלח אימייל לאיפוס"}</Button>
                    <Row className="mb-3">
                        <Col onClick={handleLoginPage}><span id="login" className={`badge smallBtn ${styles.badgeLight}`}>חזרה למסך כניסה</span></Col>
                    </Row>
                    {message && message.data !== undefined && message.status !== 'OK' ?
                        <Alert variant={'danger'} style={{ marginTop: 20 }}>{<DangerousIcon color='danger' fontSize='large' />} {message.data}</Alert> : null}
                </div>
            </>
        )
    };

    return (
        <div className={styles.felids}>
            {message && message.data !== undefined && message.type === 'res' ?
                <div>
                    <Alert variant={message.status === 'OK' ? 'success' : 'danger'} style={{ marginTop: 20 }}>
                        {message.status === 'OK' ? <CheckCircleIcon color='success' fontSize='large' />
                            : <DangerousIcon color='danger' fontSize='large' />} {message.data}
                    </Alert>
                    <Row className="mb-3">
                        <Col onClick={() => navigate('/login')}><span id="login" className={`badge smallBtn ${styles.badgeLight}`}>חזרה למסך כניסה</span></Col>
                    </Row>
                </div>

                :
                <div>
                    <h3 className={styles.title}>איפוס סיסמה</h3>
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
            }
        </div>
    )
}
