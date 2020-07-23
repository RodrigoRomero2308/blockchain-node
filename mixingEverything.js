const Web3 = require('web3');
const inputDecoder = require('ethereum-input-data-decoder');
let web3Client = new Web3('http://localhost:8545');

const contractAddress = '0xEe53a207b9c18C0154Dc9eb72151c0119Bf65c75';
const contractAbi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "login",
                "type": "string"
            }
        ],
        "name": "logLogin",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllLogs",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "logLength",
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

async function unlockSendingAccount() {
    await web3Client.eth.personal.unlockAccount("0xf0ea9b51abc9febcea4fda47f1ceadcc07216512", "word", 600)
        .then(console.log('Account unlocked!'));
    return;
}

async function lockSendingAccount() {
    await web3Client.eth.personal.lockAccount("0xf0ea9b51abc9febcea4fda47f1ceadcc07216512")
        .then(console.log('Account locked!'));
}

async function callLoginLog(username, date) {
    const json = { username, date };
    const stringToSend = JSON.stringify(json);
    console.log(stringToSend);
    await unlockSendingAccount();
    const contract = new web3Client.eth.Contract(contractAbi, contractAddress, { // contract address
        from: "0xf0ea9b51abc9febcea4fda47f1ceadcc07216512" // sending account
    });
    return contract.methods.logLogin(stringToSend).send();
}

async function retrieveTransactionInputData(transactionHash) {
    return new Promise((resolve) => {
        web3Client.eth.getTransaction(transactionHash).then(transaction => {
            console.log(transaction);
            let inputData = transaction.input;
            const decoder = new inputDecoder(contractAbi);
            resolve(decoder.decodeData(inputData));
        })
    })
}

async function getAllLogins() {
    const contract = new web3Client.eth.Contract(contractAbi, contractAddress, { // contract address
        from: "0xf0ea9b51abc9febcea4fda47f1ceadcc07216512" // sending account
    });
    return contract.methods.getAllLogs().call();
}

async function main() {
    // await unlockSendingAccount();
    const loginLogResult = await callLoginLog("username", "ayer");
    console.log(loginLogResult);
    const transactionHash = loginLogResult.transactionHash;
    const inputData = await retrieveTransactionInputData(transactionHash);
    console.log(inputData);
    console.log("all logins");
    let allLogins = await getAllLogins();
    allLogins = allLogins.map(login => JSON.parse(login));
    console.log(allLogins);
    await lockSendingAccount();

}

main();