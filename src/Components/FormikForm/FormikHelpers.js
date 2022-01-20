import React from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap'

export const InputTextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type="text"
                isInvalid={!!meta.error}
                //disabling dose not work here so i had to do it it manually for every instance 
                // disabled={props.isSubmitting}
                // isValid={meta.touched && !meta.error}
                {...field} {...props}
            />
            {/* <Form.Control.Feedback></Form.Control.Feedback> */}
            <Form.Control.Feedback type="invalid">
                {meta.error}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export  const InputSelectField = ({label, array, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <Form.Group className="mb-3" controlId="formGridState">
            <Form.Label>{label}</Form.Label>
            <Form.Select
                isInvalid={!!meta.error}
                //disabling dose not work here so i had to do it it manually for every instance 
                // disabled={props.isSubmitting}
                // isValid={meta.touched && !meta.error}
                {...field} {...props}>
                <option>בחר:</option>
                {array.map((item, i) => (
                    <option
                        key={i}
                        value={item._id}
                    >
                        {item.title}
                    </option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                {meta.error}
            </Form.Control.Feedback>
        </Form.Group>
    );
};
