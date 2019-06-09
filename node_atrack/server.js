const web3 = require('web3');
const express = require('express');
const Tx = require('ethereumjs-tx');
var five = require("johnny-five");

const app = express();

//Infura HttpProvider Endpoint
web3js = new web3(new web3.providers.HttpProvider("https://ropsten.infura.io/v3/aa53b4a238d840a38cecf616102aa6b3"));

        // container address
        var myAddress = '0xA9a1ADFadb311973cB137562b73145e9bD012eb1';
        var privateKey = Buffer.from('aef51d9e7092107f9f15b2f575d8919a30dc3a597972d351a7a7d598e77f51bb', 'hex')
        // cool.. address
        var toAddress = '0x6B293a94771f1CaeA34786E68a9038FAdc25C5fF';

        //contract abi is the array that you can get from the ethereum wallet or etherscan
        var contractABI =YOUR_CONTRACT_ABI;
        var contractAddress ="YOUR_CONTRACT_ADDRESS";
        //creating contract object
        var contract = new web3js.eth.Contract(contractABI,contractAddress);

        var count;
        // get transaction count, later will used as nonce
        web3js.eth.getTransactionCount(myAddress).then(function(v){
            console.log("Count: "+v);
            count = v;
            var amount = web3js.utils.toHex(1e16);
            //creating raw tranaction
            var rawTransaction = {
                "from":myAddress, 
                "gasPrice":web3js.utils.toHex(20* 1e9),
                "gasLimit":web3js.utils.toHex(210000),
                "to":contractAddress,
                "value":"0x0",
                "data":contract.methods.transfer(toAddress, amount).encodeABI(),
                "nonce":web3js.utils.toHex(count)
            }
            console.log(rawTransaction);
            //creating tranaction via ethereumjs-tx
            var transaction = new Tx(rawTransaction);
            //signing transaction with private key
            transaction.sign(privateKey);
            //sending transacton via web3js module
            web3js.eth.sendSignedTransaction('0x'+transaction.serialize().toString('hex'))
            .on('transactionHash',console.log);
                
            contract.methods.balanceOf(myAddress).call()
            .then(function(balance){console.log(balance)});
        })

app.get('/sendtx',function(req,res){
  
    });
app.listen(3000, () => console.log('Example app listening on port 3000!'))
