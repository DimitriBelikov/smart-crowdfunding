import React from 'react';

//Components
import Navigationbar from '../../components/Navigationbar/Navigationbar';

//CSS
import './About.css';

const About = () => {
    window.scrollTo(0, 0);
    return <>
        <Navigationbar />
        <div className="about-container pt-5">
            <div className="row text-center">
                <h1 className='about-headings mb-0'>About Us</h1>
                <hr width="5%" style={{ "height": "0.5px", "background": "black" }} />
                <div className="row">
                    <p className="about-paragraphs">Hello!! Welcome and Thank You for visiting our website.
                        We are a group of 4 members hailing from Mumbai, India and
                        currently in Final Year of our bachelors in C.S.E. at KJSCE,
                        Mumbai. This project is a part of Final Year project and
                        an initiative to bring about a change &nbsp;
                        innovation in the field of crowdfunding.</p>
                </div>
                <br />
            </div>
            <hr width="100%" className="mt-2 mb-2" />
            <div className="row text-center mt-4 mb-0">
                <h1 className="about-headings mb-0">Our Story</h1>
                <hr width="5%" style={{ "height": "0.5px", "background": "black" }} />
                <div className="row">
                    <p className="about-paragraphs">Every website has a story and so do ours.
                        During the COVID-19 pandemic, we saw campaigns
                        being organized and hosted by many well-known
                        charity or relief funds, social media personalities
                        etc.. to raise funds for the needy people affected
                        by the various factors and not just pandemic.</p><br />
                    <p className="about-paragraphs">In addition, we also noticed the growth of
                        cryptocurrencies and how blockchain played a great
                        role in transforming the current industry needs. As
                        of today, crowdfunding platforms have accountability
                        and trust problems. In many cases, money from donors
                        /philanthropists has gone into wrong campaigns and
                        has been misused. Implementing a Blockchain-based
                        platform can bring in a change.</p><br />
                    <p className="about-paragraphs">Every website has a story and so do ours.
                        During the COVID-19 pandemic, we saw campaigns
                        being organized and hosted by many well-known
                        charity or relief funds, social media personalities
                        etc.. to raise funds for the needy people affected
                        by the various factors and not just pandemic.</p>
                </div>
                <br />
            </div>
            <hr width="100%" className="mt-2 mb-2" />

            <div className="row mt-4 w-100">
                <h1 className='about-headings w-100 mb-0'>Meet Our Team</h1>
                <hr className="mb-5" width="5%" style={{ "height": "0.5px", "background": "black" }} />
                <div className='row w-100 mb-5'>
                    <div className="col-3 ">
                        <div className=" ml-2 mr-2 rounded">
                            <div className="member-image-container">
                                <img className="member-image rounded" src={`http://localhost:3000/start-campaign-background.jpg`} alt={`user-icon`} srcset="" />
                            </div>
                            <div className="member-name-container">
                                <h4 className="member-name font-weight-bold text-center mt-1 mb-0">Urmil Chandarana</h4>
                                <h6 className="member-designation font-weight-bold text-center text-dark mt-0">Developer</h6>
                            </div>
                            <div className="rmember-contactlinks-container text-center">
                                <a href="https://github.com/DimitriBelikov" target="blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#74797E" className="bi bi-github" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                </svg></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className=" ml-2 mr-2 rounded">
                            <div className="member-image-container">
                                <img className="member-image rounded" src={`http://localhost:3000/start-campaign-background.jpg`} alt={`user-icon`} srcset="" />
                            </div>
                            <div className="member-name-container">
                                <h4 className="member-name font-weight-bold text-center mt-1 mb-0">Harshavardhan Talele</h4>
                                <h6 className="member-designation font-weight-bold text-center text-dark mt-0">Developer</h6>
                            </div>
                            <div className="rmember-contactlinks-container text-center">
                                <a href="https://www.facebook.com/profile.php?id=100009477756390" target="blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#74797E" className="bi bi-facebook" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                </svg></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="https://www.linkedin.com/in/harshavardhan-talele-7b625b1aa/" target="blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#74797E" className="bi bi-linkedin" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                                </svg></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="https://www.github.com/tharsh1" target="blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#74797E" className="bi bi-github" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                </svg></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className=" ml-2 mr-2 rounded">
                            <div className="member-image-container">
                                <img className="member-image rounded" src={`http://localhost:3000/start-campaign-background.jpg`} alt={`user-icon`} srcset="" />
                            </div>
                            <div className="member-name-container">
                                <h4 className="member-name font-weight-bold text-center mt-1 mb-0">Niha Shaikh</h4>
                                <h6 className="member-designation font-weight-bold text-center text-dark mt-0">Developer</h6>
                            </div>
                            <div className="rmember-contactlinks-container text-center">
                                <a href="https://www.linkedin.com/in/niha-shaikh-811685170/" target="blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#74797E" className="bi bi-linkedin" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                                </svg></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="https://github.com/Niha-21" target="blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#74797E" className="bi bi-github" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                </svg></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className=" ml-2 mr-2 rounded">
                            <div className="member-image-container">
                                <img className="member-image rounded" src={`http://localhost:3000/start-campaign-background.jpg`} alt={`user-icon`} srcset="" />
                            </div>
                            <div className="member-name-container">
                                <h4 className="member-name font-weight-bold text-center mt-1 mb-0">Dhairya Mehta</h4>
                                <h6 className="member-designation font-weight-bold text-center text-dark mt-0">Developer</h6>
                            </div>
                            <div className="rmember-contactlinks-container text-center">
                                <a href="https://www.facebook.com/dhairya.mehta.712" target="blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#74797E" className="bi bi-facebook" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                </svg></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="https://in.linkedin.com/in/dhairya-mehta-b013631b2" target="blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#74797E" className="bi bi-linkedin" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                                </svg></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href="https://github.com/dhairya-mehta" target="blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#74797E" className="bi bi-github" viewBox="0 0 16 16">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                                </svg></a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr width="100%" className="mt-2 mb-3" />

                <div className="row text-center w-100">
                    <h1 className='about-headings mb-0'>Our Associations</h1>
                    <hr width="5%" style={{ "height": "0.5px", "background": "black" }} />
                    <div className="row w-100">
                        <img className="clg-img mt-3" src={`http://localhost:3000/somaiya.jpg`} alt={`somaiya-icon`} />
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default About;