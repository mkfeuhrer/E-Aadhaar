toAccount = 0 ;
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[],"name":"userCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"verified","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userInfo","outputs":[{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"userid","type":"uint256"},{"name":"usertype","type":"uint256"},{"name":"email","type":"string"},{"name":"pass","type":"string"},{"name":"aadhaar","type":"string"},{"name":"userAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userIsPresent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userIdList","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"getUserName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"userid","type":"uint256"},{"name":"usertype","type":"uint256"},{"name":"email","type":"string"},{"name":"pass","type":"string"},{"name":"aadhaar","type":"string"}],"name":"registerMe","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"getVerifyStatus","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"email","type":"string"}],"name":"getUserId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]');
realEstateContract = web3.eth.contract(abi);

//Provide below the new deployed address
contractInstance = realEstateContract.at('0x0b3acfa89f1d00ced7ae22d8105ac60a6801a767');
data = "" ;

noofuser=contractInstance.userCount.call().c[0];
toAccount=noofuser;
// alert("no of accounts are" + toAccount);

function findUserTypeId ( userType ){
  if(userType == "User" || userType == "user")
    return "0";
  else if(userType == "Admin" || userType == "admin")
    return "1";
}

function addUser(){
  //fetching values from html
  console.log("Called add user");
  name=$("#username").val();
  contact=$("#usercontact").val();
  usertype=$("#usertype").val();
  ulocation=$("#useraddress").val();
  email=$("#useremail").val();
  pass=$("#userpass").val();
  cpass=$("#usercpass").val();

  userTypeId = parseInt(findUserTypeId(usertype)); //finding id for user type

  if( name=="" || contact == "" || usertype == "" || ulocation == "" || email == "" || pass == "" || cpass == "" )
  {
    alert("Fill all the details.");
  }
  else{
    if(pass == cpass){
      // comparing passwords
      contractInstance.registerMe(name,contact,toAccount,userTypeId,email,pass,ulocation,{ from: web3.eth.accounts[toAccount],gas: 3000000});
      numofuser=contractInstance.userCount.call().c[0];
      // alert(numofuser);
      toAccount=numofuser;
      alert("Successfully Registered");
      window.location.href="./login.html";
    }
    else
    {
      alert("Passwords not matched");
    }
  }
}

$('#login-form-submit').on("click",function(event){
  
  event.preventDefault();
  console.log("Now logging in");
  email=$("#email").val();
  pass=$("#pass").val();
  console.log(email + " " + pass);
  
  userId = parseInt( contractInstance.getUserId.call( email ) );
  console.log("userId is" +userId);
  allDetails = contractInstance.userInfo( userId )+'';
  var arrDetails = allDetails.split(',');
  console.log(arrDetails);
  passwd = arrDetails[5]; // fetching user password
  console.log("pass: "+pass+" : "+passwd);

  if(passwd == pass)
  {
    if(arrDetails[3]== "0")
    {
      window.location.href="./home.html?temp="+userId;
      console.log("login successfull");
    }
    else if(arrDetails[3]== "1")
    {
      window.location.href="./admin.html?temp="+userId;
      console.log("login successfull");
    }
  }
  else
  {
    alert("wrong password");
  }
});