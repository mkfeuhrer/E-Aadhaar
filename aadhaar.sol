pragma solidity ^0.4.0;

contract Aadhaar
{
    
    uint[] public userIdList;
    mapping (uint => uint) public userIsPresent;
    mapping ( string => uint) emailToId;
    mapping ( uint => userDetails ) public userInfo;     // mapping to user details
    
    uint public userCount;
    
    struct userDetails{
        string name;
        string contact;
        uint userid;
        uint usertype;
        // string gender;
        // string fathername;
        string location;
        string email;
        string pass;
        address userAddress;
    }
    
    function getUserId(string email) returns (uint) {
        return emailToId[email];
    }
    
    function getUserName(uint id) returns (string) {
        return userInfo[id].name;
    }
    
    function registerMe(string name,string contact,uint userid,uint usertype,string location,string email,string pass) public returns(bool){
        if(userIsPresent[userid] != 1)
        {
            userIsPresent[userid]=1;
            userIdList.push(userid);
            address adr=msg.sender;
            emailToId[email] = userid;
            userInfo[userid] = userDetails(name,contact,userid,usertype,location,email,pass,adr);
            userCount+=1;
            return true;
        }
        return false;
    }
}
