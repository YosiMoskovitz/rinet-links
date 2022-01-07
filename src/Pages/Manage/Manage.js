import { React, useState } from 'react';
import { Card, Nav, Button } from 'react-bootstrap'
import { EditMenu } from '../../Components/EditMenu/EditMenu';
import styles from './Manage.module.css'
import { data } from './editData';


export function Manage() {
    const [editItems, setEditItems] = useState(data.links);

    const handelNavClick = (items) => {
        setEditItems(items);
    }

    return (
        <section className={styles.main}>
            <Card>
                <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="manageLinks">
                    <Nav.Item>
                    <Nav.Link eventKey="manageLinks" onClick={() => handelNavClick(data.links)}>ניהול קישורים</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="manageUsers" onClick={() => handelNavClick(data.users)}>ניהול משתמשים</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2">לינק</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled >לינק</Nav.Link>
                </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                    <EditMenu items={editItems} />
                </Card.Body>
            </Card>
            
        </section>
    )
}