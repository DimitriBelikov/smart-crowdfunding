const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
require('dotenv').config({ path: '' });

exports.provider = () => {
    console.log(process.env.REACT_APP_GANACHE_API_KEY);
    return new HDWalletProvider(process.env.REACT_APP_GANACHE_API_KEY,
        'HTTP://127.0.0.1:7545', 0, 2);
}

// console.log(provider); --> Output: E:\Development\Web-Dev\smart-crowdfunding\ETHBackend\Sample-Tests\hdwallet-provider.txt
// account[0] -> Us i.e. contractOwner
// account[1] -> Campaign Organizer

// Infura Related Code for Backend Txn Execution
//                 const infura = `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_API_KEY}`;
//                 const web3 = new Web3(new Web3.providers.HttpProvider(infura));
//                 var defaultAccount = '0x7a7cC4CE2f66AdDbF1A52D8536565F3deE535327';
//                 const common = new Common({ chain: Chain.Ropsten })
//                 var contractABI = compiledContract.campaignContract.abi;
//                 var privateKey = process.env.REACT_APP_METAMASK_PRIVATEKEY;

//                 console.log(defaultAccount);
                
//                 web3.eth.getTransactionCount(defaultAccount, 'latest', async (err, nonce) => {
//                     console.log("nonce value is ", nonce);
//                     const contractObject = new web3.eth.Contract(contractABI, request.smartContractAddress);
//                     const functionABI = contractObject.methods._sendRequestedMoney(String(0.1*Math.pow(10,18))).encodeABI();
                    
//                     var transactionDetails = {
//                         "nonce": nonce,
//                         "gasPrice": '0x' + (await web3.eth.getGasPrice()).toString(16),
//                         "gasLimit": '0x' + (100000).toString(16),
//                         "value": '0x'+ (0.1*Math.pow(10,18)).toString(16),
//                         "data": functionABI
//                     }
//                     const transaction = Transaction.fromTxData(transactionDetails, { common });
//                     var signedTx = transaction.sign(Buffer.from(privateKey, 'hex'));
//                     var rawdata = '0x' + signedTx.serialize().toString('hex');
//                     web3.eth.sendSignedTransaction(rawdata).on('transactionHash', (hash)=> {
//                         console.log(hash);
//                     }).on('receipt', (receipt) => {    
//                         console.log(['transferToStaging Receipt:', receipt]);
//                         var requestStatus = 'FundsDisbursed';
//                         var response = updateDatabase(upVotePercentage, request, requestStatus);
//                         if (response.status == 200) success = true;
//                     }).on('error', (error) => {
//                         console.log(error);
//                     });
//                 });