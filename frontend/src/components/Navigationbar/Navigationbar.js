import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

//CSS
import './Navigationbar.css';

const Navigationbar = () => {
    return <>
        <Navbar bg="light" variant="light" expand="lg">
            <Container fluid>
                <Navbar.Brand className="nav-brand" href='/'>SMARTFUNDCUBE</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href='/'>Home</Nav.Link>
                        <Nav.Link href='/campaigns'>Campaigns</Nav.Link>
                        <Nav.Link href='/about'>About</Nav.Link>
                        <Nav.Link href='/login'>Register/Login</Nav.Link>
                        <Nav.Link href='/profile'>My Acocunt</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>;
};

export default Navigationbar;
