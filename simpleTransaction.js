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

const transactionObject = {
    from: "0xf0ea9b51abc9febcea4fda47f1ceadcc07216512",
    to: "0x01ce7069160f68742d96614c3b13644235a65a33",
    value: "2500"
}

async function main() {
    // Transaction
    const date1 = new Date();
    await checkBalances();
    // Sending account is blocked by default so we unlock it first. Ethereum-node has personal api enabled
    await unlockSendingAccount();
    web3Client.eth.sendTransaction(transactionObject)
        .on("transactionHash", function (hash) {
            console.log("Transaction Hash");
            console.log(hash);
        })
        .on("receipt", async function (receipt) {
            console.log("Transaction receipt");
            console.log(receipt);
            console.log("-----------------------------");
            console.log("Checking funds...");
            console.log("Sending account balance");
            await web3Client.eth.getBalance("0xf0ea9b51abc9febcea4fda47f1ceadcc07216512").then(console.log);
            console.log("Signing account balance");
            await web3Client.eth.getBalance("0x01ce7069160f68742d96614c3b13644235a65a33").then(console.log);
            // Lock account again
            await web3Client.eth.personal.lockAccount("0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe")
                .then(console.log('Account locked!'));
            const date2 = new Date();
            console.log(`Finished in ${date2.getMilliseconds() - date1.getMilliseconds()}segs`);
        })
        // we will skip event for confirmations
        .on("error", console.error); //If a out of gas error, the second parameter is the receipt
}

main();