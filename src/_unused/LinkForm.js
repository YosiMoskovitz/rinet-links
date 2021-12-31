import { React, useState, useEffect } from 'react';
import Axios from 'axios'
import { APIconfig } from '../Config'
import { Form, Button } from 'react-bootstrap'
import styles from './LinkForm.module.css'

export function LinkForm({ onSubmit, linkID }) {

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const [categoriesList, setCategoriesList] = useState([]);

    const [newTitle, setNewTitle] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newPath, setNewPath] = useState('');
    const [newDesc, setNewDesc] = useState('');

    useEffect(() => {
        Axios.get(`${APIconfig.url}/categories `)
            .then((res) => {
                setCategoriesList(res.data.categories);
            })
    }, []);

    useEffect(() => {
        if (linkID) {
            Axios.get(`${APIconfig.url}/links/link/${linkID} `)
                .then((res) => {
                    const linkObj = res.data.Link;
                    setNewTitle(linkObj.title);
                    setNewCategory(linkObj.categoryId);
                    setNewPath(linkObj.path);
                    setNewDesc(linkObj.description);
                })
        }

    }, [linkID]);

    const onFormSubmit = (e) => {
        // const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        // console.log(form.checkValidity())
        // if (form.checkValidity() === false){


        // }
        // setValidated(true);
        setIsLoading(true);
        if (onSubmit) {
            onSubmit({ title: newTitle, path: newPath, categoryId: newCategory, description: newDesc }).then((result) => {
                setMessage(result)
            }).then(setIsLoading(false))
        }
        else {
            setMessage({ type: 'error', message: 'NO_FUNCTION_FOUND' })
            setIsLoading(false)
        }
    }
    return (
        <div className={styles.container}>
            <h3 className={styles.title}>הוסף קישור</h3>
            <Form noValidate >
                <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>שם :</Form.Label>
                    <Form.Control type="text" placeholder="" disabled={isLoading} onChange={(e) => setNewTitle(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGridState">
                    <Form.Label>קטגוריה</Form.Label>
                    <Form.Select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} disabled={isLoading} required>
                        <option>בחר:</option>
                        {categoriesList.map((category, i) => (
                            <option
                                key={i}
                                value={category._id}
                            >
                                {category.title}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        בחר קטגוריה מהרשימה.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPath">
                    <Form.Label>קישור:</Form.Label>
                    <Form.Control type="text" placeholder="" disabled={isLoading} onChange={(e) => setNewPath(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDesc">
                    <Form.Label>תיאור:</Form.Label>
                    <Form.Control type="text" placeholder="" disabled={isLoading} onChange={(e) => setNewDesc(e.target.value)} required />
                </Form.Group>
                <div className={`form-group d-grid gap-2 col-5 mx-auto ${styles.saveBtn}`}>
                    <Button variant="primary" type="submit" onClick={onFormSubmit} disabled={isLoading} >
                        שמור
                    </Button>
                    {message ? <p className={`${styles.message} ${message.type === 'success' ? styles.success : styles.error}`}>{message.message}</p> : null}
                </div>
            </Form>
        </div>
    )
}

