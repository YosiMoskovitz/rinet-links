import React from 'react';
import { FormikForm, InputTextField } from '../FormikForm';
import { Button, Alert, Spinner } from 'react-bootstrap'
import * as Yup from 'yup';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import styles from '../layout/LoginContainer.module.css';
import translate from '../Utils/engToHeb.json';

export function ChangePassForm({ formSubmit, message, setMessage }) {

    const initialValues = {
        oldPassword: '',
        newPassword: '',
        passwordVer: ''
    }

    const schema = Yup.object({
        oldPassword: Yup.string().required(translate.requiredMsg),
        newPassword: Yup.string().min(8, translate.passLengthMsg).matches(
            //eslint-disable-next-line
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            translate.passValidMsg).required(translate.requiredMsg),
        passwordVer: Yup.string().oneOf([Yup.ref('newPassword'), null], 'סיסמאות לא זהות').required(translate.requiredMsg)
    })

    const Fields = ({ isSubmitting }) => {
        return (
            <>
                <InputTextField
                    label={`סיסמה ישנה:`}
                    name="oldPassword"
                    type='password'
                    disabled={isSubmitting}
                    placeholder="סיסמה ישנה"
                />
                <InputTextField
                    label={`סיסמה חדשה:`}
                    name="newPassword"
                    type='password'
                    disabled={isSubmitting}
                    placeholder="סיסמה חדשה"
                />
                <InputTextField
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
            </>
        )
    };

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
                    <FormikForm
                        initialValues={initialValues}
                        schema={schema}
                        formSubmit={formSubmit}
                        Fields={Fields}
                    >
                    </FormikForm>
                </div>
            }
        </>
    )
}
