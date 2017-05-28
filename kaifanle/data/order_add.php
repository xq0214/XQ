<?php
 header("Content-type:application/json");
//接受客户端提交的订单信息，保存订单，生成订单号，输出执行结果，以json格式

@$user_name=$_REQUEST['user_name'];
@$sex=$_REQUEST['sex'];
@$phone=$_REQUEST['phone'];
@$addr=$_REQUEST['addr'];
@$did=$_REQUEST['did'];
$order_time=time()*1000;//以毫秒为单位的当前系统时间

if(!isset($user_name) || !isset($sex) || !isset($phone) || !isset($addr) || !isset($did)){
    $output=[];
    $output["status"]="error";
    $output["msg"]="客户端提交的请求数据不足！";
    echo json_encode($output);
    return;
}

//
$conn=mysqli_connect('127.0.0.1','root','','kaifanla',3306);
$sql='SET NAMES UTF8';
mysqli_query($conn,$sql);
$sql="INSERT INTO KF_ORDER(OID,USER_NAME,SEX,PHONE,ADDR,DID,ORDER_TIME) VALUES (NULL,'$user_name','$sex','$phone','$addr','$did','$order_time')";
$result=mysqli_query($conn,$sql);

$output=[];
if($result){
    $output['status']='success';
    $output['oid']=mysqli_insert_id($conn);//获得最近的一条insert语句所生成的自增主键
}else{
    $output['status']='error';
    $output['msg']="数据库访问失败！SQL：$sql";
}

$jsonString=json_encode($output);
echo $jsonString;
?>