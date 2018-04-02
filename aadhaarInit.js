fs = require('fs');
Web3 = require('web3');
web3 = new Web3( new Web3.providers.HttpProvider("http://localhost:8545/") );
console.log("Connected to Blockchain !!");
code = fs.readFileSync("aadhaar.sol").toString();
solc = require('solc');
console.log("Compiling aadhaar.sol ...");
compiledCode = solc.compile( code );
console.log("Compilation Successfull!!");
abi = JSON.parse( compiledCode.contracts[":Aadhaar"].interface );
// console.log(abi)
byteCode = compiledCode.contracts[':Aadhaar'].bytecode ;
aadhaarContract =  web3.eth.contract(abi) ;
console.log("Deploying Aadhaar...")
deployedContract = aadhaarContract.new({data: byteCode , from: web3.eth.accounts[0] , gas: 3000000 },
( e , contract )=>{
      if( contract.address )
        {
          console.log("Deployed successfully...\n\n\nDeployed Address : " + contract.address );
          console.log("Use the above deployed address in aadhaar.js ...\n\n");
        }
});
