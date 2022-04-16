import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import {Transaction} from'@ethereumjs/tx';
import Common, { Chain } from '@ethereumjs/common'

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
        var success = false;
        // console.log("Current Time" + new Date(DBDate.getTime() + DBDate.getTimezoneOffset() * 60000));
        // console.log("Deadline" + new Date(now.getTime() + now.getTimezoneOffset() * 60000));
        // console.log(new Date(DBDate.getTime() + DBDate.getTimezoneOffset() * 60000) - new Date(now.getTime() + now.getTimezoneOffset() * 60000))

        if (new Date(DBDate.getTime() + DBDate.getTimezoneOffset() * 60000) - new Date(now.getTime() + now.getTimezoneOffset() * 60000) <= 0) {
            console.log('Inside If');
            var notVoted = request.donors.length - (request.currentVote.yes.length + request.currentVote.no.length);
            var upVotePercentage = ((notVoted + request.currentVote.yes.length)/(request.donors.length))*100;

            if (upVotePercentage >= 66){
                const infura = `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`;
                const web3 = new Web3(new Web3.providers.HttpProvider(infura));
                web3.eth.defaultAccount = '0x5ef638563128c2f5816d12512822D45343D6C745';
                const common = new Common({ chain: Chain.Ropsten })
                var contractABI = compiledContract.campaignContract.abi;
                var privateKey = process.env.REACT_APP_METAMASK_PRIVATEKEY;

                web3.eth.getTransactionCount(web3.eth.defaultAccount, async (err, nonce) => {
                    console.log("nonce value is ", nonce);
                    const contractObject = new web3.eth.Contract(contractABI, request.smartContractAddress);
                    const functionABI = contractObject.methods._sendRequestedMoney(String(0.1*Math.pow(10,18))).encodeABI();
                    
                    var transactionDetails = {
                        "nonce": nonce,
                        "gasPrice": '0x' + (await web3.eth.getGasPrice()).toString(16),
                        "gasLimit": '0x' + (50000).toString(16),
                        "to": '0x7a7cC4CE2f66AdDbF1A52D8536565F3deE535327',
                        "value": '0x'+ (0.1*Math.pow(10,18)).toString(16),
                        "data": functionABI
                    }
                    const transaction = Transaction.fromTxData(transactionDetails, { common });
                    var signedTx = transaction.sign(Buffer.from(privateKey, 'hex'));
                    var rawdata = '0x' + signedTx.serialize().toString('hex');
                    web3.eth.sendSignedTransaction(rawdata).on('transactionHash', (hash)=> {
                        console.log(hash);
                        var requestStatus = 'FundsDisbursed';
                        var response = updateDatabase(upVotePercentage, request, requestStatus);
                        if (response.status == 200) success = true;
                    }).on('receipt', (receipt) => {    
                        console.log(['transferToStaging Receipt:', receipt])
                    }).on('error', (error) => {
                        console.log(error);
                    });
                });
            } else {
                var requestStatus = 'FundsDenied';
                var response = updateDatabase(upVotePercentage, request, requestStatus);
                if (response.status == 200) success = true;
            }
            if (success) {
                object.splice(index, 1);
                console.log(`${requestStatus} for Campaign with name: `, request.campaignName);
            }
            else{
                console.log(`Error Occured while Interacting with Smart Contract for Campaign with name: `, request.campaignName);
            }
            console.log(priorityRequests);
        }
        //console.log(request.campaignName + " deadline has arrived at " + new Date(Date.now()));
    });
}

const updateDatabase = async (upVotePercentage, campaign, requestStatus) => {
    const formData = new FormData();
    formData.append('upVotePercentage', upVotePercentage);
    const requestOptions = {
        method: 'POST',
        body: formData
    };
    const response = await fetch(`http://localhost:4545/api/campaign/${campaign.campaignId}/request/current/${requestStatus}`, requestOptions);
    const result = await response.json();
    console.log(result);
    if (response.status != 200) console.log(response);
    else {
        console.log(`${requestStatus} for Campaign with name: `, campaign.campaignName);
    }
    return response;
}
// createPriorityRequests();
// setInterval(createPriorityRequests, 24*60*60*1000);
// setTimeout(checkRequestAndExecute, 10*1000);
// setInterval(checkRequestAndExecute, 10*1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
