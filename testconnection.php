<?php
$con = mysql_connect("130.127.88.248","root","root");

if (!$con) {
  die('Could not connect: ' . mysql_error());
}

mysql_select_db("weatherdb", $con);

$query = mysql_query("SELECT * FROM weatherdata");

mysql_close($con);
?>