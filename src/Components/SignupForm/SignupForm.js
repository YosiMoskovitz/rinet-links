import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikForm, InputTextField, ReCAPTCHAField } from '../FormikForm';
import { Row, Col, Button, Alert, Spinner } from 'react-bootstrap'
import * as Yup from 'yup';
import styles from '../layout/LoginContainer.module.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import translate from '../Utils/engToHeb.json'


export function SignupForm({ formSubmit, message }) {
    const navigate = useNavigate();
    //keep track if reCaptcha has ben validated
    const [isCaptcha, setIsCaptcha] = useState(false);
    const [initialValues, setInitValues] = useState({
        email: '',
        firstName: '',
        lastName: '',
        zeout: '',
        country: '',
        city: '',
        street: '',
        phone: '',
        password: '',
        passwordVer: '',
        reCaptcha: false
    });

    //update initValues to not require a reCaptcha if past once
    useEffect(()=> {
        setInitValues((prev)=> {
            return {...prev, reCaptcha: isCaptcha};
        })
    }, [isCaptcha])

    const handleLoginPage = () => {
        navigate('/login')
    }

    const schema = Yup.object({
        email: Yup.string().email(translate.reqEmailMsg).required(translate.requiredMsg),
        firstName: Yup.string().required(translate.requiredMsg),
        lastName: Yup.string().required(translate.requiredMsg),
        zeout: Yup.number().min(9).positive().integer(),
        country: Yup.string().max(100),
        city: Yup.string().max(100),
        street: Yup.string().max(100),
        phone: Yup.string().max(20),
        password: Yup.string().min(8, translate.passLengthMsg).matches(
            //eslint-disable-next-line
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            translate.passValidMsg).required(translate.requiredMsg),
        passwordVer: Yup.string().oneOf([Yup.ref('password'), null], translate.passwordsVerMsg).required(translate.requiredMsg),
        reCaptcha: Yup.boolean().oneOf([true], translate.reCaptchaMsg).required(translate.reCaptchaMsg).default(isCaptcha)
    });

    const Fields = ({ isSubmitting, setFieldValue, submitRes }) => {
        return (
            <>
                <InputTextField
                    label={`כתובת דוא"ל:`}
                    type='email'
                    name="email"
                    disabled={isSubmitting}
                />
                <div className="row">
                    <div className='col'>
                        <InputTextField
                            label={`שם פרטי:`}
                            name="firstName"
                            type='text'
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className='col'>
                        <InputTextField
                            label={`שם משפחה:`}
                            name="lastName"
                            type='text'
                            disabled={isSubmitting}
                        />
                    </div>

                </div>
                <div className="row">
                    <div className='col'>
                        <InputTextField
                            label={`סיסמה:`}
                            name="password"
                            type='password'
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className='col'>
                        <InputTextField
                            label={`הקלד שוב את הסיסמה:`}
                            name="passwordVer"
                            type='password'
                            disabled={isSubmitting}
                        />
                    </div>
                </div>
                <div className='bg-light rounded mb-3 p-2'>
                    <div className='mb-3 d-flex justify-content-center'><span className='text-primary'>מידע אופציונלי - לא חובה</span></div>
                    <div className='row'>
                        <div className='col'>
                            <InputTextField
                                label={`טלפון:`}
                                name="phone"
                                type='tel'
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className='col'>
                            <InputTextField
                                label={`כתובת:`}
                                name="street"
                                type='text'
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <InputTextField
                                label={`עיר:`}
                                name="city"
                                type='text'
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className='col'>
                            <InputTextField
                                label={`מדינה:`}
                                name="country"
                                type='text'
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>
                    <InputTextField
                        label={`תעודת זהות:`}
                        name="zeout"
                        type='tel'
                        disabled={isSubmitting}
                    />
                </div>
                <ReCAPTCHAField
                    name="reCaptcha"
                    setValue={setFieldValue}
                    setState={setIsCaptcha}
                    show={!initialValues.reCaptcha}
                />
                <div className={`form-group d-grid gap-2 mx-auto ${styles.saveBtn}`}>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>{isSubmitting ?
                        <div>אנא המתן... <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /></div>
                        : "הרשמה"}</Button>
                    <Row className="mb-3">
                        <Col onClick={handleLoginPage}><span id="forgot" className={`badge smallBtn ${styles.badgeLight}`}>כבר רשום?</span></Col>
                    </Row>
                    {message && message.data !== undefined && message.status !== 'OK' ?
                        <Alert variant={'danger'} style={{ marginTop: 20 }}>{<DangerousIcon color='danger' fontSize='large' />} {message.data}</Alert> : null}
                </div>
            </>
        )
    }


    return (
        <div className={styles.felids} style={{ marginTop: '10vh' }}>
            {message && message.data !== undefined && message.status === 'OK' ?
                <div>
                    <Alert variant={'success'} style={{ marginTop: 20 }} >
                        <div className='row align-items-center mb-2'>
                            <CheckCircleIcon color='success' fontSize='large' className='col' />
                        </div>
                        <div className='col text-center'>
                            {message.data}
                        </div>
                    </Alert>
                    <Row className="mb-3">
                        <Col onClick={handleLoginPage}><span id="login" className={`badge smallBtn ${styles.badgeLight}`}>חזרה למסך כניסה</span></Col>
                    </Row>
                </div>
                :
                <div>
                    <h3 className={styles.title}>הרשמה למערכת</h3>
                    <FormikForm
                        initialValues={initialValues}
                        schema={schema}
                        formSubmit={formSubmit}
                        Fields={Fields}
                    >
                    </FormikForm>
                </div>
            }
        </div>
    )
}