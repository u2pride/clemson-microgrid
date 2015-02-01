<?php
$con = mysql_connect("localhost","root","root");

if (!$con) {
  die('Could not connect: ' . mysql_error());
}

mysql_select_db("ClemsonMicrogrid", $con);

$time = $_GET['time'];
$configID = $_GET['configID'];

if ($configID == 1) {
    $query = mysql_query("SELECT * FROM LoadDataFall WHERE Time = '$time'");
} elseif ($configID == 2) {
    $query = mysql_query("SELECT * FROM LoadDataWinter WHERE Time = '$time'");
} elseif ($configID == 3) {
    $query = mysql_query("SELECT * FROM LoadDataFall WHERE Time = '$time'");
} elseif ($configID== 4) {
    $query = mysql_query("SELECT * FROM LoadDataWinter WHERE Time = '$time'");
} elseif ($configID== 5) {
    $query = mysql_query("SELECT * FROM LoadDataFall WHERE Time = '$time'");
} elseif ($configID== 6) {
    $query = mysql_query("SELECT * FROM LoadDataWinter WHERE Time = '$time'");
}


$result = array();

$r = mysql_fetch_array($query);

$result[] = $r['Utility Primary'];
$result[] = $r['Incoming2'];
$result[] = $r['Feeder1'];
$result[] = $r['Feeder2'];
$result[] = $r['Feeder3'];
$result[] = $r['Feeder4'];
$result[] = $r['Feeder5A'];
$result[] = $r['Feeder5B'];
$result[] = $r['Feeder5C'];


print json_encode($result, JSON_NUMERIC_CHECK);

    
/*


$query = mysql_query("SELECT * FROM LoadData");

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
$series1['name'] = 'Total Load';
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
    $series1['data'][] = $r['Utility Primary'];
    $series2['data'][] = $r['Feeder1'];
    $series3['data'][] = $r['Feeder2']; 
    $series4['data'][] = $r['Feeder3']; 
    $series5['data'][] = $r['Feeder4']; 
    $series6['data'][] = $r['Feeder5A']; 
    $series7['data'][] = $r['Feeder5B']; 
    $series8['data'][] = $r['Feeder5C']; 
    $series9['data'][] = $r['Incoming2']; 

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
*/
mysql_close($con);
?>