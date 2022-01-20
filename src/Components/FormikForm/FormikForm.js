import { React, useState } from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap'
import { ErrorModal } from '../ErrorModal';

export const FormikForm = ({ initialValues, schema, Fields, formSubmit }) => {

    const [submitRes, setSubmitRes] = useState(null);

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    if (formSubmit) {
                        setSubmitting(true);
                        formSubmit(values).then((result) => {
                            setSubmitRes(result)
                        }).then(() => {
                            setSubmitting(false);
                        })
                    }
                }}
                validateOnBlur={false}
            >
                {({ isSubmitting, handleSubmit, handleChange, setFieldValue }) => (
                    <Form noValidate onSubmit={handleSubmit} onChange={handleChange}>
                        <Fields isSubmitting={isSubmitting} setFieldValue={setFieldValue} submitRes={submitRes}/>
                    </Form>
                )}
            </Formik>
            {submitRes && submitRes.type === 'error' ? <ErrorModal title={submitRes.title} message={submitRes.message} onClose={submitRes.then} /> : null}
        </>
    );
};