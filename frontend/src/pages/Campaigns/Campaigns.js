import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

//Components
import Pagination from "../../components/Pagination/Pagination";
import CampaignCard from "../../components/CampaignCard/CampaignCard";
import CampaignDescriptionList from "../../components/CampaignDescriptionList/CampaignDescriptionList";
import Navigationbar from "../../components/Navigationbar/Navigationbar";

//Controllers
import { useFetch } from "../../controllers/useFetch";

//CSS
import "./Campaigns.css";

//AntD Components
import { Spin } from "antd";

const Campaigns = () => {
    window.scrollTo(0, 0);
    const location = useLocation();
    const { loading, data: campaigns } = useFetch(
        "http://localhost:4545/api/campaign"
    );

    const [category, setCategory] = useState("All");
    const showPerPage = 6;
    const [pagination, setPagination] = useState({
        start: 0,
        end: showPerPage,
    });
    const [total, setTotal] = useState(0);
    const categoryList = [
        "All",
        "Education",
        "Medical",
        "Human Rights",
        "Disaster Relief",
        "Animal Care",
        "Environment",
    ];

    useEffect(() => {
        console.log(location);
        setTotal(campaigns.length);
        filterCampaigns(
            location.state === null ? "All" : location.state.category
        );
    }, [loading, location]);

    const onPaginationChange = (start, end) => {
        setPagination({ start: start, end: end });
    };

    const filterCampaigns = (category) => {
        setCategory(category);
        setTotal(
            (category === "All"
                ? campaigns
                : campaigns.filter(
                    (campaign) => campaign.campaignCategory === category
                )
            ).length
        );
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
            <div className="container-fluid">
                <div className="row explore-campaigns-container">
                    <div className="col ">
                        <h1 className="text-center text-white mt-3 explore-campaigns font-weight-bold">
                            Explore Campaigns
                        </h1>
                    </div>
                </div>

                <CampaignDescriptionList
                    itemsList={categoryList}
                    currentActive={category}
                    clickFunction={filterCampaigns}
                />

                <div id="campaigns" className="row">
                    {(category === "All"
                        ? campaigns
                        : campaigns.filter(
                            (campaign) =>
                                campaign.campaignCategory === category
                        )
                    )
                        .slice(pagination.start, pagination.end)
                        .map((filteredCampaign) => (
                            <div
                                className="col-md-4 mt-4 d-flex justify-content-center"
                                key={filteredCampaign._id}
                            >
                                <CampaignCard campaign={filteredCampaign} />
                            </div>
                        ))}
                </div>

                <div className="row">
                    <div className="col text-center mt-3 pt-3">
                        {/* {console.log("Before Pagination - total: " + total)} */}
                        {total > 0 && (
                            <Pagination
                                showPerPage={showPerPage}
                                onPaginationChange={onPaginationChange}
                                total={total}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Campaigns;
