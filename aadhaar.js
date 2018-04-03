toAccount = 0 ;
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse([
  {
    "constant": true,
    "inputs": [],
    "name": "userCount",
    "outputs": [
      {
        "name": "",
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
        "type": "uint256"
      }
    ],
    "name": "userInfo",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "contact",
        "type": "string"
      },
      {
        "name": "userid",
        "type": "uint256"
      },
      {
        "name": "usertype",
        "type": "uint256"
      },
      {
        "name": "location",
        "type": "string"
      },
      {
        "name": "email",
        "type": "string"
      },
      {
        "name": "pass",
        "type": "string"
      },
      {
        "name": "userAddress",
        "type": "address"
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
        "type": "uint256"
      }
    ],
    "name": "userIsPresent",
    "outputs": [
      {
        "name": "",
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
        "type": "uint256"
      }
    ],
    "name": "userIdList",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
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
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "getUserName",
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
    "constant": false,
    "inputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "contact",
        "type": "string"
      },
      {
        "name": "userid",
        "type": "uint256"
      },
      {
        "name": "usertype",
        "type": "uint256"
      },
      {
        "name": "location",
        "type": "string"
      },
      {
        "name": "email",
        "type": "string"
      },
      {
        "name": "pass",
        "type": "string"
      }
    ],
    "name": "registerMe",
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
        "name": "email",
        "type": "string"
      }
    ],
    "name": "getUserId",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]);


realEstateContract = web3.eth.contract(abi);

//Provide below the new deployed address
contractInstance = realEstateContract.at('0xaf1176fb2d5cbce1157c95c608a4dc33a770211c');
data = "" ;

noofuser=contractInstance.userCount.call().c[0];
toAccount=noofuser;

function addUser(){
  //fetching values from html
  console.log("Called add user");
  name=$("#username").val();
  contact=$("#usercontact").val();
  usertype=$("#usertype").val();
  ulocation=$("#userlocation").val();
  email=$("#useremail").val();
  pass=$("#userpass").val();
  cpass=$("#usercpass").val();

  // userTypeId=parseInt( findUserTypeId(usertype) ); //finding id for user type


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
      // displayUsers();
    }
    else
    {
      alert("Passwords not matched");
    }
  }
}

// To display registered users
function displayUsers(){
  data = "";
  for (i = 0; i < contractInstance.userCount.call().c[0] ; i++ ) {

    var det = contractInstance.userInfo.call ( contractInstance.userIdList.call(i) ) + '';
    console.log(det);
  }
}

$('.login-form-submit').on("click",function(event){
  
  event.preventDefault();
  console.log("callse login");
  email=$("#email").val();
  pass=$("#pass").val();

  userId = parseInt( contractInstance.getUserId.call( email ) );

  allDetails = contractInstance.userInfo( userId )+'';

  var arrDetails = allDetails.split(',');

  passwd = arrDetails[6];

  console.log("pass: "+pass+" : "+passwd);

  if(passwd == pass)
  {
        window.location.href="./Home.html?temp="+userId;
        alert("login successfull");
  }
  else
  {
    alert("wrong password");
  }
});


displayUsers();