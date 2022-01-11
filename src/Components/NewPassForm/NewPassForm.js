import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { Formik, useField } from 'formik';
import * as Yup from 'yup';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import styles from '../layout/LoginContainer.module.css';
import translate from '../Utils/engToHeb.json';

export function NewPassForm({ formSubmit, message, setMessage }) {
    const navigate = useNavigate()

    const InputField = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
            <Form.Group className="mb-3">
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    isInvalid={meta.touched && !!meta.error}
                    disabled={props.isSubmitting}
                    {...field} {...props}
                />
                <Form.Control.Feedback type="invalid">
                    {meta.error}
                </Form.Control.Feedback>
            </Form.Group>
        )
    }

    const schema = Yup.object({
        password: Yup.string().min(6, translate.passValidMsg).required(translate.requiredMsg),
        passwordVer: Yup.string().oneOf([Yup.ref('password'), null], 'סיסמאות לא זהות').required(translate.requiredMsg)
    })

    const handleLoginPage = () => {
        navigate('/login')
    }
console.log(message)
    return (
        <div className={styles.felids}>
            {message && message.data !== undefined && message.status === 'OK' ?
                <div>
                    <Alert variant={'success'} style={{ marginTop: 20 }} >
                        <div className='row align-items-center mb-2'>
                            <CheckCircleIcon color='success' fontSize='large' className='col' />
                        </div>
                        <div className='col align-items-center text-center'>
                            {message.data}
                        </div>
                    </Alert>
                    <Row className="mb-3">
                        <Col onClick={handleLoginPage}><span id="login" className={`badge smallBtn ${styles.badgeLight}`}>חזרה למסך כניסה</span></Col>
                    </Row>
                </div>
                :
                <div>
                    <h3 className={styles.title}>איפוס סיסמה</h3>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            password: '',
                            passwordVer: ''
                        }}
                        validationSchema={schema}
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            if (formSubmit) {
                                setSubmitting(true);
                                await formSubmit(values);
                                setSubmitting(false);

                            }
                        }}
                        validateOnBlur={false}
                    >
                        {({ isSubmitting, handleSubmit, handleChange, setFieldValue }) => (
                            <Form noValidate onSubmit={handleSubmit} onChange={handleChange}>
                                <InputField
                                    label={`סיסמה חדשה:`}
                                    name="password"
                                    type='password'
                                    disabled={isSubmitting}
                                    placeholder="סיסמה חדשה"
                                />
                                <InputField
                                    label={`הקלד שוב את הסיסמה:`}
                                    name="passwordVer"
                                    type='password'
                                    disabled={isSubmitting}
                                    placeholder="אימות סיסמה חדשה"
                                />
                                <div className={`form-group d-grid gap-2 mx-auto ${styles.saveBtn}`}>
                                    <Button variant="primary" type="submit" disabled={isSubmitting}>{isSubmitting ?
                                        <div>אנא המתן... <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /></div>
                                        : "אפס סיסמה"}</Button>
                                    <Row className="mb-3">
                                        <Col onClick={handleLoginPage}><span id="forgot" className={`badge smallBtn ${styles.badgeLight}`}>חזור למסך כניסה</span></Col>
                                    </Row>
                                    {message && message.data !== undefined && message.status !== 'OK' ?
                                        <Alert variant={'danger'} style={{ marginTop: 20 }}>{<DangerousIcon color='danger' fontSize='large' />} {message.data}</Alert> : null}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            }
        </div>
    )
}
