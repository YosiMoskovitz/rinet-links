import {React, useContext, useState, useEffect} from 'react';
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
      <Col md={2} xs={12} className={`${classes.col}`}><Sidebar /></Col>
    : null}
        <Col md={isAdmin ? 10 : 12} xs={12} className={`${classes.col}`}>
        <Header />
        <Outlet />
        </Col>
    </Row>
  );
}

