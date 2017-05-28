<?php
//分页显示菜品，每页显示5条，以JSON格式
header('Content-Type: application/json');
@$kw=$_REQUEST['kw'];
if(!isset($kw)){
  echo "[]";
  return;//若客户没有提交查询关键字,直接返回一个空数组;
}
//执行数据库操作
$conn=mysqli_connect("127.0.0.1","root","","kaifanla",3306);
$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql="SELECT DID,NAME,PRICE,IMG_SM,MATERIAL FROM KF_DISH WHERE NAME LIKE '%$kw%' OR MATERIAL LIKE '%$kw%'";
$result=mysqli_query($conn,$sql);

$output=[];
while(($row=mysqli_fetch_assoc($result))!==NULL){
   $output[]=$row;
}
//传回Json格式
$jsonString=json_encode($output);
echo $jsonString;

 ?>