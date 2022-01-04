import { Outlet } from 'react-router-dom';
import styles from './LoginContainer.module.css';

export function LoginContainer() {
    return (
      <div className={styles.mainDiv}>
          <Outlet />
      </div>
    );
  }