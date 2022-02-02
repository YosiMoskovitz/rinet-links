import React, { useState, useEffect, useContext } from 'react';
import { FormikForm, InputTextField, InputSelectField } from '../FormikForm';
import { Button, Alert, Spinner } from 'react-bootstrap'
import * as Yup from 'yup';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import LoginContext from '../../store/Login-context'

import Axios from 'axios';
import { APIconfig } from '../../Config';

import styles from '../layout/LoginContainer.module.css';
import translate from '../Utils/engToHeb.json';

export function EditUserForm(props) {
    const userCTX = useContext(LoginContext);
    var user = props.user
    if (user === undefined) {
        user = props.data.find((user) => user.id === props.id)
    }
    const isAdmin = (userCTX.user.role.title === 'admin');

    const [status, setStatus] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        if (isAdmin) {
            Axios.get(`${APIconfig.url}/roles`)
                .then((res) => setRoles(res.data.roles))
                .then(() => {
                    Axios.get(`${APIconfig.url}/statuses`).then((res) => setStatus(res.data.statuses));
                });
        }
    }, [isAdmin]);

    var initialValues = {
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
        zeout: user?.zeout ?? '',
        country: user?.country ?? '',
        city: user?.city ?? '',
        street: user?.street ?? '',
        phone: user?.phone ?? '',
    }

    var schemaObj = {
        firstName: Yup.string().required(translate.requiredMsg),
        lastName: Yup.string().required(translate.requiredMsg),
        zeout: Yup.string().min(9),
        country: Yup.string(),
        city: Yup.string(),
        street: Yup.string(),
        phone: Yup.string().max(20),
    }


    if (isAdmin) {
        initialValues = {
            ...initialValues,
            email: user?.email ?? null,
            userId: user?.id ?? null,
            role: user?.role.id ?? user?.role ?? '',
            status: user?.status.id ?? user?.status ?? '',
        };

        schemaObj = {
            ...schemaObj,
            email: Yup.string().email(translate.reqEmailMsg).required(translate.requiredMsg),
            role: Yup.string().required(translate.requiredMsg),
            status: Yup.string().required(translate.requiredMsg)
        }
    }

    const schema = Yup.object(schemaObj);

    const Fields = ({ isSubmitting, submitRes }) => {
        return (
            <>
                <InputTextField
                    label={`כתובת דוא"ל:`}
                    type='email'
                    name="email"
                    disabled={props.user || isSubmitting}
                    placeholder={`כתובת דוא"ל`}
                />
                <InputTextField
                    label={`שם פרטי:`}
                    name="firstName"
                    disabled={isSubmitting}
                    placeholder="שם פרטי"
                />
                <InputTextField
                    label={`שם משפחה:`}
                    name="lastName"
                    disabled={isSubmitting}
                    placeholder="שם משפחה"
                />
                <InputTextField
                    label={`תעודת זהות:`}
                    name="zeout"
                    type='tel'
                    disabled={isSubmitting}
                    placeholder={'אופציונלי'}
                />
                <InputTextField
                    label={`מדינה:`}
                    name="country"
                    type='text'
                    disabled={isSubmitting}
                    placeholder={'אופציונלי'}
                />
                <InputTextField
                    label={`עיר:`}
                    name="city"
                    type='text'
                    disabled={isSubmitting}
                    placeholder={'אופציונלי'}
                />
                <InputTextField
                    label={`כתובת:`}
                    name="street"
                    type='text'
                    disabled={isSubmitting}
                    placeholder={'אופציונלי'}
                />
                <InputTextField
                    label={`טלפון:`}
                    name="phone"
                    type='tel'
                    disabled={isSubmitting}
                    placeholder={'אופציונלי'}
                />
                {isAdmin ?
                    <>
                        <InputSelectField
                            label={`הרשאות:`}
                            name="role"
                            array={roles}
                            disabled={isSubmitting}
                        />
                        <InputSelectField
                            label={`סטטוס:`}
                            name="status"
                            array={status}
                            disabled={isSubmitting}
                        />
                    </> : null
                }
                <div className={`form-group d-grid gap-2 mx-auto ${styles.saveBtn}`}>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>{isSubmitting ?
                        <div>אנא המתן... <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /></div>
                        : "שמור"}</Button>
                    {submitRes && submitRes.status === 'ERROR' ?
                        <Alert variant={'danger'} style={{ marginTop: 20 }}>{<DangerousIcon color='danger' fontSize='large' />} {submitRes.data}</Alert> : null}
                    {submitRes && submitRes.status === 'OK' ?
                        <Alert variant={'success'} style={{ marginTop: 20 }}>{<CheckCircleIcon color='success' fontSize='large' />} {submitRes.data}</Alert> : null}
                </div>
            </>
        )
    };

    return (
        <>
            {props.message && props.message.data !== undefined && props.message.status === 'OK' ?
                <div className='align-items-center'>
                    <Alert variant={'success'} style={{ marginTop: 20 }} >
                        <div className='row mb-2'>
                            <CheckCircleIcon color='success' fontSize='large' className='col' />
                        </div>
                        <div className='col text-center'>
                            {props.message.data}
                        </div>
                    </Alert>
                </div>
                :
                <div>
                    <FormikForm
                        initialValues={initialValues}
                        schema={schema}
                        formSubmit={props.formSubmit}
                        Fields={Fields}
                    >
                    </FormikForm>
                </div>
            }
        </>
    )
}
