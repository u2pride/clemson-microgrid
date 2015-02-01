<?php
$con = mysql_connect("localhost","root","root");

if (!$con) {
  die('Could not connect: ' . mysql_error());
}

mysql_select_db("ClemsonMicrogrid", $con);

$configID = $_GET['configID'];

$query = mysql_query("SELECT * FROM Configurations WHERE ID = '$configID'");

$values = array();

$r = mysql_fetch_array($query);

$values[] = $r['Name'];
$values[] = $r['Season'];
$values[] = $r['4kV Num Solar Arrays'];
$values[] = $r['4kV Num Wind Turbines'];
$values[] = $r['4kV Num Battery Banks'];
$values[] = $r['C1 Num Solar Arrays'];
$values[] = $r['C1 Num Wind Turbines'];
$values[] = $r['C1 Num Battery Banks'];
$values[] = $r['C2 Num Solar Arrays'];
$values[] = $r['C2 Num Wind Turbines'];
$values[] = $r['C2 Num Battery Banks'];
$values[] = $r['C3 Num Solar Arrays'];
$values[] = $r['C3 Num Wind Turbines'];
$values[] = $r['C3 Num Battery Banks'];
$values[] = $r['C4 Num Solar Arrays'];
$values[] = $r['C4 Num Wind Turbines'];
$values[] = $r['C4 Num Battery Banks'];
$values[] = $r['C5A Num Solar Arrays'];
$values[] = $r['C5A Num Wind Turbines'];
$values[] = $r['C5A Num Battery Banks'];
$values[] = $r['C5B Num Solar Arrays'];
$values[] = $r['C5B Num Wind Turbines'];
$values[] = $r['C5B Num Battery Banks'];
$values[] = $r['C5C Num Solar Arrays'];
$values[] = $r['C5C Num Wind Turbines'];
$values[] = $r['C5C Num Battery Banks'];


print json_encode($values, JSON_NUMERIC_CHECK);

    
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