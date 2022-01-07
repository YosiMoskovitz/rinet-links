import { React, useContext } from 'react'
import { Card, ListGroup, } from 'react-bootstrap';
import styles from './Account.module.css';
import { Button } from 'react-bootstrap';

import LoginContext from '../../store/Login-context'

export const Account = () => {
    const userCTX = useContext(LoginContext);

    return (
        <div className={styles.container}>
            <Card style={{ width: 'fit-content' }}>
                <Card.Header>החשבון שלי</Card.Header>
                <Card.Body>
                    <Card.Title>{userCTX.user.firstName + ' ' + userCTX.user.lastName}</Card.Title>
                    <Card.Subtitle style={{ fontSize: '14px' }} className="mb-2 text-muted">{userCTX.user.email}</Card.Subtitle>
                    {/* <Card.Text></Card.Text> */}
                    <ListGroup variant="flush">
                        <ListGroup.Item><strong className="ml-2">סוג חשבון:</strong>{userCTX.user.role}</ListGroup.Item>
                        <ListGroup.Item><strong className="ml-2">סטטוס:</strong>{userCTX.user.status}</ListGroup.Item>
                        <ListGroup.Item><strong className="ml-2">ת. הצטרפות:</strong>{getFormattedDate(userCTX.user.joined)}</ListGroup.Item>
                        <ListGroup.Item><strong className="ml-2">התחברות אחרונה:</strong>{`${getFormattedDate(userCTX.user.lastLogin)} בשעה: ${getTime(userCTX.user.lastLogin)}`}</ListGroup.Item>
                        <ListGroup.Item><strong className="ml-2">ת. שינוי סיסמה אחרון:</strong>{getFormattedDate(userCTX.user.lastPassChange)}</ListGroup.Item>
                    </ListGroup>
                    <Card.Link href="#" className="col">שנה פרטים אישיים</Card.Link>
                    <Card.Link href="#">שנה סיסמה</Card.Link>
                    <div className="d-grid gap-2 mt-4">
                    <Button variant="outline-danger">{'מחק את החשבון שלי'}</Button>
                    </div>
                </Card.Body>
            </Card>
        </div >
    )
}

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

