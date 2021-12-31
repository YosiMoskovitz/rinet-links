import { Outlet } from 'react-router-dom';
import classes from './ManegeBox.module.css';

export function ManegeBox() {
    return (
      <div className={classes.manegeBox}>
          <Outlet />
      </div>
    );
  }