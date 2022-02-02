import { React, useState } from 'react';
import { Card, Nav } from 'react-bootstrap'
import styles from './Reports.module.css'
import BasicTable from '../../Components/SimpleTable/ListTable'

export function Reports() {
    const [reportItem, setReportItem] = useState();

    const handelNavClick = (items) => {
        setReportItem(items);
    }

    return (
        <section className={styles.main}>
            <Card>
                <Card.Header>
                    <Nav variant="tabs" defaultActiveKey="manageLinks">
                        <Nav.Item>
                            <Nav.Link eventKey="manageLinks" onClick={() => handelNavClick()}>{'פעולות'}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="manageUsers" onClick={() => handelNavClick('donations')}>{'תרומות'}</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                {reportItem === 'donations' ? <BasicTable /> : null}
                </Card.Body>
            </Card>

        </section>
    )
}