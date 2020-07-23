const Web3 = require('web3');
let web3Client = new Web3('http://localhost:8545');

web3Client.eth.personal.unlockAccount("0xf0ea9b51abc9febcea4fda47f1ceadcc07216512", "word", 600)
    .then(console.log('Account unlocked!'));