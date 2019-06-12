const express = require("express");
const app = express();
const port = 3005;
var five = require("johnny-five");

var Tx = require('ethereumjs-tx')
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/aa53b4a238d840a38cecf616102aa6b3"))

const acc1 = '0x6B293a94771f1CaeA34786E68a9038FAdc25C5fF'
const acc2 = '0x6d226694d7B582927C97d0e5d9deA913ad02e56c'

//console.log(web3.eth.accounts.create())

const privateKey1 = Buffer.from('039d93d1fdef86309699e31d1c2d9475ad0c2978a15af7d39bd1198c197318e4', 'hex')
//const privateKey1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex')
const privateKey2 = Buffer.from('7c1dce5c21b6bf0b590e50bd9b6c08fb1698d13dd9646535b4d2858b390c1a2b', 'hex')
//console.log('privatekey1', process.env.PRIVATE_KEY_1)
const contractAddress = '0x0e07eC7F09cC71ad2044A7F5D96f62DF2436b83c'
const contractABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_uniqueId",
                "type": "address"
            },
            {
                "name": "_transitStatus",
                "type": "string"
            }
        ],
        "name": "containerReport",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "packages",
        "outputs": [
            {
                "name": "isuidgenerated",
                "type": "bool"
            },
            {
                "name": "itemId",
                "type": "uint256"
            },
            {
                "name": "itemName",
                "type": "string"
            },
            {
                "name": "transitStatus",
                "type": "string"
            },
            {
                "name": "orderStatus",
                "type": "uint256"
            },
            {
                "name": "customer",
                "type": "address"
            },
            {
                "name": "orderTime",
                "type": "uint256"
            },
            {
                "name": "carrier1",
                "type": "address"
            },
            {
                "name": "carrier1_time",
                "type": "uint256"
            },
            {
                "name": "container_time",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "carriers",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_containerAddress",
                "type": "address"
            }
        ],
        "name": "manageContainers",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_itemId",
                "type": "uint256"
            },
            {
                "name": "_itemName",
                "type": "string"
            }
        ],
        "name": "orderItem",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "containers",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "ordernumber",
                "type": "address"
            }
        ],
        "name": "orderId",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "regStatus",
                "type": "bool"
            }
        ],
        "name": "containerReg",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "containerStatus",
                "type": "string"
            }
        ],
        "name": "statusEvent",
        "type": "event"
    }
]

const logistics = new web3.eth.Contract(contractABI, contractAddress);

//console.log(logistics.address)
//logistics.methods.manageContainers.call((err, res) => {console.log(res)})
///////////////////////// EVENTS /////////////////////////////////////////////
// logistics.getPastEvents(
//   'statusEvent',
//   {
//      fromBlock: 5482136,
//      toBlock: 'latest'
//   },
//   (err,events) => { console.log(events) }
//  )
// uniqueId = '0x631Dcd35a3C9774Aa9bC1869fBf15dB123da1602'
/////////////////ARDUINO SENSOR RECEPTION//////////////////////////////
var temp; 
var board = new five.Board();

