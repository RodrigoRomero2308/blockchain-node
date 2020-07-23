pragma solidity ^0.6.9;
pragma experimental ABIEncoderV2;

contract EnterpriseInnovationLoginLog {
    string[] private logsArray;

    function logLogin(string memory login) public {
        logsArray.push(login);
    }

    function logLength() public view returns (uint256) {
        return logsArray.length;
    }

    function getAllLogs() public view returns (string[] memory) {
        return logsArray;
    }
}
