<?php
//分页显示菜品，每页显示5条，以JSON格式
header('Content-Type: application/json');
@$start=$_REQUEST['start'];
if(!isset($start)){
  $start=0;
}
$count=5;
//执行数据库操作
$conn=mysqli_connect("127.0.0.1","root","","kaifanla",3306);
$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);
$sql="SELECT DID,NAME,PRICE,IMG_SM,MATERIAL FROM KF_DISH LIMIT $start,$count";
$result=mysqli_query($conn,$sql);



if($result){
    $output=[];
       while(($row=mysqli_fetch_assoc($result))!=null){
          $output[]=$row;
       }
       //传回Json格式
       $jsonString=json_encode($output);
       echo $jsonString;
}else{
   echo -1;
}


 ?>