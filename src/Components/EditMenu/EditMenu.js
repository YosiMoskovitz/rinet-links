import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './EditMenu.module.css'

export function EditMenu({items}) {
    const navigate = useNavigate();
    const location=useLocation();

    const EditItemsList = () => {
        let list= [];
        for (const item of Object.entries(items)) {
            list.push(item[1])
        }

        return list.map((item, index) =>{
            return (
                <ListGroup.Item
                action
                variant="light"
                key={index}
                className={styles.item}
                onClick={() => navigate(`${location.pathname}${item.link}`)}>
                {item.title}
            </ListGroup.Item>
            )
        })

    }

    return (
        <section className={styles.main}>
            <ListGroup>
                {<EditItemsList />}
            </ListGroup>
        </section>
    )
}