import { React, useState, useContext } from 'react';
import { FormikForm, InputTextField, InputSelectField } from '../FormikForm';
import { Form, Button } from 'react-bootstrap'
import * as Yup from 'yup';
import LinksContext from '../../store/Links-context';
import { Upload } from '../Upload'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './LinkForm.module.css'
import translate from '../Utils/engToHeb.json'


export const LinkForm = ({ formSubmit, linkID }) => {
    const LinksCtx = useContext(LinksContext);
    const link = LinksCtx.links.find((link) => link._id === linkID)

    const [uploadFile, setUploadFile] = useState(linkID ? false : true);

    const initialValues = {
        _id: link?._id ?? null,
        title: link?.title ?? '',
        path: link?.path ?? '',
        categoryId: link?.categoryId ?? '',
        description: link?.description ?? ''
    }

    const schema = Yup.object({
        //ned to add a check if title name already exists
        title: Yup.string()
            .required(translate.requiredMsg),
        path: Yup.string()
            .url(translate.invalidUrlMsg)
            .required(translate.requiredMsg),
        categoryId: Yup.string().oneOf(LinksCtx.categories.map((category) => category._id), translate.invalidCategoryMsg).required(translate.requiredMsg),
        description: Yup.string(),
    });

    const Fields = ({setFieldValue, isSubmitting, submitRes}) => {
        return (
            <>
                <InputTextField
                    label="שם:"
                    name="title"
                    disabled={isSubmitting}
                />
                {uploadFile ?
                    <Upload setFormikVal={setFieldValue} disabled={isSubmitting}/>
                    : null
                }
                <div style={{
                    visibility: uploadFile ? "hidden" : "visible",
                    position: uploadFile ? "absolute" : "relative"
                }}>
                    <InputTextField
                        label="קישור:"
                        name="path"
                        disabled={isSubmitting}
                    />
                </div>
                <div>
                    <Form.Check type="radio" className='mb-3'>
                        <Form.Check.Input
                            type='checkbox'
                            name="selectLinkType"
                            checked={!uploadFile}
                            disabled={isSubmitting}
                            onChange={() => setUploadFile(!uploadFile)}
                        />
                        <Form.Check.Label className={styles.checkBoxLabel}>{"קישור לקובץ בענן"}</Form.Check.Label>
                    </Form.Check>
                </div>
                <InputSelectField name='categoryId'
                    label="קטגוריה:"
                    array={LinksCtx.categories}
                    disabled={isSubmitting}
                />
                <InputTextField
                    label="תיאור:"
                    name="description"
                    disabled={isSubmitting}
                />
                <div className={`form-group d-grid gap-2 mx-auto ${styles.saveBtn}`}>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? "אנא המתן..." : "שמור"}</Button>
                    {submitRes && submitRes.code !== 403 ? <p className={`d-flex justify-content-center alert ${styles.message} ${submitRes.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">{submitRes.message}</p> : null}
                </div>
            </>
        )
    }

    return (
        <>
            <FormikForm
                initialValues={initialValues}
                schema={schema}
                formSubmit={formSubmit}
                Fields={Fields}
            >
            </FormikForm>
        </>
    );
};