const Web3 = require('web3');
const inputDecoder = require('ethereum-input-data-decoder');
let web3Client = new Web3('http://localhost:8545');

async function unlockSendingAccount() {
    await web3Client.eth.personal.unlockAccount("0xf0ea9b51abc9febcea4fda47f1ceadcc07216512", "word", 600)
        .then(console.log('Account unlocked!'));
    return;
}

async function lockSendingAccount() {
    await web3Client.eth.personal.lockAccount("0xf0ea9b51abc9febcea4fda47f1ceadcc07216512")
        .then(console.log('Account locked!'));
}

async function main() {
    // await unlockSendingAccount();
    web3Client.eth.getTransaction("0xb22e68afa0afb99232cd5c2199e3ff50f28b804a65a8d1104cc2f4964995380c").then(transaction => {
        console.log(transaction);
        let inputData = transaction.input;
        const contractAbi = [
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "x",
                        "type": "uint256"
                    }
                ],
                "name": "add",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "counterResponse",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "subtract",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getCounter",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
        const decoder = new inputDecoder(contractAbi);
        const result = decoder.decodeData(inputData);
        console.log(result);
        console.log(JSON.stringify(result));
        // const blockNumber = receipt.blockNumber;
        // web3Client.eth.getBlock(blockNumber).then(console.log);
    });
    // await lockSendingAccount();

}

main();