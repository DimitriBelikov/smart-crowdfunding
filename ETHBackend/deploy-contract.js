const compiledContract = require('./build/campaignContract.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
require('dotenv').config({ path: '../.env' });

exports.provider = () => {
    return new HDWalletProvider(process.env.GANACHE_API_KEY,
        'HTTP://127.0.0.1:7545', 0, 2);
}
// console.log(provider); --> Output: E:\Development\Web-Dev\smart-crowdfunding\ETHBackend\Sample-Tests\hdwallet-provider.txt
// account[0] -> Us i.e. contractOwner
// account[1] -> Campaign Organizer

exports.deployContract = async (provider) => {
    var web3 = new Web3(provider);
    var account = await web3.eth.getAccounts();
    console.log('\nStarting Deployment of Contract from account: ', account[0]);

    var contractABI = compiledContract.campaignContract.abi;
    try {
        var contractObject = new web3.eth.Contract(contractABI)
            .deploy(
                {
                    data: '0x' + compiledContract.campaignContract.evm.bytecode.object,
                    arguments: [account[1]]
                }
            );

        var deployResponse = await contractObject.send({ from: account[0] });
    } catch (error) {
        console.log(error);
        var deployResponse = 'Error... Check Logs';
        return error;
    }

    console.log('--> Contract Deployed at: ', deployResponse._address);
    return deployResponse._address;
}