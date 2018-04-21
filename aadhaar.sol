pragma solidity ^0.4.0;

contract Aadhaar
{
    
    uint[] public userIdList;
    mapping (uint => uint) public userIsPresent;
    mapping (uint => uint) public verified;
    mapping ( string => uint) emailToId;
    mapping ( uint => userDetails ) public userInfo;     // mapping to user details
    uint public userCount;
    
    struct userDetails{
        string name;
        string contact;
        uint userid;
        uint usertype;
        string email;
        string pass;
        string aadhaar;
        address userAddress;
    }
    
    function getUserId(string email) returns (uint) {
        return emailToId[email];
    }
    
    function getUserName(uint id) returns (string) {
        return userInfo[id].name;
    }

    function getVerifyStatus(uint id) returns (uint) {
        return verified[id];
    }

    function registerMe(string name,string contact,uint userid,uint usertype,string email,string pass,string aadhaar) public returns(bool){
        if(userIsPresent[userid] != 1)
        {
            userIsPresent[userid]=1;
            address adr = msg.sender;
            verified[userid]=0;
            userIdList.push(userid);
            emailToId[email] = userid;
            userInfo[userid] = userDetails(name,contact,userid,usertype,email,pass,aadhaar,adr);
            userCount=userCount+1;
            return true;
        }
        return false;
    }
}
