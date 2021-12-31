import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './sidebar.module.css';

import { data } from './data';

export function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className={styles.sidebar}>
            <ul className={styles.sidebarList}>
            {data.map((val, key) => {
                return (
                <li
                key={key}
                className={styles.row}
                id={window.location.pathname === val.link ? styles.active : undefined}
                onClick={() => navigate(val.link, { replace: true })}
                >
                    <div id={styles.icon}>{val.icon}</div>
                    <div id={styles.title}>{val.title}</div>
                </li>
            )
            })}
            </ul>
        </div>
    );
}
