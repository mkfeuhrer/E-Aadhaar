toAccount = 0 ;
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[],"name":"userCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userInfo","outputs":[{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"userid","type":"uint256"},{"name":"usertype","type":"uint256"},{"name":"location","type":"string"},{"name":"email","type":"string"},{"name":"pass","type":"string"},{"name":"userAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userIsPresent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userIdList","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"getUserName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"userid","type":"uint256"},{"name":"usertype","type":"uint256"},{"name":"location","type":"string"},{"name":"email","type":"string"},{"name":"pass","type":"string"}],"name":"registerMe","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"email","type":"string"}],"name":"getUserId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]');

realEstateContract = web3.eth.contract(abi);
//Provide below the new deployed address
contractInstance = realEstateContract.at('0xa7eb8a367c3e11b7d84b5ea9d688a711c84fccd1');

var url = window.location.href + '';
console.log(url);
var arr = url.split("=");
userId=arr[1];
console.log("User Id: "+userId);

var naam = contractInstance.getUserName.call(userId)+'';
$('#welcome').text("Welcome " + naam);

function showDetails()
{
  data = "";
  allDetails = contractInstance.userInfo( userId )+'';
  var arrDetails = allDetails.split(',');
  console.log(arrDetails);
  $('#showusername').text(arrDetails[0]);
  $('#showemail').text(arrDetails[5]);
  $('#showaddress').text(arrDetails[6]);
  $('#showcontact').text(arrDetails[1]);
}

$('#logout').on("click",function(event){
  
  event.preventDefault();
  console.log("Logging out");
  window.location.href="./login.html";
});

showDetails();