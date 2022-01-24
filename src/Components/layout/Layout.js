import { useContext, useState, useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../sidebar/';
import classes from './Layout.module.css';
import { Header } from '../../Components/Header';
import LoginContext from '../../store/Login-context'

import {Row, Col } from 'react-bootstrap'

export function Layout() {
  const LoginCTX = useContext(LoginContext);
  const [isAdmin, setIsAdmin] = useState();

  useEffect (() => {
    setIsAdmin(LoginCTX.user.role.title === 'admin');
  }, [LoginCTX.user.role])

  return (
    <Row>
      {isAdmin ?
      <Col className={`${classes.col} col-2`}><Sidebar /></Col>
    : null}
        <Col className={`${classes.col} ${isAdmin ? 'col-10' : 'col-12' }`}>
        <Header />
        <Outlet />
        </Col>
    </Row>
  );
}

