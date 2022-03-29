const compiledContract = require('./build/campaignContract.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
// require('dotenv').config({ path: '' });

exports.provider = () => {
    console.log(process.env.REACT_APP_GANACHE_API_KEY);
    return new HDWalletProvider(process.env.REACT_APP_GANACHE_API_KEY,
        'HTTP://127.0.0.1:7545', 0, 2);
}

// console.log(provider); --> Output: E:\Development\Web-Dev\smart-crowdfunding\ETHBackend\Sample-Tests\hdwallet-provider.txt
// account[0] -> Us i.e. contractOwner
// account[1] -> Campaign Organizer

exports.deployContract = async (walletProvider) => {
    var web3 = new Web3(walletProvider);
    var account = await web3.eth.getAccounts();
    console.log('\nStarting Deployment of Contract from account: ', account[0]);

    var contractABI = compiledContract.campaignContract.abi;
    var contractObject = new web3.eth.Contract(contractABI)
        .deploy(
            {
                data: '0x' + compiledContract.campaignContract.evm.bytecode.object,
                arguments: [account[1]]
            }
        );

    var deployResponse = await contractObject.send({ from: account[0] });

    console.log('--> Contract Deployed at: ', deployResponse._address);
    return deployResponse._address;
}