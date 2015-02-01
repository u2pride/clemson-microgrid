<?php

$con = mysql_connect("localhost","root","root");

if (!$con) {
die('Could not connect: ' . mysql_error());
}

mysql_select_db("openPDCTest", $con);

$result = mysql_query("SELECT * FROM `PMU Values`") or die ("Dadasdad");

while($row = mysql_fetch_array($result)) {
echo $row['PMUName'] . "/" . $row['Voltage']. "/" ;
}

mysql_close($con);
?>