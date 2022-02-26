import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import jsonwebtoken from 'jsonwebtoken';

//CSS
import './Navigationbar.css';

const Navigationbar = () => {
    const [cookie, setCookie] = useState();
    useEffect(() => {
        setCookie(Cookies.get('jwt'));
    }, []);

    const handleLogout = async () => {
        const requestOptions = {
            method: 'POST',
            withCredentials: true,
            credentials: 'include'
        };

        const response = await fetch('http://localhost:4545/api/user/logout', requestOptions);
        const result = await response.json();
        console.log(result);
        if (response.status !== 200) {
            console.log({ value: true, msg: result.msg });
        } else {
            setCookie(Cookies.get('jwt'));
        }
    }

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
                        <Nav.Link href='/profile'>My Account</Nav.Link>
                        {cookie !== undefined && <Nav.Link href='/' onClick={handleLogout}>Logout</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>;
};

export default Navigationbar;