board.on("ready", function() {
  var temperature = new five.Thermometer({
    pin: "A0",
    freq: 30000,
    toCelsius: function(raw) {
      // optional
      return raw;
    }
  });
  temperature.on("data", function() {

    tem = this.C;
    temp = tem.toString();
    console.log("temperature", temp);
//////////HERE GOES WEB3 CONTRACT TX////////////////////
    web3.eth.getTransactionCount(acc1, (err, txCount) => {
    //Smart Contract data
    //const data = '0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610fe4806100606000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80631f6ba5d5146100675780633396441b146101425780633ef7bd40146102ff5780635dee7c8a1461035b578063854a5405146103b7578063f3a35df4146104bc575b600080fd5b6101406004803603604081101561007d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001906401000000008111156100ba57600080fd5b8201836020820111156100cc57600080fd5b803590602001918460018302840111640100000000831117156100ee57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610518565b005b6101846004803603602081101561015857600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506106b7565b604051808b1515151581526020018a815260200180602001806020018981526020018873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018781526020018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200185815260200184815260200183810383528b818151815260200191508051906020019080838360005b83811015610254578082015181840152602081019050610239565b50505050905090810190601f1680156102815780820380516001836020036101000a031916815260200191505b5083810382528a818151815260200191508051906020019080838360005b838110156102ba57808201518184015260208101905061029f565b50505050905090810190601f1680156102e75780820380516001836020036101000a031916815260200191505b509c5050505050505050505050505060405180910390f35b6103416004803603602081101561031557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610888565b604051808215151515815260200191505060405180910390f35b61039d6004803603602081101561037157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506108a8565b604051808215151515815260200191505060405180910390f35b61047a600480360360408110156103cd57600080fd5b8101908080359060200190929190803590602001906401000000008111156103f457600080fd5b82018360208201111561040657600080fd5b8035906020019184600183028401116401000000008311171561042857600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610ae5565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6104fe600480360360208110156104d257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610ec4565b604051808215151515815260200191505060405180910390f35b600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900460ff1661057157600080fd5b600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166105c757600080fd5b60018060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600401541461061557600080fd5b80600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600301908051906020019061066b929190610ee4565b5042600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600901819055505050565b60016020528060005260406000206000915090508060000160009054906101000a900460ff1690806001015490806002018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561077c5780601f106107515761010080835404028352916020019161077c565b820191906000526020600020905b81548152906001019060200180831161075f57829003601f168201915b505050505090806003018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561081a5780601f106107ef5761010080835404028352916020019161081a565b820191906000526020600020905b8154815290600101906020018083116107fd57829003601f168201915b5050505050908060040154908060050160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060060154908060070160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690806008015490806009015490508a565b60026020528060005260406000206000915054906101000a900460ff1681565b60003373ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461090357600080fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff166109b1576001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550610a0a565b6000600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055505b7f44d70734ae135251e88a5ddbf4683ad6ddf957f7e70ea06adda50fc02ea80160600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16604051808215151515815260200191505060405180910390a1600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b60008060023342604051602001808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660601b8152601401828152602001925050506040516020818303038152906040526040518082805190602001908083835b60208310610b745780518252602082019150602081019050602083039250610b51565b6001836020036101000a038019825116818451168082178552505050505050905001915050602060405180830381855afa158015610bb6573d6000803e3d6000fd5b5050506040513d6020811015610bcb57600080fd5b810190808051906020019092919050505060601c905060018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160006101000a81548160ff02191690831515021790555083600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206001018190555082600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206002019080519060200190610cd8929190610ee4565b506040518060600160405280602f8152602001610f8a602f9139600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206003019080519060200190610d47929190610ee4565b5060018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206004018190555033600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060050160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555042600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600601819055507f6aadda661fdaec8246e4587a8a4a6bd50bf5fc5b8e09228796a188bd51fa731f81604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a18091505092915050565b60036020528060005260406000206000915054906101000a900460ff1681565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10610f2557805160ff1916838001178555610f53565b82800160010185558215610f53579182015b82811115610f52578251825591602001919060010190610f37565b5b509050610f609190610f64565b5090565b610f8691905b80821115610f82576000816000905550600101610f6a565b5090565b9056fe596f7572207061636b616765206973206f72646572656420616e6420697320756e6465722070726f63657373696e67a165627a7a723058208e7c161bd27ce96ae406d74bfa0f02db3c2212b6bcdcebcc3e6f576a966ada780029'
    //Build the Tx
        const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: contractAddress,
            //value: web3.utils.toHex(web3.utils.toWei('1','ether')),
            gasLimit: web3.utils.toHex(900000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
            //data: logistics.methods.manageContainers(acc1).encodeABI()
            //data: logistics.methods.orderItem(1, 'xbox').encodeABI()
            data: logistics.methods.containerReport('0x631Dcd35a3C9774Aa9bC1869fBf15dB123da1602', temp).encodeABI()
            //data: data
        }
        // Sign the Tx
        const tx = new Tx(txObject)
        tx.sign(privateKey1)
        const serializedTransaction = tx.serialize()
        const raw = '0x' + serializedTransaction.toString('hex')
        console.log('rawTx', raw)
        // Broadcast the Tx
        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            console.log('txHash', txHash)
        })
    })
  ///////////////////////////////////////////////////////    
    });
});
  
////////////////////////////BALANCE CHECK ////////////////////////////////
// web3.eth.getBalance(acc2, (err,bal) => {
//  console.log('account 2 balance:', web3.utils.fromWei(bal, 'ether'))
// })


// app.listen(port, () => {
//   console.log("we are live");
// });
