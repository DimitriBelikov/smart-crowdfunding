import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Cookies from 'js-cookie';

import { Layout, Menu, Space } from 'antd';

//CSS
import './Navigationbar.css';

const { Header, Content, Footer } = Layout;

const Navigationbar = () => {
    const [cookie, setCookie] = useState();
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        setCookie(Cookies.get('jwt'));
    }, []);

    const handleResize = () => {
        if (window.innerWidth < 720) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

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
        <Layout>
            <Header >
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" >
                <Menu.Item>
                    <a href="/">Home</a>
                </Menu.Item>
                <Menu.Item>
                    <a href="/campaigns">Campaigns</a>
                </Menu.Item>
                <Menu.Item>
                    <a href="/about">About Us</a>
                </Menu.Item>
                <Menu.Item >
                    {cookie === undefined ? <a href='/login'>Login</a> : <a href='/profile'>My Account</a>}
                </Menu.Item>
                <Menu.Item >
                    {cookie !== undefined && <a href='/' onClick={handleLogout}>Logout</a>}
                </Menu.Item>
            </Menu>
            </Header>
        </Layout>
    </>;
};

export default Navigationbar;
