import React, { useState, useEffect } from 'react';
import ShowMoreText from "react-show-more-text";
import Cookies from 'js-cookie';
import jsonwebtoken from 'jsonwebtoken';

//CSS
import '../CampaignRequestHistory.css';

const CurrentRequestTile = ({ request, votersList, donors, campaignId }) => {
    const [vote, setVote] = useState({ hasVoted: false, voteValue: true });
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState({ value: false, msg: '' });

    useEffect(() => {
        const cookie = Cookies.get('jwt');
        const user = jsonwebtoken.decode(cookie);
        console.log(user);
        if (user !== null) {
            const userInYes = votersList.yes.find(users => users === user.id);
            if (userInYes !== undefined) {
                setVote({ hasVoted: true, voteValue: true })
            } else {
                const userInNo = votersList.no.find(users => users === user.id);
                if (userInNo !== undefined) {
                    setVote({ hasVoted: true, voteValue: false })
                }
            }
            const isDonor = donors.find(donor => donor.userId === user.id);
            if (isDonor !== undefined) user.isDonor = true;
            else user.isDonor = false;
        }
        setUser(user);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setVote({ ...vote, hasVoted: true });

        const formData = new FormData();
        formData.append('userId', user.id);
        formData.append('vote', vote.voteValue);

        const requestOptions = {
            method: 'POST',
            body: formData
        }

        const response = await fetch(`http://localhost:4545/api/campaign/${campaignId}/vote`, requestOptions);
        if (response.status !== 200) {
            setIsError({ value: true, msg: "Error: Couldn't append your Vote... Please Try Again" });
            alert('Error: Cannot Append Vote at the Moment.');
            setIsLoading(false);
        } else {
            window.location.reload(true);
            alert('Voted Successfully');
        }
    }

    return <>
        <div className="row m-3">
            <div className="col-md-1 d-flex align-items-center text-center border border-success">
                <h4 className='p-4'>{request.requestNumber}</h4>
            </div>
            <div className="col-md-9 border border-success">
                <div className="row">
                    <div className="col-md-12">
                        <h3>{request.requestTitle}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <ShowMoreText
                            lines={5}
                            more="Show more"
                            className="border border-success mx-auto p-1"
                            expanded={false}
                            expandByClick={true}
                            truncatedEndingComponent={"... "}
                        >
                            <p>{request.requestDescription}</p>
                        </ShowMoreText>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h5>Request Documents</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12" >
                        {request.requestResources.map((document, index) => (
                            <div className="row border border-secondary m-1 p-1" key={index}>
                                <div className="col-md-1">
                                    <a href={`http://localhost:4545/${document.filePath}`} target='_blank' download>
                                        <img className='pdf-icon' src="http://localhost:3000/file-icon.png" />
                                    </a>
                                </div>
                                <div className="col-md-8">
                                    <span>{document.filePath.split('/').pop()}</span>
                                </div>
                                <div className="col-md-3 text-right">
                                    <span>{document.fileSize}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-md-2 border border-success pt-5">
                <div className="row  mb-3 mt-3 border border-warning">
                    <div className="col-sm-12 text-center">
                        <h6>Request Status</h6>
                    </div>
                    <div className="col-sm-12 text-center">
                        <h6>Active</h6>
                    </div>
                </div>
                <div className="row mb-3 mt-3 border border-warning">
                    <div className="col-sm-12 text-center">
                        <h6>Request Amount</h6>
                    </div>
                    <div className="col-sm-12 text-center">
                        <h6>{request.requestAmount / Math.pow(10, 18)} ETH</h6>
                    </div>
                </div>
                {user !== null && user.isDonor && <div className="row mb-3 mt-3 border border-warning text-center">
                    <form>
                        <fieldset disabled={vote.hasVoted ? true : false}>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline1" name="customRadioInlineYES" class="custom-control-input" onClick={() => setVote({ hasVoted: false, voteValue: true })} checked={vote.voteValue && "checked"} />
                                <label class="custom-control-label" for="customRadioInline1">YES</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline2" name="customRadioInlineNO" class="custom-control-input" onClick={() => setVote({ hasVoted: false, voteValue: false })} checked={!vote.voteValue && "checked"} />
                                <label class="custom-control-label" for="customRadioInline2">NO</label>
                            </div>
                            <button className='btn btn-primary' onClick={handleSubmit}>Submit Vote</button>
                        </fieldset>
                    </form>
                </div>
                }
            </div>
        </div>
    </>
}

export default CurrentRequestTile;