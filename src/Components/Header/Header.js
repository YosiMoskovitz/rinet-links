import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../store/Login-context'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LogOutReq } from '../../Api/LoginApi';
import 'bootstrap/dist/css/bootstrap.css';
//icon for user pic
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDonate } from '@fortawesome/free-solid-svg-icons'
import styles from './Header.module.css'
import { InfoDivs } from '../InfoDivs'

export function Header() {
    const navigate = useNavigate();
    const LoginCtx = useContext(LoginContext);
    const { user } = LoginCtx;

    const handleLogout = () => {
        LogOutReq().then((res) => {
            if (res.status === 'OK') {
                LoginCtx.setStatus(false);
                LoginCtx.setUser({});
                navigate('/login', { replace: true })
            }
            if (res.status === 'ERROR') {

            }
        })
    };

    const handelDonate = () => {
        navigate('/donate')
    }

    return (
        <Navbar variant="light" className={styles.bg} expand="md">
            <Container fluid>
                <Navbar.Brand className={styles.responsiveHead} onClick={() => navigate('/')}><span className={styles.responsiveTitle}>ריינט - קישורים להורדה</span></Navbar.Brand>
                <InfoDivs />
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className={`me-auto`} navbarScroll>
                        <Nav.Item>
                            <div className={`mt-2 ml-2 ${styles.regularDonate}`}>
                                <Button variant="outline-secondary" size="sm" onClick={handelDonate}>{<FontAwesomeIcon icon={faDonate} />} {'תרום '}</Button>
                            </div>
                            <div className={`d-grid gap-2 ${styles.responsiveDonate}`} visible={false}>
                            <Button variant="outline-secondary" size="md" onClick={handelDonate}>{<FontAwesomeIcon icon={faDonate} />} {'תרום '}</Button>
                            </div>
                        </Nav.Item>
                        <NavDropdown
                            title={<AccountCircleIcon />}
                            menuVariant="light"
                            className={styles.responsiveNavDrop}
                        >
                            <div className={styles.dropdownTextAlign}>
                                <NavDropdown.Item disabled>{user.firstName + " " + user.lastName + " "}</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => navigate('/account')}>החשבון שלי</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>התנתק</NavDropdown.Item>
                            </div>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

