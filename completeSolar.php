<?php
$con = mysql_connect("localhost","root","root");

if (!$con) {
  die('Could not connect: ' . mysql_error());
}

mysql_select_db("ClemsonMicrogrid", $con);

$configID = $_GET['configID'];

//Passing ConfigID to Determine where to Grab the Solar Powers

if ($configID == 1) {
    $query = mysql_query("SELECT * FROM GenerationDataConfig1Fall");
} elseif ($configID == 2) {
    $query = mysql_query("SELECT * FROM GenerationDataConfig1Winter");
} elseif ($configID == 3) {
    $query = mysql_query("SELECT * FROM GenerationDataConfig2Fall");
} elseif ($configID == 4) {
    $query = mysql_query("SELECT * FROM GenerationDataConfig2Winter");
} elseif ($configID == 5) {
    $query = mysql_query("SELECT * FROM GenerationDataConfig3Fall");
} elseif ($configID == 6) {
    $query = mysql_query("SELECT * FROM GenerationDataConfig3Winter");
}

$series0 = array();
$series1 = array();
$series2 = array();
$series3 = array();
$series4 = array();
$series5 = array();
$series6 = array();
$series7 = array();
$series8 = array();
$series9 = array();


$series0['name'] = 'Time';
$series1['name'] = 'Total Solar';
$series2['name'] = 'Feeder 1';
$series3['name'] = 'Feeder 2';
$series4['name'] = 'Feeder 3';
$series5['name'] = 'Feeder 4';
$series6['name'] = 'Feeder 5a';
$series7['name'] = 'Feeder 5b';
$series8['name'] = 'Feeder 5c';
$series9['name'] = '4kV Sub';


while ($r = mysql_fetch_array($query)) {
    $series0['data'][] = $r['Time']/60;
    $series1['data'][] = ($r['4kV Ppva'] + $r['C1 Ppva'] + $r['C2 Ppva'] + $r['C3 Ppva'] + $r['C4 Ppva']+ $r['C5A Ppva']+ $r['C5B Ppva'] + $r['C5C Ppva']) / 1000;
    $series2['data'][] = $r['C1 Ppva'] / 1000;
    $series3['data'][] = $r['C2 Ppva'] / 1000; 
    $series4['data'][] = $r['C3 Ppva'] / 1000; 
    $series5['data'][] = $r['C4 Ppva'] / 1000; 
    $series6['data'][] = $r['C5A Ppva'] / 1000; 
    $series7['data'][] = $r['C5B Ppva'] / 1000; 
    $series8['data'][] = $r['C5C Ppva'] / 1000; 
    $series9['data'][] = $r['4kV Ppva'] / 1000; 

}


$result = array();
array_push($result,$series0);
array_push($result,$series1);
array_push($result,$series2);
array_push($result,$series3);
array_push($result,$series4);
array_push($result,$series5);
array_push($result,$series6);
array_push($result,$series7);
array_push($result,$series8);
array_push($result,$series9);



print json_encode($result, JSON_NUMERIC_CHECK);

mysql_close($con);
?>