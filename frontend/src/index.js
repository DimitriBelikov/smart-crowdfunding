import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';

//Contract Build
import compiledContract from './ETHBackend/build/campaignContract.json';

var priorityRequests = [];
const {ethereum} = window;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const createPriorityRequests = async () => {
    var response = await fetch("http://localhost:4545/api/campaign/request/end");
    priorityRequests = await response.json();
    console.log('Inside create priority request: ');
    console.log(priorityRequests);
}

const checkRequestAndExecute = () => {
    priorityRequests.forEach((request) => {
        if (new Date(request.campaignRequest.deadline) - new Date(Date.now()) <= 0) {
            if (request.currentVote.yes.length !== 0 && request.currentVote.no.length !== 0){
                var notVoted = request.donors.length - (request.currentVote.yes.length + request.currentVote.no.length);
                var upVotePercentage = (notVoted + request.currentVote.yes.length)/(request.donors.length);
                if (upVotePercentage > 66){
                    var web3 = new Web3(ethereum);
                    var contractABI = compiledContract.campaignContract.abi;
                    var contractObject = new web3.eth.Contract(contractABI, request.smartContractAddress);
                    // console.log(contractObject);
                    contractObject.methods._sendRequestedMoney(String(request.campaignRequest.requestAmount))
                    .send({from: process.env.REACT_APP_METAMASK_ACCOUNT1}, (error, response) => {
                        if (error) throw error;
                        // Interact to API
                        console.log('Amount Sent =>\nTransaction ID = ', response);
                    }).catch(error => console.log(error));
                }
                //Call API saying Funds Denied
            }
            else console.log('Divison By Zero: Campaign Voting Data Error');
            console.log(request.campaignName + " deadline has arrived at " + new Date(Date.now()));
        }
    });
}

// createPriorityRequests();
// setInterval(createPriorityRequests, 24*60*60*1000);
// checkRequestAndExecute();
// setInterval(checkRequestAndExecute, 10*1000);
    
//console.log(endingCampaignRequests);
//Find campaigns with running request whse deadline is 36hrs
//Loop through all the above campaigns every 2 mins to check their deadline
//if deadline is passed or matched then 
//Check if denied/disbursed and acc call ETHBackend
//Once done, update DB

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
