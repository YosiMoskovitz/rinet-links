import { React, useContext, useState, useRef } from 'react'
import { Card } from 'react-bootstrap';
import styles from './Donate.module.css';
import { Formik } from 'formik'
import { InputTextField } from '../../Components/FormikForm';
import { Form, Button, Alert, Spinner } from 'react-bootstrap'
import * as Yup from 'yup';
import LoginContext from '../../store/Login-context'
import translate from '../../Components/Utils/engToHeb.json';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { APIconfig } from '../../Config';

// import { registerDonation } from '../../Api/DonationsApi'



export const Donate = () => {
    const userCTX = useContext(LoginContext);
    const [ResMessage, setResMessage] = useState(undefined);
    const [iframeHight, setIframeHight] = useState(0);

    const container = useRef();


    const NedarimIframe = () => (
        <iframe
            id='NedarimFrame'
            title="NedarimFrame"
            src="https://matara.pro/nedarimplus/iframe"
            ref={container}
            onLoad={() => nedarimComms({ 'Name': 'GetHeight' })}
            width={'100%'}
            height={iframeHight}
        />
    );

    const initialValues = {
        amount: '',
        tashlumim: '1',
        comment: ''
    }

    const schema = Yup.object({
        amount: Yup.number().required(translate.requiredMsg),
        tashlumim: Yup.number().required(translate.requiredMsg),
        comment: Yup.string().max(300)
    });


    const nedarimComms = (data) => new Promise((res, rej) => {
        var iframeWin = container.current.contentWindow;

        window.onmessage = (event) => {
            // channel.port1.close();
            var result = { type: '', message: '' }
            result.message = event.data?.Value?.Message;
            if (event.data.Value?.Status === 'Error') {
                result.type = 'error';
                rej(result);
            } else {
                result.type = 'ok';
                switch (event.data.Name) {
                    case 'Height':
                        const resHight = (parseInt(event.data.Value) + 15) + "px";
                        console.log(iframeHight)
                        container.current.height !== resHight && setIframeHight(resHight);
                        res(result);
                        break;
                    case 'TransactionResponse':
                        res(event.data.Value);
                        break;
                    default:
                        break;
                }

            }
        };

        iframeWin.postMessage(data, "*");
    });



    const Fields = ({ isSubmitting }) => {
        return (
            <>
                <InputTextField
                    label={`הערות:`}
                    name="comment"
                    type='text'
                    disabled={isSubmitting}
                />
                <InputTextField
                    label={`סכום לחיוב:`}
                    name="amount"
                    type='tel'
                    disabled={isSubmitting}
                />
                <InputTextField
                    label={`תשלומים:`}
                    name="tashlumim"
                    type='text'
                    disabled={isSubmitting}
                />
                <NedarimIframe />
                <div className={`form-group d-grid gap-2 mx-auto ${styles.saveBtn}`}>
                    <Button variant="outline-secondary" type="submit" disabled={isSubmitting}>{isSubmitting ?
                        <div>אנא המתן... <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" /></div>
                        : "בצע חיוב"}</Button>
                    {ResMessage && ResMessage.type === 'error' ?
                        <Alert variant={'danger'} style={{ marginTop: 20 }}>{<DangerousIcon color='danger' fontSize='large' />} {ResMessage.message}</Alert> : ResMessage && ResMessage.type !== 'error' ?
                            <Alert variant={'success'} style={{ marginTop: 20 }}>{<CheckCircleIcon color='success' fontSize='large' />} {'החיוב בוצע בהצלחה'}</Alert> : null}
                </div>
            </>
        )
    };

    const handelDonateClick = async (values) => {
        var res = nedarimComms({
            'Name': 'FinishTransaction2',
            'Value': {
                'Mosad': '0',
                'ApiValid': APIconfig.nedarimApiKey,
                'PaymentType': 'Ragil',
                'Currency': '1',

                'Zeout': userCTX.user.zeout ?? '',
                'FirstName': userCTX.user.firstName,
                'LastName': userCTX.user.lastName ?? '',
                'Street': userCTX.user.street ?? '',
                'City': userCTX.user.city ?? '',
                'Phone': userCTX.user.phone ?? '',
                'Mail': userCTX.user.email ?? '',

                'Amount': values.amount ?? '',
                'Tashlumim': values.tashlumim ?? '1',

                'Groupe': 'Rinet-Links',
                'Comment': values.comment ?? '',

                'Param1': values.amount,
                'Param2': '',
                'ForceUpdateMatching': '0', //מיועד לקמפיין אם מעוניינים שהמידע יידחף ליעד, למרות שזה לא נהוג באייפרם

                'CallBack': `https://rinet-links.herokuapp.com/donationes/new-donation/${userCTX.user.id}`,
                // 'Tokef': document.getElementById('Tokef').value //אם אתם מנהלים את התוקף בדף שלכם (מיועד למי שרוצה להפריד בין חודש לשנה ורוצה לעצב מותאם אישית)
            }  
        })
        // .then(async (res) => {
        //     return await registerDonation(userCTX.user.id, res);
        // })
        return res;
    }

    return (
        <div className={styles.container}>
            <Card className={`${styles.card}`}>
                <Card.Header>{'תרומה להחזקת המערכת'}</Card.Header>
                <Card.Body>
                    <Formik
                        enableReinitialize={true}
                        initialValues={initialValues}
                        validationSchema={schema}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            setSubmitting(true);
                            handelDonateClick(values).then((result) => {
                                setSubmitting(false);
                                setResMessage(result);
                            }).catch((error) => {
                                setSubmitting(false);
                                setResMessage(error);
                            });

                        }}
                        validateOnBlur={false}
                    >
                        {({ isSubmitting, handleSubmit, handleChange, setFieldValue }) => (
                            <Form noValidate onSubmit={handleSubmit} onChange={handleChange} className={styles.formFields}>
                                <Fields isSubmitting={isSubmitting} />
                            </Form>
                        )}
                    </Formik>
                </Card.Body>
            </Card>
        </div >
    )

}


