<?php
header('Content-Type: application/json');
//根据客户端提交的电话号码，返回其所有订单，以json格式
@$phone=$_REQUEST['phone'];
if(!isset($phone)){
   echo '[]';
   return;//若客户端没有提交电话号码,则返回空数组
}
//执行数据库操作
$conn=mysqli_connect("127.0.0.1","root","","kaifanla",3306);
$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql="SELECT OID,USER_NAME,ORDER_TIME,IMG_SM FROM KF_ORDER,KF_DISH WHERE KF_DISH.DID=KF_ORDER.DID AND phone='$phone'";
$result=mysqli_query($conn,$sql);

$output=[];
while(($row=mysqli_fetch_assoc($result))!==NULL){
   $output[]=$row;
}
//传回Json格式
$jsonString=json_encode($output);
echo $jsonString;

 ?>