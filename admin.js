toAccount = 0 ;
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[],"name":"userCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"verified","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userInfo","outputs":[{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"userid","type":"uint256"},{"name":"usertype","type":"uint256"},{"name":"email","type":"string"},{"name":"pass","type":"string"},{"name":"aadhaar","type":"string"},{"name":"userAddress","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userIsPresent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userIdList","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"getUserName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"contact","type":"string"},{"name":"userid","type":"uint256"},{"name":"usertype","type":"uint256"},{"name":"email","type":"string"},{"name":"pass","type":"string"},{"name":"aadhaar","type":"string"}],"name":"registerMe","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"getVerifyStatus","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"email","type":"string"}],"name":"getUserId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]');
realEstateContract = web3.eth.contract(abi);
//Provide below the new deployed address
contractInstance = realEstateContract.at('0x0b3acfa89f1d00ced7ae22d8105ac60a6801a767');

var url = window.location.href + '';
console.log(url);
var arr = url.split("=");
userId = arr[1];
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
  $('#showemail').text(arrDetails[4]);
  $('#showaddress').text(arrDetails[6]+" "+arrDetails[7]);
  $('#showcontact').text(arrDetails[1]);
  $('#showid').text(arrDetails[8]);
}

function showUsers()
{
  data = "";

  for (i = 0; i < contractInstance.userCount.call().c[0] ; i++ ) {
    str = contractInstance.userInfo.call(i)+'';
    console.log(str);
    var arr = str.split(',');
    id = parseInt(arr[2]);
    verifystatus = contractInstance.getVerifyStatus.call(id);   
    console.log("usertype :" + arr[3]); 
    if(arr[3] == "0")
      data += "<tr> <td> "+ arr[0] + "</td><td> "+ verifystatus + "</td><td> " + arr[4] + "</td><td> " + arr[1] + "</td><td> <button id=" + i +" class='btn btn-default'>Verify</button></td></tr>";
    else continue;
  }
    $("#userTable").html(data);
}

$('#logout').on("click",function(event){
  
  event.preventDefault();
  console.log("Logging out");
  window.location.href="./login.html";
});

showDetails();
showUsers();