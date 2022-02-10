import { React, useState } from 'react'
import { Button, ProgressBar } from 'react-bootstrap';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Axios from 'axios'
import { APIconfig } from '../../Config';

import { ErrorModal } from '../ErrorModal';

export function Upload({ setFormikVal }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [uploadProgress, setUploadProgress] = useState(0);
    const [file, setFile] = useState(undefined);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [errorHandler, setErrorHandler] = useState()

    const submitUpload = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const config = {
            onUploadProgress: (progressEvent) => {
                var percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted);
            },
        };

        let data = new FormData();
        data.append('file', file);

        Axios.post(`${APIconfig.url}/gdrive-upload/file`, data, config)
            .then((res) => {
                if (res.status === 200) {
                    setUploadSuccess(true);
                    setIsSubmitting(false);
                    setFormikVal && 
                    setFormikVal('path', res.data.link, { shouldValidate: true });
                }
                else console.log(res)
            })
            .catch((err) => {
                if (err.response.handler) {
                    setErrorHandler(err.response.handler)
                }
                else setErrorHandler(err.response)
            });
    };
    return (
        <div className="mb-3">
         {errorHandler !== undefined && errorHandler ? <ErrorModal title={errorHandler.title} message={errorHandler.message} onClose={errorHandler.then}/> : null}
            {!uploadSuccess ?
                isSubmitting ?
                    <div>
                        <p className="fw-bold">{uploadProgress !== 100 ? `מעלה קובץ ${uploadProgress}%` : 'שומר קובץ בשרת'}</p>
                        <ProgressBar animated now={uploadProgress} variant='success' />
                    </div>
                    : <div className="mb-3 row">
                        <label htmlFor="file" className="form-label">בחר קובץ להעלאה</label>
                        <div className="col">
                            <input type="file" className="form-control mb-3" name="file" onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <div className="col" style={{maxWidth: 'fit-content'}}>
                            <Button type="submit" variant="success" disabled={!file} onClick={submitUpload}>העלה קובץ</Button>
                        </div>
                    </div>

                : <div className="d-flex flex-row">
                    <CheckCircleIcon color='success' fontSize='large' />
                    <p className="fw-bold" variant='success'>הקובץ נשמר בהצלחה!</p>
                </div>
            }
        </div>
    )
}
