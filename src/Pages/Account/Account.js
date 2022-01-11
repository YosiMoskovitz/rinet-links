import { React, useContext, useState } from 'react'
import { Card, ListGroup, } from 'react-bootstrap';
import styles from './Account.module.css';
import { Button } from 'react-bootstrap';

import { Modals } from '../../Components/Modals';
import LoginContext from '../../store/Login-context'
import translate from '../../Components/Utils/engToHeb.json';
import { DeleteUserReq, ChangePassReq } from '../../Api/LoginApi'

//helper functions
const getFormattedDate = (date) => {
    const dateParam = new Date(date)
    const setDateFormat = { year: "numeric", month: "long", day: "numeric" };
    return dateParam.toLocaleDateString("he", setDateFormat)
}

const getTime = (date) => {
    const dateObj = new Date(date);
    let hour = dateObj.getHours();
    let minute = dateObj.getMinutes();
    return hour + ':' + minute
}

export const Account = () => {
    const userCTX = useContext(LoginContext);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalFunc, setModalFunc] = useState(null);

    //user account editing functions
    const handelDelete = () => {
        setModalType("delete");
        setModalTitle("האם אתה בטוח?");
        setModalFunc(() => DeleteUserReq);
        setShowModal(true);
    }

    const handelChangeDetails = () => {
        setModalType("editUser");
        setModalTitle("ערוך פרטים - work in progress");
        setModalFunc(() => DeleteUserReq);
        setShowModal(true);
    }

    const handelChangePass = () => {
        setModalType("changePass");
        setModalTitle("שנה סיסמה");
        setModalFunc(() => ChangePassReq);
        setShowModal(true);
    }

    return (
        <div className={styles.container}>
            <Card style={{ width: 'fit-content' }}>
                <Card.Header>החשבון שלי</Card.Header>
                <Card.Body>
                    <Card.Title>{userCTX.user.firstName + ' ' + userCTX.user.lastName}</Card.Title>
                    <Card.Subtitle style={{ fontSize: '14px' }} className="mb-2 text-muted">{userCTX.user.email}</Card.Subtitle>
                    {/* <Card.Text></Card.Text> */}
                    <ListGroup variant="flush">
                        <ListGroup.Item><strong className="ml-2">סוג חשבון:</strong>{translate[userCTX.user.role]}</ListGroup.Item>
                        <ListGroup.Item><strong className="ml-2">סטטוס:</strong>{translate[userCTX.user.status]}</ListGroup.Item>
                        <ListGroup.Item><strong className="ml-2">ת. הצטרפות:</strong>{getFormattedDate(userCTX.user.joined)}</ListGroup.Item>
                        <ListGroup.Item><strong className="ml-2">התחברות אחרונה:</strong>{`${getFormattedDate(userCTX.user.lastLogin)} בשעה: ${getTime(userCTX.user.lastLogin)}`}</ListGroup.Item>
                        <ListGroup.Item><strong className="ml-2">ת. שינוי סיסמה אחרון:</strong>{getFormattedDate(userCTX.user.lastPassChange)}</ListGroup.Item>
                    </ListGroup>
                    <Card.Link onClick={handelChangeDetails} className={`col ${styles.linkStyle}`}>שנה פרטים אישיים</Card.Link>
                    <Card.Link onClick={handelChangePass} className={styles.linkStyle}>שנה סיסמה</Card.Link>
                    <div className="d-grid gap-2 mt-4">
                        <Button variant="outline-danger" onClick={handelDelete}>{'מחק את החשבון שלי'}</Button>
                    </div>
                </Card.Body>
            </Card>
            {showModal ?
                <Modals
                    type={modalType}
                    title={modalTitle}
                    show={showModal}
                    setShow={setShowModal}
                    func={modalFunc}
                /> : null}
        </div >
    )
}


