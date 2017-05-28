<?php
//分页显示菜品detail，JSON格式
header('Content-Type: application/json');
@$did=$_REQUEST['did'];
if(!isset($did)){
  echo "{}";
  return;//若客户没有提交菜品编号直接返回一个空对象;
}
//执行数据库操作
$conn=mysqli_connect("127.0.0.1","root","","kaifanla",3306);
$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql="SELECT DID,NAME,PRICE,IMG_LG,MATERIAL,detail FROM KF_DISH WHERE did=$did";
$result=mysqli_query($conn,$sql);

$row=mysqli_fetch_assoc($result);

//传回Json格式
$jsonString=json_encode($row);
echo $jsonString;

 ?>