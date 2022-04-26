import React from "react";
import { Link } from "react-router-dom";

//CSS
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="page-footer ">
            <div className="container-fluid mt-2">
                <div className="row">
                    <div className="col-md-3 footer-containers p-4">
                        <div>
                            <ul className="no-bullet-list">
                                <li className="footer-section mb-2">Get Started</li>
                                <li className="footer-item">Dashboard</li>
                                <li className="footer-item">
                                    <Link to="create-campaign">Create Your Campaign </Link>
                                </li>
                                <li className="footer-item">Donate</li>
                                <li className="footer-item">User Guide</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 footer-containers p-4">
                        <ul className="no-bullet-list">
                            <li className="footer-section mb-2">About</li>
                            <li className="footer-item">Contact Us</li>
                            <li className="footer-item">Get to Know us</li>
                            <li className="footer-item">White Paper</li>
                        </ul>
                    </div>
                    <div className="col-md-3 footer-containers p-4">
                        <ul className="no-bullet-list">
                            <li className="footer-section mb-2">Explore</li>
                            <li className="footer-item">Education</li>
                            <li className="footer-item">Medical</li>
                            <li className="footer-item">Human Rights</li>
                            <li className="footer-item">Disaster Relief</li>
                            <li className="footer-item">Animal Care</li>
                            <li className="footer-item">Environment</li>
                        </ul>
                    </div>
                    <div className="col-md-3 footer-containers p-4">
                        <ul className="no-bullet-list">
                            <li className="footer-section mb-2">Legal</li>
                            <li className="footer-item">Terms &#38; Conditions </li>
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="col text-center text-white footer-containers">
                        <span className="p-1">©</span>All Rights Reserved by SMARTFUNDCUBE Team
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
