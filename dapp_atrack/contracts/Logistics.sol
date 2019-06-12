pragma solidity ^0.5.7;

contract Logistics {
    
    //event
    event orderId(
        address ordernumber
        );
        
    event containerReg(
        bool regStatus
        ); 
        
    event statusEvent(
        string containerStatus
        );    
    
    ///DECLARATION
    struct package {
        bool isuidgenerated;
        uint itemId;
        string itemName;
        string transitStatus;
        uint orderStatus; //1=ordered;2=in-transit;3=delivered;4=cancelled;
        
        address customer;
        uint orderTime;
        
        address carrier1;
        uint carrier1_time;
        
        uint container_time;
    }
    
    address Owner;
    mapping (address => package) public packages;
    mapping (address => bool) public carriers;
    mapping (address => bool) public containers;
    ///DECLARATION END
    
    ///modifier
    constructor () public {
        Owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(Owner == msg.sender);
        _;
    }
    
    ///MODIFIER END
    
    /// manage carriers
    
    /// manage carriers end
    
    function manageContainers(address _containerAddress) onlyOwner public returns (bool) {
        if(!containers[_containerAddress]) {
            containers[_containerAddress] = true;
        } else {
            containers[_containerAddress] = false;
        }
        emit containerReg(containers[_containerAddress]);
        return containers[_containerAddress];
    }
    
    ////orderitem function//////
    function orderItem(uint _itemId, string memory _itemName) public returns (address) {
        address uniqueId = address(bytes20(sha256(abi.encodePacked(msg.sender, now))));
        
        packages[uniqueId].isuidgenerated = true;
        packages[uniqueId].itemId = _itemId;
        packages[uniqueId].itemName = _itemName;
        packages[uniqueId].transitStatus = "Your package is ordered and is under processing";
        packages[uniqueId].orderStatus = 1;
        packages[uniqueId].customer = msg.sender;
        packages[uniqueId].orderTime = now;
        emit orderId(uniqueId);    
        return uniqueId;
    }
    ///orderitem function end 
    
    /// cancel order 

    /// cancel order ends 
    
    /// iot container report
    function containerReport(address _uniqueId, string memory _transitStatus) public returns (string memory) {
        require(packages[_uniqueId].isuidgenerated);
        //bytes32 hash = sha256(abi.encodePacked(_transitStatus));
        //address sender = recover(hash, signature);
        require(containers[msg.sender]);
        require(packages[_uniqueId].orderStatus == 1);
        
        packages[_uniqueId].transitStatus = _transitStatus;
        packages[_uniqueId].container_time = now;
        emit statusEvent(packages[_uniqueId].transitStatus);
        return packages[_uniqueId].transitStatus;
    }
    /// iot container report end
    
    
}