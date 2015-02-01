<?php
$con = mysql_connect("localhost","root","root");

if (!$con) {
  die('Could not connect: ' . mysql_error());
}

mysql_select_db("ClemsonMicrogrid", $con);

$query = mysql_query("SELECT * FROM TotalsTable WHERE Day = 1");

$series1 = array();
$series2 = array();
$series3 = array();

$series1['name'] = 'Total Load';
$series2['name'] = 'Total Solar Generation';
$series3['name'] = 'Total Wind Generation';



$r = mysql_fetch_array($query);
    $series1['y'] = $r['Total Load'];
    $series2['y'] = $r['Total Solar Generation'];
    $series3['y'] = $r['Total Wind Generation']; 

$series1['drilldown'] = 'loaddata';
$series2['drilldown'] = 'solardata';
$series3['drilldown'] = 'winddata';

$result = array();
array_push($result,$series1);
array_push($result,$series2);
array_push($result,$series3);

$finalresult = array();
$finalresult['name'] = 'Totals';
$finalresult['colorByPoint'] = 'true';
$finalresult['data'] = $result;

print json_encode($finalresult, JSON_NUMERIC_CHECK);

mysql_close($con);
?>