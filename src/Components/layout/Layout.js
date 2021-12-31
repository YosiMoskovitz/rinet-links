import { Outlet } from 'react-router-dom';
import { Sidebar } from '../sidebar/';
import classes from './Layout.module.css';
import { Header } from '../../Components/Header';

export function Layout() {
  return (
    <div className={classes.main}>
      <Sidebar />
      <main>
        <Header />
        <Outlet />
      </main>
    </div>
  );
}

