import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import Cookies from "js-cookie";

import { Layout, Menu, Space } from "antd";

//CSS
import "./Navigationbar.css";

const { Header, Content, Footer } = Layout;

const Navigationbar = () => {
    const [cookie, setCookie] = useState();
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        setCookie(Cookies.get("jwt"));
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
        }
    };

    return (
        <>
            {/* <Layout>
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item>
                            <a href="/">Home</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a href="/campaigns">Campaigns</a>
                        </Menu.Item>
                        <Menu.Item>
                            <a href="/about">About Us</a>
                        </Menu.Item>
                        <Menu.Item>
                            {cookie === undefined ? (
                                <a href="/login">Login</a>
                            ) : (
                                <a href="/profile">My Account</a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {cookie !== undefined && (
                                <a href="/" onClick={handleLogout}>
                                    Logout
                                </a>
                            )}
                        </Menu.Item>
                    </Menu>
                </Header>
            </Layout> */}
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
                            <Nav.Link id="nav-link" className="m-2" href="/campaigns">
                                Campaigns
                            </Nav.Link>
                            <Nav.Link id="nav-link" className="m-2" href="/about">
                                About Us
                            </Nav.Link>
                            {cookie === undefined ? (
                                <Nav.Link id="nav-link" className="m-2" href="/login">
                                    Login
                                </Nav.Link>
                            ) : (
                                <Nav.Link id="nav-link" className="m-2" href="/login">
                                    Profile
                                </Nav.Link>
                            )}
                            {cookie !== undefined && (
                                <Nav.Link id="nav-link" className="m-2" onClick={handleLogout}>
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
