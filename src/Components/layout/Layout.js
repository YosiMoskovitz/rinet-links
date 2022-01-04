import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../sidebar/';
import classes from './Layout.module.css';
import { Header } from '../../Components/Header';
import LoginContext from '../../store/Login-context'

import {Row, Col } from 'react-bootstrap'

export function Layout() {
  const LoginCTX = useContext(LoginContext)
  return (
    <Row>
      {LoginCTX.user.role === 'admin' ?
      <Col className={`${classes.col} col-2`}><Sidebar /></Col>
    : null}
        <Col className={`${classes.col} col-10`}>
        <Header />
        <Outlet />
        </Col>
    </Row>
  );
}

