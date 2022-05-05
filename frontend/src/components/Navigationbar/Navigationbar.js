import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

//CSS
import "./Navigationbar.css";

const Navigationbar = () => {
    const navigate = useNavigate();
    const [cookie, setCookie] = useState();
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        setCookie(Cookies.get("jwt"));
        // if (Cookies.get("jwt") === undefined) window.location.reload(true);
    }, []);

    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    const handleLogout = async () => {
        const requestOptions = {
            method: "POST",
            withCredentials: true,
            credentials: "include",
        };

        const response = await fetch(
            "http://localhost:4545/api/user/logout",
            requestOptions
        );
        const result = await response.json();
        console.log(result);
        if (response.status !== 200) {
            console.log({ value: true, msg: result.msg });
        } else {
            setCookie(Cookies.get("jwt"));
            navigate('/');
        }
    };

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="light">
                <Container fluid>
                    <a href="/">
                        <div
                            className="d-flex m-2 font-weight-bold nav-brand"
                            id="navbar-brand"
                        >
                            <div className="logo-container">
                                <img
                                    src="http://localhost:3000/logo.png"
                                    alt="image"
                                    width="56"
                                    height="56"
                                />
                            </div>
                            <span className="pt-2"> &nbsp;SMARTFUNDCUBE</span>
                        </div>
                    </a>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link id="nav-link" className="m-2" href="/">
                                Home
                            </Nav.Link>
                            <Nav.Link
                                id="nav-link"
                                className="m-2"
                                href="/campaigns"
                            >
                                Campaigns
                            </Nav.Link>
                            <Nav.Link
                                id="nav-link"
                                className="m-2"
                                href="/about"
                            >
                                About Us
                            </Nav.Link>
                            {cookie === undefined ? (
                                <Nav.Link
                                    id="nav-link"
                                    className="m-2"
                                    href="/login"
                                >
                                    Login
                                </Nav.Link>
                            ) : (
                                <Nav.Link
                                    id="nav-link"
                                    className="m-2"
                                    href="/profile"
                                >
                                    Profile
                                </Nav.Link>
                            )}
                            {cookie !== undefined && (
                                <Nav.Link
                                    id="nav-link"
                                    className="m-2"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Nav.Link>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigationbar;
