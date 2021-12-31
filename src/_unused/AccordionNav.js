import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';

export function AccordionNav() {
    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>ניהול</Accordion.Header>
                <Accordion.Body>
                    <div>ניהול לינקים</div>
                    <div>ניהול משתמשים</div>
                    <div>#</div>
                    <div>#</div>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>הגדרות</Accordion.Header>
                <Accordion.Body>
                    <div>#</div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
