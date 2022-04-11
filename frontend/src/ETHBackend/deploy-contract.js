const compiledContract = require('./build/campaignContract.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
// require('dotenv').config({ path: '' });

// exports.provider = () => {
//     console.log(process.env.REACT_APP_GANACHE_API_KEY);
//     return new HDWalletProvider(process.env.REACT_APP_GANACHE_API_KEY,
//         'HTTP://127.0.0.1:7545', 0, 2);
// }

// exports.web3Provider = async () => {
//     if (window.ethereum) {
//         await window.ethereum.request({method: 'eth_requestAccounts'});
//         window.web3 = new Web3(window.ethereum);
//         console.log(window.web3.eth.getAccounts());
//         return true;
//     }
//     return false;
// }

// console.log(provider); --> Output: E:\Development\Web-Dev\smart-crowdfunding\ETHBackend\Sample-Tests\hdwallet-provider.txt
// account[0] -> Us i.e. contractOwner
// account[1] -> Campaign Organizer

exports.deployContract = async (account) => {
    var web3 = new Web3(window.ethereum);
    console.log('\nStarting Deployment of Contract from account: ', account);

    var contractABI = compiledContract.campaignContract.abi;
    var contractObject = new web3.eth.Contract(contractABI).deploy(
            {
                data: '0x' + compiledContract.campaignContract.evm.bytecode.object,
                arguments: [account]
            }
    );
    var deployResponse = await contractObject.send({ from: account });

    console.log('--> Contract Deployed at: ', deployResponse._address);
    return deployResponse._address;
}