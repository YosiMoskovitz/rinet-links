import React from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Formik, useField } from 'formik';
import * as Yup from 'yup';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import styles from '../layout/LoginContainer.module.css';
import translate from '../Utils/engToHeb.json';

export function ChangePassForm({ formSubmit, message, setMessage }) {
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
        oldPassword: Yup.string().required(translate.requiredMsg),
        newPassword: Yup.string().min(6, translate.passValidMsg).notOneOf([Yup.ref('oldPassword')], translate.oldPassMsg).required(translate.requiredMsg),
        passwordVer: Yup.string().oneOf([Yup.ref('newPassword'), null], 'סיסמאות לא זהות').required(translate.requiredMsg)
    })

    return (
        <>
            {message && message.data !== undefined && message.status === 'OK' ?
                <div className='align-items-center'>
                    <Alert variant={'success'} style={{ marginTop: 20 }} >
                        <div className='row mb-2'>
                            <CheckCircleIcon color='success' fontSize='large' className='col' />
                        </div>
                        <div className='col text-center'>
                            {message.data}
                        </div>
                    </Alert>
                </div>
                :
                <div>
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            oldPassword: '',
                            newPassword: '',
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
                                    label={`סיסמה ישנה:`}
                                    name="oldPassword"
                                    type='password'
                                    disabled={isSubmitting}
                                    placeholder="סיסמה ישנה"
                                />
                                <InputField
                                    label={`סיסמה חדשה:`}
                                    name="newPassword"
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
                                        : "שנה סיסמה"}</Button>
                                    {message && message.data !== undefined && message.status !== 'OK' ?
                                        <Alert variant={'danger'} style={{ marginTop: 20 }}>{<DangerousIcon color='danger' fontSize='large' />} {message.data}</Alert> : null}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            }
        </>
    )
}
