import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";


//Components
import Navigationbar from "../../components/Navigationbar/Navigationbar";
import CampaignCard from "../../components/CampaignCard/CampaignCard";

//Controllers
import { useFetch } from "../../controllers/useFetch";

//CSS
import "./Home.css";

//AntD Components
import { Spin, Carousel } from "antd";

const Home = () => {
    window.scrollTo(0, 0);
    const { loading, data: featuredCampaigns } = useFetch("http://localhost:4545/api/campaign/featured-campaigns");
    const navigate = useNavigate();
    const categories = ["Education", "Medical", "Human Rights", "Disaster Relief", "Animal Care", "Environment"]

    const showMoreCampaigns = () => {
        navigate("/campaigns");
    };

    const showCreateCampaign = () => {
        navigate("/create-campaign");
    };

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Spin size="large" />
            </div>
        );
    }

    return (
        <>
            <Navigationbar />
            <div class="container-fluid">
                <div className="row">
                    <div className="col p-0">
                        <Carousel>
                            <div className="carousel-item-container-1">
                                <span className="carousel-item-text-l1 font-weight-bold text-white">Raising Money Has</span><span className="carousel-item-text-l2 font-weight-bold text-white">Never Been Easy</span>
                                <button className="btn carousel-item-button text-center font-weight-bold p-3 m-auto" onClick={showCreateCampaign}>
                                    Start A Campaign
                                </button>
                                <img src="http://localhost:3000/carousel-1-extended.jpg"
                                    width="100%"
                                    height={650} />
                            </div>
                            <div className="carousel-item-container-2">
                                <span className="carousel-item-text-l1 font-weight-bold text-white">Reach More. Raise More.</span><span className="carousel-item-text-l2 font-weight-bold text-white">Do More.</span>
                                <img src="http://localhost:3000/carousel-2.jpg"
                                    width="100%"
                                    height={650} />
                                <button className="btn carousel-item-button text-center font-weight-bold p-3 m-auto" onClick={showMoreCampaigns}>
                                    Explore Campaigns
                                </button>
                            </div>
                        </Carousel>
                    </div>
                </div>

                <div className="browse-by-categories-container row p-5">
                    <h1 className="w-100 text-center font-weight-bold">Browse by Categories</h1>
                    <p className="w-100 text-center browse-by-categories-text">Discover campaigns just for you and get great recommendations when you select your interests.</p>
                    {categories.map(category => (
                        <div className="col-md-2 col-sm-4 text-center">
                            <Link to="/campaigns" state={{ category: category }}>
                                <div className="category-container ml-2 mr-2 mt-2 mb-2 p-2 rounded">
                                    <div className="category-icon-container">
                                        <img className="category-icon m-2" src={`http://localhost:3000/logos/categories/${category}.png`} alt={`${category}-icon`} srcset="" />
                                        <img className="m-2 icon-hover" src={`http://localhost:3000/logos/categories/${category}-White.png`} alt={`${category}-icon-white`} srcset="" />
                                    </div>
                                    <div className="category-text-container">
                                        <h6 className="category-text mt-3 font-weight-bold">{category}</h6>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="row mt-3">
                    <h1 className="w-100 text-center font-weight-bold">Featured Campaigns</h1>
                    <div className="row mb-4 w-100">
                        {featuredCampaigns.map(featuredCampaign => (
                            <div
                                className="col-md-4 mt-4 d-flex justify-content-center"
                                key={featuredCampaign._id}
                            >
                                <CampaignCard campaign={featuredCampaign} />
                            </div>
                        ))}
                        <div
                            className="col-md-4 mt-4 d-flex justify-content-center"
                        >
                        </div>
                    </div>
                    <div className="row m-auto">
                        <div className="col mb-4">
                            <button
                                type="button"
                                className="btn btn-custom font-weight-bold"
                                onClick={showMoreCampaigns}
                            >
                                More Campaigns &nbsp;&nbsp;&#10095;&#10095;
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row start-campaign">
                    <div className="row w-100 text-center mt-5">
                        <h1 className="w-100 text-white font-weight-bold mt-4 mb-3">Your Story Starts Here</h1> <br />
                        <h4 className="w-100 text-white mt-0 text-light">Find a cause you believe in and make good things happen</h4> <br />
                        <button className="btn btn-custom font-weight-bold p-3 m-auto" onClick={showCreateCampaign}>
                            Start A Campaign
                        </button>

                    </div>
                    <div className="row w-100 text-center">

                    </div>
                    <div className="row m-auto pt-0 aligned-item-top">

                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
