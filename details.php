<?php
$con = mysql_connect("localhost","root","root");

if (!$con) {
  die('Could not connect: ' . mysql_error());
}

mysql_select_db("ClemsonMicrogrid", $con);

$query = mysql_query("SELECT * FROM DetailsTable WHERE Day = 1");

$series1 = array();
$series2 = array();
$series3 = array();

$circuit1load = array();
$circuit2load = array();
$circuit3load = array();

$circuit1solar = array();
$circuit2solar = array();
$circuit3solar = array();

$circuit1wind = array();
$circuit2wind = array();
$circuit3wind = array();


$series1['id'] = 'loaddata';
$series2['id'] = 'solardata';
$series3['id'] = 'winddata';



$r = mysql_fetch_array($query);
$series1['data'][0][] = "Circuit 1";
$series1['data'][0][] = $r['Circuit1_Load'];

$series1['data'][1][] = "Circuit 2";
$series1['data'][1][] = $r['Circuit2_Load'];

$series1['data'][2][] = "Circuit 3";
$series1['data'][2][] = $r['Circuit3_Load'];


$series2['data'][0][] = "Circuit 1";
$series2['data'][0][] = $r['Circuit1_Solar'];

$series2['data'][1][] = "Circuit 2";
$series2['data'][1][] = $r['Circuit2_Solar'];

$series2['data'][2][] = "Circuit 3";
$series2['data'][2][] = $r['Circuit3_Solar'];


$series3['data'][0][] = "Circuit 1";
$series3['data'][0][] = $r['Circuit1_Wind'];

$series3['data'][1][] = "Circuit 2";
$series3['data'][1][] = $r['Circuit2_Wind'];

$series3['data'][2][] = "Circuit 3";
$series3['data'][2][] = $r['Circuit3_Wind'];


$result = array();
array_push($result,$series1);
array_push($result,$series2);
array_push($result,$series3);

print json_encode($result, JSON_NUMERIC_CHECK);

mysql_close($con);
?>