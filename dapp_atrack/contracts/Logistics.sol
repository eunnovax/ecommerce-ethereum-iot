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
    
    uint public orderCount;
    uint orderValue;
    address Owner;
    mapping (address => package) public packages;
    mapping (address => address) public orders;
    mapping (address => bool) public containers;
    mapping (uint => address) public orderCheck;
    mapping (address => address) public containerCheck;
    mapping (address => address) public orderIdContainer;
    mapping (address => uint) balances;

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
    function withdraw(address payable _to) internal {
        balances[address(this)] -= orderValue;
        _to.transfer(orderValue);
    }
    // contract check method after instantiation
    function contractCheck() pure public returns (string memory) {
        string memory response = "contract works";
        return response;
    }
    
    function manageContainers(address _containerAddress, address _orderId) onlyOwner public returns (bool) {
        if(!containers[_containerAddress]) {
            containers[_containerAddress] = true;
        } else {
            containers[_containerAddress] = false;
        }
        containerCheck[_orderId] = _containerAddress;
        orderIdContainer[_containerAddress] = _orderId;
        emit containerReg(containers[_containerAddress]);
        return containers[_containerAddress];
    }
    
    ////orderitem function//////
    function orderItem(uint _itemId, string memory _itemName, uint _price) public payable returns (address) {
        orderValue = _price;
        require(msg.value >= orderValue);
        balances[address(this)] = address(this).balance;
        address uniqueId = address(bytes20(sha256(abi.encodePacked(msg.sender, now))));
        orderCount++;
        packages[uniqueId].isuidgenerated = true;
        packages[uniqueId].itemId = _itemId;
        packages[uniqueId].itemName = _itemName;
        packages[uniqueId].transitStatus = "Your package is ordered and is under processing";
        packages[uniqueId].orderStatus = 1;
        packages[uniqueId].customer = msg.sender;
        packages[uniqueId].orderTime = now;
        orders[msg.sender] = uniqueId;
        orderCheck[orderCount] = uniqueId;
        emit orderId(uniqueId);    
        return uniqueId;
    }
    ///orderitem function end 
    function orderIdToContainer(address _containerAddress) public view returns (address) {
        return orderIdContainer[_containerAddress];
    }
    /// orderNumber
    function orderNum(address addr) public view returns (address) {
        return orders[addr];
    }
    /// end of orderNumber

    /// containerStatus
    function containerStatus(address packageId) public view returns (string memory) {
        return packages[packageId].transitStatus;
    }
    /// end of containerStatus 
    /// container activation
    function containerActivation(address containerAddress) public view returns (bool) {
        return containers[containerAddress];
    }
    /// end of container activity
    /// orderCheck 
    function orderList(uint _orderCount) onlyOwner public view returns (address) {
        return orderCheck[_orderCount];
    }
    /// end of orderCheck
    /// containerCheck
    function containerList(address _orderId) onlyOwner public view returns (address) {
        return containerCheck[_orderId];
    }
    /// end of containerCheck
    function orderVolume() onlyOwner public view returns (uint) {
        return orderCount;
    }
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
    function completeTx(address _orderId) onlyOwner public returns(bool) {
        if(packages[_orderId].orderStatus == 3) {
            withdraw(msg.sender);
        }
    }
    
}