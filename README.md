# Blockchain with node.js

In this repository we have some examples on how to use a private blockchain with node.js and web3. The contract used for this examples is the file called *EnterpriseInnovationLoginLog* (don't ask why the name)

Coming soon we will upload a repository to make your own private blockchain using docker.

## Files we have in this repository that use Web3 package from NPM

File|Description
----|-----------
unlockAccount.js|simple node to unlock an account with balance to deploy and use contracts. It is useful when using an IDE like Remix.
simpleTransaction.js|example on how to transact ether from one account to another
simpleContractUsage.js|example on how to call contract methods. It requires you to deploy the contract via an IDE (can be done with web3 also, but we used Remix IDE to deploy)

Now we have some files that use a package called *ethereum-input-data-decoder*. This was useful to retrieve information for transaction inputs in case we need it as a proof that blockchain is receiving the correct parameters.

## Files we have in this repository that use Web3 and ethereum-input-data-decoder

File|Description
----|-----------
retrievingData.js|example on how to decode input data from a transaction
mixingEverything.js|example mixing things out to achieve calling and retrieving data