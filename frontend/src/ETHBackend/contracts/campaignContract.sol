// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract campaignContract {
    
    address private _contractOwner; // Deployer of the Contract
    address private _campaignCreator; // Campaign Creator
    uint32 public _nContributors; // No. of Contributors
    uint public _totalContributionAmount;
    mapping(uint32 => address) public _addresses; // Index Mapping with Contributors 
    mapping(address => uint256) private _addressETHmap; // Address mapping with contibution amount
    
    // Constructor
    constructor(address campaignOwner) {
        _campaignCreator = msg.sender;
        _contractOwner = campaignOwner;
    }
    
    // Event & Modifiers- Logs Received Amount 
    event _logReceiveMoneyEvent (address _sendersAddress, uint256 _amount);
    modifier onlyOwner{
        require(msg.sender == _contractOwner, 'Owner Specific Function');
        _;
    }

    // Function - View Function - Returns the current contract Balance
    function _contractBalance() view public returns (uint256 amount){
        amount = address(this).balance;
    }
    
    // Function - Sends Requested Money to campaignCreator
    function _sendRequestedMoney(uint256 _requestedAmount) public onlyOwner {
        require(_requestedAmount <= address(this).balance, 'Insufficient Funds');
        payable(_campaignCreator).transfer(_requestedAmount);
    }
    
    // Function - Dissolves Campaign
    function _dissolveCampaign() public onlyOwner {
        //_rollbackFunds();
        selfdestruct(payable(_contractOwner));
    }
    
    // Function - RollBack Contributor's Remaining Funds
    // function _rollbackFunds() internal onlyOwner{
    //     uint256 totalBalance = address(this).balance;
    //     for(uint32 index=1; index<=_nContributors; index++){
    //         emit _logReceiveMoneyEvent(_addresses[index], (_addressETHmap[_addresses[index]]/_totalContributionAmount));
    //         payable(_addresses[index]).transfer(_addressETHmap[_addresses[index]]*totalBalance/_totalContributionAmount);
    //     }
    // }
    
    // Function - Receives Money from contributors
    receive() external payable{
        _addresses[++_nContributors] = msg.sender;
        _addressETHmap[msg.sender] += msg.value;
        _totalContributionAmount += msg.value;
        emit _logReceiveMoneyEvent(msg.sender, msg.value);
    }
}