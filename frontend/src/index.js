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
    // checkRequestAndExecute();
}

const checkRequestAndExecute = () => {
    priorityRequests.forEach(async (request, index, object) => {
        const now = new Date(); 
        const DBDate = new Date(request.campaignRequest.deadline);
        console.log("Current Time" + new Date(DBDate.getTime() + DBDate.getTimezoneOffset() * 60000));
        console.log("Deadline" + new Date(now.getTime() + now.getTimezoneOffset() * 60000));
        console.log(new Date(DBDate.getTime() + DBDate.getTimezoneOffset() * 60000) - new Date(now.getTime() + now.getTimezoneOffset() * 60000))
        if (new Date(DBDate.getTime() + DBDate.getTimezoneOffset() * 60000) - new Date(now.getTime() + now.getTimezoneOffset() * 60000) <= 0) {
            console.log('Inside If');
            var notVoted = request.donors.length - (request.currentVote.yes.length + request.currentVote.no.length);
            var upVotePercentage = ((notVoted + request.currentVote.yes.length)/(request.donors.length))*100;
            if (upVotePercentage >= 66){
                    // var web3 = new Web3(ethereum);
                    // var contractABI = compiledContract.campaignContract.abi;
                    // var contractObject = new web3.eth.Contract(contractABI, request.smartContractAddress);
                    // // console.log(contractObject);
                    // contractObject.methods._sendRequestedMoney(String(request.campaignRequest.requestAmount))
                    // .send({from: process.env.REACT_APP_METAMASK_ACCOUNT1}, (error, response) => {
                    //     if (error) throw error;
                    //     // Interact to API
                    //     console.log('Amount Sent =>\nTransaction ID = ', response);
                    // }).catch(error => console.log(error));
                var requestStatus = 'FundsDisbursed';
            } else var requestStatus = 'FundsDenied';
            // const formData = new FormData();
            // formData.append('upVotePercentage', upVotePercentage);
            // const requestOptions = {
            //     method: 'POST',
            //     body: formData
            // };
            // const response = await fetch(`http://localhost:4545/api/campaign/${request._id}/request/current/${requestStatus}`, requestOptions);
            // const result = await response.json();
            // console.log(result);
            // if (response.status != 200) console.log(response);
            // else console.log(`${requestStatus} for Campaign with name: `, request.campaignName);
            object.splice(index, 1);
            console.log(`${requestStatus} for Campaign with name: `, request.campaignName);
            console.log(priorityRequests);
        }
        //console.log(request.campaignName + " deadline has arrived at " + new Date(Date.now()));
    });
}


// createPriorityRequests();
// setInterval(createPriorityRequests, 24*60*60*1000);
// setTimeout(checkRequestAndExecute, 10*1000);
// setInterval(checkRequestAndExecute, 10*1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
