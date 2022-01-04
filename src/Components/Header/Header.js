import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../../store/Login-context'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { LogOutReq } from '../../Api/LoginApi';
import 'bootstrap/dist/css/bootstrap.css';
//icon for user pic
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './Header.module.css'

export function Header () {
    const navigate = useNavigate();
    const LoginCtx = useContext(LoginContext);
	const { user } = LoginCtx;

    const handleLogout = () => {
        LogOutReq().then((res)=> {
            if (res.status === 'OK'){
                LoginCtx.setStatus(false);
                LoginCtx.setUser({});
                navigate('/login', { replace: true })
            }
            if (res.status === 'ERROR') {

            }
        })
	};
    
    return (
        <Navbar variant="light" className={styles.bg} expand="md">
            <Container fluid>
                <Navbar.Brand href="#home">ריינט - קישורים להורדה</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-dark-example" />
                <Navbar.Collapse id="navbar-dark-example">
                    <Nav className={`me-auto ${styles.navbar}`}>
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title={user.firstName + " " + user.lastName + " "}
                            menuVariant="light"
                        >
                            <div className={styles.dropdownTextAlign}>
                                <NavDropdown.Item onClick={() => navigate('/account')}>ניהול חשבון</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>התנתק</NavDropdown.Item>
                            </div>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}