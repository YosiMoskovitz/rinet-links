import React from 'react'
import styles from './Loading.module.css'
import Spinner from 'react-bootstrap/Spinner'

export function Loading() {
    return (
        <div className={styles.Spinner}>
        <Spinner animation="border" role="status">
          <span className={`visually-hidden`}>Loading...</span>
        </Spinner>
      </div>
    )
}

