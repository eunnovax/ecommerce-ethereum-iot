pragma solidity ^0.5.7;

contract Logistics {
    
    //event
    event orderId(
        address ordernumber
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
    function manageCarriers(address _carrierAddress) onlyOwner public returns (string memory) {
        if(!carriers[_carrierAddress]) {
            carriers[_carrierAddress] = true;
        } else {
            carriers[_carrierAddress] = false;
        }
        
        return "Carrier is updated";
    }
    
    /// manage carriers end
    
    function manageContainers(address _containerAddress) onlyOwner public returns (bool) {
        if(!containers[_containerAddress]) {
            containers[_containerAddress] = true;
        } else {
            containers[_containerAddress] = false;
        }
        
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
    function cancelOrder(address _uniqueId) public returns (string memory) {
        require(packages[_uniqueId].isuidgenerated);
        require(packages[_uniqueId].customer == msg.sender);
        require(packages[_uniqueId].orderStatus != 3);
        
        packages[_uniqueId].orderStatus = 4;
        packages[_uniqueId].transitStatus = "Your order has been cancelled";
        
        return "Your order has been cancelled successfully";
    }
    /// cancel order ends 
    
    /// carriers
    function carrierReport(address _uniqueId, string memory _transitStatus) public {
        require(packages[_uniqueId].isuidgenerated);
        require(carriers[msg.sender]);
        require(packages[_uniqueId].orderStatus == 1);
        
        packages[_uniqueId].transitStatus = _transitStatus;
        packages[_uniqueId].carrier1 = msg.sender;
        packages[_uniqueId].carrier1_time = now;
        packages[_uniqueId].orderStatus = 2;
    }
    /// carriers end 
    /// iot container report
    function containerReport(address _uniqueId, string memory _transitStatus, bytes memory signature) public {
        require(packages[_uniqueId].isuidgenerated);
        bytes32 hash = sha256(abi.encodePacked(_transitStatus));
        address sender = recover(hash, signature);
        require(containers[sender]);
        require(packages[_uniqueId].orderStatus == 2);
        
        packages[_uniqueId].transitStatus = _transitStatus;
        packages[_uniqueId].container_time = now;
    }
    /// iot container report end
    
    function recover(bytes32 hash, bytes memory signature)
        public
        pure
        returns (address)
      {
        bytes32 r;
        bytes32 s;
        uint8 v;

    // Check the signature length
        if (signature.length != 65) {
          return (address(0));
        }

    // Divide the signature in r, s and v variables
    // ecrecover takes the signature parameters, and the only way to get them
    // currently is to use assembly.
    // solium-disable-next-line security/no-inline-assembly
        assembly {
          r := mload(add(signature, 0x20))
          s := mload(add(signature, 0x40))
          v := byte(0, mload(add(signature, 0x60)))
        }

    // Version of signature should be 27 or 28, but 0 and 1 are also possible versions
        if (v < 27) {
          v += 27;
        }

    // If the version is correct return the signer address
        if (v != 27 && v != 28) {
          return (address(0));
        } else {
      // solium-disable-next-line arg-overflow
          return ecrecover(hash, v, r, s);
        }
    }
}