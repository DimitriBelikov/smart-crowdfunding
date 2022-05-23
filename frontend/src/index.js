import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Web3 from "web3";
import { Transaction } from "@ethereumjs/tx";
import Common, { Chain } from "@ethereumjs/common";

//Stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

//Contract Build
import compiledContract from "./ETHBackend/build/campaignContract.json";

var priorityRequests = [];
const { ethereum } = window;

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

const createPriorityRequests = async () => {
    var response = await fetch("http://localhost:4545/api/campaign/request/end");
    priorityRequests = await response.json();
    console.log("Inside create priority request: ");
    console.log(priorityRequests);
    // checkRequestAndExecute();
};

const checkRequestAndExecute = () => {
    priorityRequests.forEach(async (request, index, object) => {
        const now = new Date();
        const DBDate = new Date(request.campaignRequest.deadline);
        var success = false;
        // console.log("Current Time" + new Date(DBDate.getTime() + DBDate.getTimezoneOffset() * 60000));
        // console.log("Deadline" + new Date(now.getTime() + now.getTimezoneOffset() * 60000));
        console.log(new Date(DBDate.getTime() + DBDate.getTimezoneOffset() * 60000) - new Date(now.getTime() + now.getTimezoneOffset() * 60000))

        if (new Date(DBDate.getTime() + DBDate.getTimezoneOffset() * 60000) - new Date(now.getTime() + now.getTimezoneOffset() * 60000) <= 0) {
            console.log("Campaign Deadline reached");
            var notVoted = request.donors.length - (request.currentVote.yes.length + request.currentVote.no.length);
            var upVotePercentage = ((notVoted + request.currentVote.yes.length) / request.donors.length) * 100;
            console.log("UpVote Percentage = " + upVotePercentage);

            if (upVotePercentage >= 66) {
                const infura = `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`;
                var defaultAccount = process.env.REACT_APP_INFURA_DEFAULT_ACCOUNT;
                var privateKey = process.env.REACT_APP_METAMASK_PRIVATEKEY;
                const web3 = new Web3(new Web3.providers.HttpProvider(infura));
                web3.eth.transactionBlockTimeout = 200;
                web3.eth.transactionPollingTimeout = 10000;
                const common = new Common({ chain: Chain.Ropsten });
                var contractABI = compiledContract.campaignContract.abi;

                console.log(defaultAccount);

                await web3.eth.getTransactionCount(
                    defaultAccount,
                    "latest",
                    async (err, nonce) => {
                        console.log("nonce value is ", nonce);

                        const contractObject = new web3.eth.Contract(
                            contractABI,
                            request.smartContractAddress
                        );
                        const functionABI = contractObject.methods
                            ._sendRequestedMoney(String(0.1 * Math.pow(10, 18)))
                            .encodeABI();

                        contractObject.methods._sendRequestedMoney(String(0.1 * Math.pow(10, 18))).estimateGas({ from: defaultAccount })
                            .then(async (gasAmount) => {
                                var transactionDetails = {
                                    nonce: nonce,
                                    to: request.smartContractAddress,
                                    gasPrice: "0x" + (await web3.eth.getGasPrice()).toString(16),
                                    gasLimit: "0x" + (gasAmount + 10000).toString(16),
                                    data: functionABI,
                                };

                                const transaction = Transaction.fromTxData(transactionDetails, {
                                    common,
                                });
                                var signedTx = transaction.sign(Buffer.from(privateKey, "hex"));
                                var rawdata = "0x" + signedTx.serialize().toString("hex");
                                await web3.eth
                                    .sendSignedTransaction(rawdata)
                                    .on("transactionHash", (hash) => {
                                        console.log(hash);
                                    })
                                    .on("receipt", async (receipt) => {
                                        console.log(["transferToStaging Receipt:", receipt]);
                                        var requestStatus = "FundsDisbursed";
                                        var response = await updateDatabase(
                                            upVotePercentage,
                                            request,
                                            requestStatus
                                        );
                                        if (response.status == 200) {
                                            object.splice(index, 1);
                                            console.log(
                                                `${requestStatus} for Campaign with name: `,
                                                request.campaignName
                                            );
                                        }
                                        else {
                                            console.log(
                                                `Error Occured while Interacting with Smart Contract for Campaign with name: `,
                                                request.campaignName
                                            );
                                        }
                                    })
                                    .on("error", (error) => {
                                        console.log('Transaction Error: ', error);
                                    });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    });
            } else {
                var requestStatus = "FundsDenied";
                var response = await updateDatabase(
                    upVotePercentage,
                    request,
                    requestStatus
                );
                if (response.status == 200) {
                    object.splice(index, 1);
                    console.log(
                        `${requestStatus} for Campaign with name: `,
                        request.campaignName
                    );
                }
                else {
                    console.log(
                        `Error Occured while Interacting with Smart Contract for Campaign with name: `,
                        request.campaignName
                    );
                }
            }
            console.log(priorityRequests);
        }
    });
};

const updateDatabase = async (upVotePercentage, campaign, requestStatus) => {
    const formData = new FormData();
    formData.append("upVotePercentage", upVotePercentage);
    const requestOptions = {
        method: "POST",
        body: formData,
    };
    const response = await fetch(
        `http://localhost:4545/api/campaign/${campaign._id}/request/current/${requestStatus}`,
        requestOptions
    );
    const result = await response.json();
    console.log(result);
    if (response.status != 200) console.log(response);
    else {
        console.log(
            `${requestStatus} for Campaign with name: `,
            campaign.campaignName
        );
    }
    return response;
};

createPriorityRequests();
// setInterval(createPriorityRequests, 24*60*60*1000);
// setTimeout(checkRequestAndExecute, 10*1000);
// setInterval(checkRequestAndExecute, 10*1000);