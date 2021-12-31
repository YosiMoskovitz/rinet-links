import { React } from 'react';
import Axios from 'axios'
import { APIconfig } from '../../../Config'

import styles from './AddLink.module.css'
import { FormikLinkForm } from '../../../Components/LinkForm';

export function AddLink() {

    const LinkSubmit = (newLink) => {
        var result = Axios.post(`${APIconfig.url}/links `, newLink)
            .then((res) => {
                if (res.status === 401) return { type: 'error', message: 'לא מורשה' }
                if (res.status === 200) {
                    return { type: 'success', message: 'הלינק נשמר בהצלחה!' }
                } 
                else return { type: 'error', message: 'שגיאת שרת...' }
            })
        return result
    }
    return (

        <div className={`container ${styles.container}`}>
            <div className="form-wrapper">
                <h4 className={styles.title}>הוסף קישור</h4>
                <FormikLinkForm formSubmit={LinkSubmit} /> 
            </div>
        </div>
        // {/* <div className={styles.container}> */}
        //     {/* <LinkForm onSubmit={LinkSubmit}/> */}

        // </div>
    )
}

