import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//CSS
import "./Footer.css";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="page-footer ">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 footer-containers p-4">
                        <div>
                            <ul className="no-bullet-list">
                                <li className="footer-section mb-2">Get Started</li>
                                <li className="footer-item"><Link to="/">Dashboard</Link></li>
                                <li className="footer-item">
                                    <Link to="create-campaign">Create Your Campaign </Link>
                                </li>
                                <li className="footer-item"><Link to="/campaigns">Donate</Link></li>
                                <li className="footer-item">User Guide</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 footer-containers p-4">
                        <ul className="no-bullet-list">
                            <li className="footer-section mb-2">About</li>
                            <li className="footer-item">Contact Us</li>
                            <li className="footer-item"><Link to="/about">Get to Know us</Link></li>
                            <li className="footer-item">White Paper</li>
                        </ul>
                    </div>
                    <div className="col-md-3 footer-containers p-4">
                        <ul className="no-bullet-list">
                            <li className="footer-section mb-2">Explore</li>
                            <li className="footer-item">
                                <Link to="/campaigns" state={{ category: "Education" }}>
                                    Education
                                </Link>
                            </li>
                            <li className="footer-item">
                                <Link to="/campaigns" state={{ category: "Medical" }}>
                                    Medical
                                </Link>
                            </li>
                            <li className="footer-item">
                                <Link to="/campaigns" state={{ category: "Human Rights" }}>
                                    Human Rights
                                </Link>
                            </li>
                            <li className="footer-item">
                                <Link to="/campaigns" state={{ category: "Disaster Relief" }}>
                                    Disaster Relief
                                </Link>
                            </li>
                            <li className="footer-item">
                                <Link to="/campaigns" state={{ category: "Animal Care" }}>
                                    Animal Care
                                </Link>
                            </li>
                            <li className="footer-item">
                                <Link to="/campaigns" state={{ category: "Environment" }}>
                                    Environment
                                </Link>
                            </li>
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
                        <span className="p-1">??</span>All Rights Reserved by SMARTFUNDCUBE
                        Team
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
