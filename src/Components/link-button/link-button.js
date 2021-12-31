import { React } from 'react';
import Button from 'react-bootstrap/Button';
import styles from './link-button.module.css'

export function LinkButton(link) {
    return (
    <Button href={link.path} target="_blank"
    variant="outline-primary"
    className={styles.Button}>
        {link.title}
    </Button>  
    )
}
