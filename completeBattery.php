<?php
$con = mysql_connect("localhost","root","root");

if (!$con) {
  die('Could not connect: ' . mysql_error());
}

mysql_select_db("ClemsonMicrogrid", $con);

$configID = $_GET['configID'];

//Passing ConfigID as the Season - Update these based of what season each profile is.

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
$series1['name'] = 'Total Battery';
$series2['name'] = 'Feeder 1';
$series3['name'] = 'Feeder 2';
$series4['name'] = 'Feeder 3';
$series5['name'] = 'Feeder 4';
$series6['name'] = 'Feeder 5a';
$series7['name'] = 'Feeder 5b';
$series8['name'] = 'Feeder 5c';
$series9['name'] = '4kV Sub';


while ($r = mysql_fetch_array($query)) {
  if (($r['Time']) <= 345) {
    $series0['data'][] = $r['Time']/60*4;
    $series1['data'][] = ($r['4kV AEC'] + $r['C1 AEC'] + $r['C2 AEC'] + $r['C3 AEC'] + $r['C4 AEC']+ $r['C5A AEC']+ $r['C5B AEC'] + $r['C5C AEC']);
    $series2['data'][] = $r['C1 AEC'];
    $series3['data'][] = $r['C2 AEC']; 
    $series4['data'][] = $r['C3 AEC']; 
    $series5['data'][] = $r['C4 AEC']; 
    $series6['data'][] = $r['C5A AEC']; 
    $series7['data'][] = $r['C5B AEC']; 
    $series8['data'][] = $r['C5C AEC'];
    $series9['data'][] = $r['4kV AEC']; 
  }
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