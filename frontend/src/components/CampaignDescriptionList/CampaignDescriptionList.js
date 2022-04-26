import React from "react";
import { Nav } from "react-bootstrap";

//CSS
import "./CampaignDescriptionList.css";

const CampaignDescriptionList = ({
    itemsList,
    currentActive,
    clickFunction,
}) => {
    return (
        <div className="container-fluid mt-1">
            <Nav fill variant="tabs" defaultActiveKey="1">
                {itemsList.map((item, index) => (
                    <Nav.Item
                        eventKey={index}
                        className={`nav-link m-1 ${currentActive === item ? "menu-item-selected" : "menu-item"
                            }`}
                    >
                        <Nav.Link
                            className={`menu-link nav-link-item ${currentActive === item ? "text-white" : "text-dark"
                                }`}
                            onClick={() => clickFunction(item)}
                        >
                            {item}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
        </div>
    );
};

export default CampaignDescriptionList;
