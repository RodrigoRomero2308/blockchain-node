const Web3 = require('web3');
let web3Client = new Web3('http://localhost:8545');

async function checkBalances() {
    console.log("Sending account balance");
    await web3Client.eth.getBalance("0xf0ea9b51abc9febcea4fda47f1ceadcc07216512").then(console.log);
    console.log("Signing account balance");
    await web3Client.eth.getBalance("0x01ce7069160f68742d96614c3b13644235a65a33").then(console.log);
    return;
}

async function unlockSendingAccount() {
    await web3Client.eth.personal.unlockAccount("0xf0ea9b51abc9febcea4fda47f1ceadcc07216512", "word", 600)
        .then(console.log('Account unlocked!'));
    return;
}

async function lockSendingAccount() {
    await web3Client.eth.personal.lockAccount("0xf0ea9b51abc9febcea4fda47f1ceadcc07216512")
        .then(console.log('Account locked!'));
}

const transactionObject = {
    from: "0xf0ea9b51abc9febcea4fda47f1ceadcc07216512",
    to: "0x01ce7069160f68742d96614c3b13644235a65a33",
    value: "2500"
}

async function main() {
    await unlockSendingAccount();
    const contract = new web3Client.eth.Contract([    // contract's ABI (got it when compiled)
        {
            "inputs": [],
            "name": "add",
            "outputs": [],
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
    ], '0xEA450Eb0FE3e97972cFfcB437b304Aea91a4fAaa', { // contract address
        from: "0xf0ea9b51abc9febcea4fda47f1ceadcc07216512" // sending account
    });

    console.log(contract.methods);

    const prom1 = contract.methods.getCounter().call();
    await prom1.then(async result => {
        console.log(result);
        const prom2 = contract.methods.add().send();
        await prom2.then(async result2 => {
            console.log(result2);
            const prom3 = contract.methods.getCounter().call();
            await prom3.then(async result3 => {
                console.log(result3);
                await lockSendingAccount();
                return;
            })
        })
    });

    // await new Promise((resolve, reject) => {
    //     contract.methods.getCounter().call().then(async _ => {
    //         await contract.methods.add().send().then(
    //             contract.methods.getCounter().call().then(resolve())
    //         )
    //     })
    // });
}

main();