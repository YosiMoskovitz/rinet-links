import { React, useState } from 'react';
import Nav from 'react-bootstrap/Nav'
import { EditMenu } from '../../Components/EditMenu/EditMenu';
// import styles from './Manage.module.css'
import { data } from './editData';


export function Manage() {
    const [editItems, setEditItems] = useState(data.links);

    const handelNavClick = (items) => {
        setEditItems(items);
    }

    return (
            <section >
                <Nav justify variant="tabs" defaultActiveKey="manageLinks">
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
                <EditMenu items={editItems} />
            </section>
    )
}