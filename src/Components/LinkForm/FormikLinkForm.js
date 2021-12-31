import { React, useState, useContext } from 'react';
import { Formik, useField } from 'formik';
import { Form, Button } from 'react-bootstrap'
import * as Yup from 'yup';
import LinksContext from '../../store/Links-context';
import { Upload } from '../Upload'
import { ErrorModal } from '../ErrorModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './LinkForm.module.css'


export const FormikLinkForm = ({ formSubmit, linkID }) => {
    const requiredMsg = 'שדה נדרש';
    const invalidUrlMsg = 'הכנס קישור תקין';
    const invalidCategoryMsg = 'בחר קטגוריה מהרשימה';

    const LinksCtx = useContext(LinksContext);
    const link = LinksCtx.links.find((link) => link._id === linkID)

    const [submitRes, setSubmitRes] = useState(null);
    const [uploadFile, setUploadFile] = useState(linkID ? false : true);

    const InputField = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
            <Form.Group className="mb-3">
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    type="text"
                    isInvalid={!!meta.error}
                    // isValid={meta.touched && !meta.error}
                    disabled={props.isSubmitting}
                    {...field} {...props}
                />
                {/* <Form.Control.Feedback></Form.Control.Feedback> */}
                <Form.Control.Feedback type="invalid">
                    {meta.error}
                </Form.Control.Feedback>
            </Form.Group>
        )
    }

    const CategorySelectField = ({ ...props }) => {
        const [field, meta] = useField(props);
        return (
            <Form.Group className="mb-3" controlId="formGridState">
                <Form.Label>קטגוריה:</Form.Label>
                <Form.Select
                    isInvalid={!!meta.error}
                    disabled={props.isSubmitting}
                    // isValid={meta.touched && !meta.error}
                    {...field} {...props}>
                    <option>בחר:</option>
                    {LinksCtx.categories.map((category, i) => (
                        <option
                            key={i}
                            value={category._id}
                        >
                            {category.title}
                        </option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {meta.error}
                </Form.Control.Feedback>
            </Form.Group>
        );
    };

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    _id: link?._id ?? null,
                    title: link?.title ?? '',
                    path: link?.path ?? '',
                    categoryId: link?.categoryId ?? '',
                    description: link?.description ?? ''
                }}
                validationSchema={Yup.object({
                    //ned to add a check if title name already exists
                    title: Yup.string()
                        .required(requiredMsg),
                    path: Yup.string()
                        .url(invalidUrlMsg)
                        .required(requiredMsg),
                    categoryId: Yup.string().oneOf(LinksCtx.categories.map((category) => category._id), invalidCategoryMsg).required(requiredMsg),
                    description: Yup.string(),
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    if (formSubmit) {
                        setSubmitting(true);
                        formSubmit(values).then((result) => {
                            setSubmitRes(result.handler)
                        })
                            .then(() => {
                                setSubmitting(false);
                            })
                    }
                }}
                validateOnChange={false}
                validateOnBlur={false}
            >
                {({ isSubmitting, handleSubmit, handleChange, setFieldValue }) => (
                    <Form noValidate onSubmit={handleSubmit} onChange={handleChange}>
                        <InputField
                            label="שם:"
                            name="title"
                        />
                        {uploadFile ?
                            <Upload setFormikVal={setFieldValue} />
                            : null
                        }
                        <div style={{
                            visibility: uploadFile ? "hidden" : "visible",
                            position: uploadFile ? "absolute" : "relative"
                        }}>
                            <InputField
                                label="קישור:"
                                name="path"
                            />
                        </div>
                        <div>
                            <Form.Check type="radio" className='mb-3'>
                                <Form.Check.Input
                                    type='checkbox'
                                    name="selectLinkType"
                                    checked={!uploadFile}
                                    onChange={() => setUploadFile(!uploadFile)}
                                />
                                <Form.Check.Label className={styles.checkBoxLabel}>{"קישור לקובץ בענן"}</Form.Check.Label>
                            </Form.Check>
                        </div>
                        <CategorySelectField name='categoryId' />
                        <InputField
                            label="תיאור:"
                            name="description"
                        />
                        <div className={`form-group d-grid gap-2 mx-auto ${styles.saveBtn}`}>
                            <Button variant="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "אנא המתן..." : "שמור"}</Button>
                            {submitRes  && submitRes.code !== 403 ? <p className={`d-flex justify-content-center alert ${styles.message} ${submitRes.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">{submitRes.message}</p> : null}
                        </div>
                    </Form>
                )}
            </Formik>
            {submitRes && submitRes.type === 'error' ? <ErrorModal title={submitRes.title} message={submitRes.message} onClose={submitRes.then} /> : null}
        </>
    );
};