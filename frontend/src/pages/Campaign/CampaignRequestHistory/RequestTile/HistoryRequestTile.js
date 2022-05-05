import React from "react";
import ShowMoreText from "react-show-more-text";

//CSS
import "../CampaignRequestHistory.css";

const HistoryRequestTile = ({ request }) => {
    return (
        <>
            <div className="row m-3">
                <div className="col-md-1 d-flex align-items-center text-center request-number-col">
                    <h2 className="font-weight-bold m-auto random p-0">
                        {request.requestNumber}
                    </h2>
                </div>
                <div className="col-md-9 border-top border-bottom">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="font-weight-bold mt-2">
                                {request.requestTitle}
                            </h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <ShowMoreText
                                lines={5}
                                more="Show more"
                                className="mx-auto card-text-container"
                                expanded={false}
                                expandByClick={true}
                                truncatedEndingComponent={"... "}
                            >
                                <p>
                                    {request.requestDescription.replace(
                                        "/wS*/g",
                                        function (txt) {
                                            return (
                                                txt.charAt(0).toUpperCase() +
                                                txt.substr(1).toLowerCase()
                                            )
                                        }
                                    )}
                                </p>
                            </ShowMoreText>
                        </div>
                    </div>
                    <hr width="100%" className="mt-2 mb-2" />
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="font-weight-bold">
                                Request Documents
                            </h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {request.requestResources.map((document, index) => (
                                <div className="row m-1" key={index}>
                                    <div className="col-md-1">
                                        <a
                                            href={`http://localhost:4545/${document.filePath}`}
                                            target="_blank"
                                            download
                                        >
                                            <img
                                                className="pdf-icon"
                                                src="http://localhost:3000/file-icon.png"
                                            />
                                        </a>
                                    </div>
                                    <div className="col-md-8 pl-0">
                                        <span>
                                            {document.filePath.split("/").pop()}
                                        </span>
                                    </div>
                                    <div className="col-md-3 text-right">
                                        <span>{document.fileSize}</span>
                                    </div>
                                    {index !==
                                        request.requestResources.length - 1 && (
                                            <hr width="100%" className="m-0 mb-1" />
                                        )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-md-2 request-details-col">
                    <div className="row  mb-3 mt-5 ">
                        <div className="col-sm-12 text-center">
                            <h6 className="font-weight-bold">Request Status</h6>
                        </div>
                        <div className="col-sm-12 text-center">
                            <h6>{request.requestStatus}</h6>
                        </div>
                    </div>
                    <hr width="100%" className="mt-2 mb-2" />
                    <div className="row mb-3 mt-3">
                        <div className="col-sm-12 text-center">
                            <h6 className="font-weight-bold">Request Amount</h6>
                        </div>
                        <div className="col-sm-12 text-center">
                            <h6>
                                {request.requestAmount / Math.pow(10, 18)} ETH
                            </h6>
                        </div>
                    </div>
                    <hr width="100%" className="mt-2 mb-2" />
                    <div className="row mb-3 mt-3">
                        <div className="col-sm-12 text-center">
                            <h6 className="font-weight-bold">
                                Up Vote Percentage
                            </h6>
                        </div>
                        <div className="col-sm-12 text-center">
                            <h6>{request.upVotePercentage.$numberDecimal} %</h6>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HistoryRequestTile;
