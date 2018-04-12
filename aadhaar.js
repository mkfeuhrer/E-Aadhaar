toAccount = 0 ;
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[],"name":"userCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userInfo","outputs":[{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"userid","type":"uint256"},{"name":"usertype","type":"uint256"},{"name":"location","type":"string"},{"name":"email","type":"string"},{"name":"pass","type":"string"},{"name":"userAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userIsPresent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userIdList","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"getUserName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"userid","type":"uint256"},{"name":"usertype","type":"uint256"},{"name":"location","type":"string"},{"name":"email","type":"string"},{"name":"pass","type":"string"}],"name":"registerMe","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"email","type":"string"}],"name":"getUserId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]');
realEstateContract = web3.eth.contract(abi);

//Provide below the new deployed address
contractInstance = realEstateContract.at('0xa7eb8a367c3e11b7d84b5ea9d688a711c84fccd1');
data = "" ;

noofuser=contractInstance.userCount.call().c[0];
toAccount=noofuser;

function findUserTypeId ( userType ){
  if(userType == "User")
    return "0";
  else if(userType == "Admin")
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

  userTypeId=parseInt(findUserTypeId(usertype) ); //finding id for user type

  if( name=="" || contact == "" || usertype == "" || ulocation == "" || email == "" || pass == "" || cpass == "" )
  {
    alert("Fill all the details.");
  }
  else{

    if(pass == cpass){
      // comparing passwords
      contractInstance.registerMe(name,contact,toAccount,userTypeId,ulocation,email,pass,{ from: web3.eth.accounts[toAccount],gas: 3000000});
      numofuser=contractInstance.userCount.call().c[0];
      toAccount=numofuser;
      alert("Successfully Registered");
      window.location.href="./login.html";
      // displayUsers();
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

  allDetails = contractInstance.userInfo( userId )+'';
  var arrDetails = allDetails.split(',');
  passwd = arrDetails[6]; // fetching user password
  console.log("pass: "+pass+" : "+passwd);

  if(passwd == pass)
  {
    if(arrDetails[3]==0)
    {
        window.location.href="./home.html?temp="+userId;
      console.log("login successfull");
    }
    else if(arrDetails[3]==1)
    {
        window.location.href="./Admin.html?temp="+userId;
      console.log("login successfull");
    }
  }
  else
  {
    alert("wrong password");
  }
});