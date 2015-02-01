//Initial Chart Options-Setup
/////////////////////////////////////////////////////////////////////////////////

//Chart Options/Setup
var completeLoadChartOptions = {
        chart: {
            renderTo: 'loadchart',
            type: 'area',
            marginRight: 130,
            marginBottom: 25,
            zoomType: 'x'
        },
        colors: ['#522D80', '#522D80', '#522D80 '],
        plotOptions : {
            series: {
                marker: {
                    radius: 1
                }
            }
        },
        title: {
            text: 'Load Profiles',
            x: -20 //center
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Hours',
                enabled: true
            }
        },
        yAxis: {
            title: {
                text: 'Load [MW]'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            enabled: false
        },
        tooltip: {
            formatter: function() {
                    return  '<b>Time: </b>' + this.x + '<br />' + '<b>Load: </b>' + (this.y*1000).toFixed(2) + ' kW';
            }
        },
        series: [{}],
    
    }

var completeSolarChartOptions = {
        chart: {
            renderTo: 'solarchart',
            type: 'area',
            marginRight: 130,
            marginBottom: 25,
            zoomType: 'x'
        },
        colors: ['#522D80', '#522D80', '#522D80'],
        plotOptions : {
            series: {
                marker: {
                    radius: 1
                }
            }
        },
        title: {
            text: 'Solar Profiles',
            x: -20 //center
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Hours',
                enabled: true
            }
        },
        yAxis: {
            title: {
                text: 'Power [MW]'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            enabled: false
        },
        tooltip: {
            formatter: function() {
                    return  '<b>Time: </b>' + this.x + '<br />' + '<b>Power: </b>' + (this.y*1000).toFixed(2) + ' kW';
            }
        },
        series: [{}],
    
    }

var completeWindChartOptions = {
        chart: {
            renderTo: 'windchart',
            type: 'area',
            marginRight: 130,
            marginBottom: 25,
            zoomType: 'x'
        },
        plotOptions : {
            series: {
                marker: {
                    radius: 1
                },
                dataGrouping: {
                    enabled: false    
                }
            }
        },
        colors: ['#522D80', '#522D80', '#522D80'],
        title: {
            text: 'Solar Profiles',
            x: -20 //center
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Hours',
                enabled: true
            }
        },
        yAxis: {
            title: {
                text: 'Power [MW]'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            enabled: false
        },
        tooltip: {
            formatter: function() {
                    return  '<b>Time: </b>' + this.x + '<br />' + '<b>Power: </b>' + (this.y*1000).toFixed(2) + ' kW';
            }
        },
        series: [{}],
    
    }

var completeBatteryChartOptions = {
        chart: {
            renderTo: 'batterychart',
            type: 'column',
            marginRight: 130,
            marginBottom: 25,
            zoomType: 'x'
        },
        plotOptions : {
            series: {
                marker: {
                    radius: 1
                },
                dataGrouping: {
                    enabled: false    
                }
            }
        },
        colors: ['#522D80', '#522D80', '#522D80'],
        title: {
            text: 'Battery Available Energy Capacity',
            x: -20 //center
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Hours',
                enabled: true
            }
        },
        yAxis: {
            title: {
                text: 'Amp-Hours [A-h]'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            enabled: false
        },
        tooltip: {
            formatter: function() {
                    return  '<b>Time: </b>' + this.x + '<br />' + '<b>AEC: </b>' + this.y.toFixed(2) + ' Ah';
            }
        },
        series: [{}],
    
    }

//Data Arrays for Load Profile Chart
var loadresponseTotal = [];   
var loadresponse4kVSub = [];
var loadresponseCircuit1 = [];   
var loadresponseCircuit2 = [];
var loadresponseCircuit3 = [];
var loadresponseCircuit4 = [];
var loadresponseCircuit5a = [];
var loadresponseCircuit5b = [];
var loadresponseCircuit5c = [];

//Data Arrays for Solar Profile Chart
var solarresponseTotal = [];   
var solarresponse4kVSub = [];
var solarresponseCircuit1 = [];   
var solarresponseCircuit2 = [];
var solarresponseCircuit3 = [];
var solarresponseCircuit4 = [];
var solarresponseCircuit5a = [];
var solarresponseCircuit5b = [];
var solarresponseCircuit5c = [];

//Data Arrays for Wind Profile Chart
var windresponseTotal = [];   
var windresponse4kVSub = [];
var windresponseCircuit1 = [];   
var windresponseCircuit2 = [];
var windresponseCircuit3 = [];
var windresponseCircuit4 = [];
var windresponseCircuit5a = [];
var windresponseCircuit5b = [];
var windresponseCircuit5c = [];

//Data Arrays for Battery Chart
var batteryresponseTotal = [];   
var batteryresponse4kVSub = [];
var batteryresponseCircuit1 = [];   
var batteryresponseCircuit2 = [];
var batteryresponseCircuit3 = [];
var batteryresponseCircuit4 = [];
var batteryresponseCircuit5a = [];
var batteryresponseCircuit5b = [];
var batteryresponseCircuit5c = [];


//Initializing Variables
var timeOfSimulation = 600;
var secsBetweenUpdates = 1.25;
var timer;
var configID = 1;
var currenttime = new Date();

//Global Chart Variables
var loadchart;
var solarchart;
var windchart;
var batterychart;

var i = 0;

//Emissions
var totalCO2Emissions = 0;
var totalNOEmissions = 0;
var totalSO2Emissions = 0;




///////////////////////////////////////////////////////////////////////////////
/////// Update Functions
///////////////////////////////////////////////////////////////////////////////


// Start the Update - Grab the Latest Load Data First
function updateData(){
    
    //reset current time upon Simulation Reset
    if (timeOfSimulation == 0) {
        currenttime.setSeconds(0);
        currenttime.setMinutes(0);
        currenttime.setHours(0);
        console.log(currenttime);
    }
    
    
    timeOfSimulation = timeOfSimulation + 15;
    currenttime.setMilliseconds(1000*15*60);
    
        console.log("TIMES");
        console.log(currenttime);
        console.log(timeOfSimulation);
   
    
    //If Sample Day is Over, Stop Updating
    if (timeOfSimulation != 575) { 
        
        if (timeOfSimulation > 1425)
            
            timeOfSimulation = 0;
        
        //Grab the Latest Load Data
        $.getJSON('loadValues.php?time='+timeOfSimulation+'&configID='+configID, function(loadvalues) {        
            nowUpdateWeatherData(loadvalues);
        });    

        timer = setTimeout(function(){updateData()},secsBetweenUpdates*1000);
    } else {
        clearTimeout(timer);    
    }
    


}


//Grab Weather Data after Getting Load Data
function nowUpdateWeatherData(loadValues) {
    $.getJSON('weatherData.php?time='+timeOfSimulation+'&configID='+configID, function(weatherData) {
        nowUpdateGenerationData(loadValues, weatherData); 
        console.log("--------weather-------");
        console.log(weatherData);
    });

}


// Once PHP Call for Load Data has Finished - Now Grab the latest generation data
function nowUpdateGenerationData(loadValues, weatherData) {
        $.getJSON('generationValues.php?time='+timeOfSimulation+'&configID='+configID, function(generationvalues) {
            updateVisualization(loadValues, generationvalues, weatherData);        
        });
}


// Now that we have the Load and Generation Data - Update the Visualization
function updateVisualization(loadValues, generationValues, weatherData) {

    //Update Time
    var displaytime = currenttime.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    $(".systemtime").html(displaytime);
    //if (timeOfSimulation >= 720) {
        //$("#ampm").html(" PM");
    //}

    
    //Add Marker to Current Battery Point
    if (timeOfSimulation % 60 == 0) {
        var pointToChange = batterychart.series[1].data[timeOfSimulation/60];
        pointToChange.update ({
            color: '#F66733' });
        
    }
    
    //var spointToChange = solarchart.series[2].points[timeOfSimulation/60];
    //console.log("HEYYY");
    //console.log(solarchart.series[1].points[56].series[c]);
    //    spointToChange.update ({
    //        color: '#F66733' });
    
    
    
    //Update Weather Part of Dashboard
    $('#temp').html(weatherData[2]);
    $('#windspeed').html(weatherData[1]);
    $('#irradiance').html(weatherData[0]);
     
    
    // Update Everything Else
    var currentTotalLoad, currentTotalSolar, currentTotalWind, currentTotalBattery;
    var percentSolar, percentWind, percentBattery;
    currentTotalLoad = Math.abs(loadValues[1] + loadValues[2] + loadValues[3] + loadValues[4] + loadValues[5] + loadValues[6] + loadValues[7] + loadValues[8]);
    currentTotalSolar = Math.abs(generationValues[1] + generationValues[5] + generationValues[9] + generationValues[13] + generationValues[17] + generationValues[21] + generationValues[25] + generationValues[29]);
    currentTotalWind = Math.abs(generationValues[2] + generationValues[6] + generationValues[10] + generationValues[14] + generationValues[18] + generationValues[22] + generationValues[26] + generationValues[30]);
    currentTotalBattery = Math.abs(generationValues[0] + generationValues[4] + generationValues[8] + generationValues[12] + generationValues[16] + generationValues[20] + generationValues[24] + generationValues[28]);
    
    percentSolar = Math.round(currentTotalSolar/currentTotalLoad*100);
    percentWind = Math.round(currentTotalWind/currentTotalLoad*100);
    percentBattery = Math.round(currentTotalBattery/currentTotalLoad*100);
    
    $("#totalSolarPercent").width(percentSolar + "%");
    $("#totalWindPercent").width(percentWind + "%");
    $("#totalBatteryPercent").width(percentBattery + "%");


    //Update Emissions Saved Values
    
    totalCO2Emissions += currentTotalLoad/4000*778;
    totalNOEmissions += currentTotalLoad/4000*0.5;
    totalSO2Emissions += currentTotalLoad/4000*1.5;
    
    $("#co2emissions").html(Math.round(totalCO2Emissions));
    $("#noemissions").html(Math.round(totalNOEmissions));
    $("#so2emissions").html(Math.round(totalSO2Emissions));
    
    $("#totalClemsonLoadNumber").html(Number((currentTotalLoad/1000).toFixed(2)));
    
    
    
    
    /*
    console.log("----------------000000------------");
    console.log(currentTotalLoad);
    console.log(currentTotalSolar);
    console.log(currentTotalWind);
    console.log(currentTotalBattery);
    console.log(percentSolar);
    console.log(percentWind);
    console.log(percentBattery);
    */
    
    /*
        console.log("DEBUG ME");
        console.log(loadtotal);
        
        console.log("POWERS");
        console.log(solarpower);
        console.log(windpower); 
        console.log(batterypower);
        
        console.log("PERCENTS");
        console.log(solarpercent);
        console.log(windpercent);
        console.log(batterypercent);
    */
    
    // Dashboard Update on Each Individual Circuit
    var generationtotal, solarpercent, windpercent, batterypercent;
    var loadtotal, solarpower, windpower, batterypower;
    
    batterypower = generationValues[0];
    solarpower = generationValues[1];
    windpower = generationValues[2];
    
    //Solution #2 - Using added up load value to determine percentages of each generation --- OPTION: Including battery as the load 
    if (batterypower < 0) {
        loadtotal = loadValues[1];
        
        solarpercent = Math.round(solarpower/loadtotal*100);
        windpercent = Math.round(windpower/loadtotal*100);
        batterypercent = Math.round(Math.abs(batterypower)/loadtotal*100);
        
    } else {
        loadtotal = loadValues[1];

        //Option 1 - include battery as load
        solarpercent = Math.round(solarpower/(loadtotal + Math.abs(batterypower))*100);
        windpercent = Math.round(windpower/(loadtotal + Math.abs(batterypower))*100);
        batterypercent = 0;
    }
    
    
    //Update Numbers on Microgrid Visualization
    $("#4kVbatterytext").html(Math.abs(batterypower) + " kW");
    $("#4kVwindtext").html(windpower + " kW");
    $("#4kVsolartext").html(solarpower + " kW");
    $("#4kVloadtext").html(Math.round(loadValues[1]) + " kW");
    
    //Turn Arrows off if No Power Flow - Change Direction Too
    if (generationValues[0] == 0) {
        $('#4kVbatteryarrow').attr("src", 'img/ArrowLeftStop.png');
    } else if (generationValues[0] < 0) {
        $('#4kVbatteryarrow').attr("src", 'img/ArrowLeft.gif');
    } else {
        $('#4kVbatteryarrow').attr("src", 'img/ArrowRight.gif');
    }
        
    //Turn On and Off Arrows
    if (generationValues[1] == 0) {
        $('#4kVsolararrow').attr("src", 'img/ArrowRightStop.png');
    } else {
        $('#4kVsolararrow').attr("src", 'img/ArrowRight.gif');
    }
    if (generationValues[2] == 0) {
        $('#4kVwindarrow').attr("src", 'img/ArrowLeftStop.png');
    } else {
        $('#4kVwindarrow').attr("src", 'img/ArrowLeft.gif');
    }
    
    //Turn On and Off the Wind Turbine
    if (generationValues[2] != 0 && ($('#4kVwindturbine').attr("src") != 'img/windOn.gif')) {
        $('#4kVwindturbine').attr("src", 'img/windOn.gif');
    } else if ((generationValues[2] == 0) && ($("#4kVwindturbine").attr('src') != 'img/wind.png')) {
        $('#4kVwindturbine').attr("src", 'img/wind.png');
    }

    $('#4kVload').html(Math.round(loadValues[1]));
    $("#4kVbatterypower").html(batterypercent);
    $("#4kVsolarpower").html(solarpercent);
    $("#4kVwindpower").html(windpercent);
    $("#4kVbatterySOC").removeAttr('style').css("width",(generationValues[3]*100) + "%");
    
    if (generationValues[3] > 1) {
        $("#4kVbatterySOC").html(100 + "%");
    } else {
        $("#4kVbatterySOC").html(Math.round(generationValues[3]*100) + "%");
    }
    

    
    /////////////////////////////////////////////////////////
    
    batterypower = generationValues[4];
    solarpower = generationValues[5];
    windpower = generationValues[6];
    
    //Solution #2 - Using added up load value to determine percentages of each generation --- OPTION: Including battery as the load 
    if (batterypower < 0) {
        loadtotal = loadValues[2];
        
        solarpercent = Math.round(solarpower/loadtotal*100);
        windpercent = Math.round(windpower/loadtotal*100);
        batterypercent = Math.round(Math.abs(batterypower)/loadtotal*100);
        
    } else {
        loadtotal = loadValues[2];

        //Option 1 - include battery as load
        solarpercent = Math.round(solarpower/(loadtotal + Math.abs(batterypower))*100);
        windpercent = Math.round(windpower/(loadtotal + Math.abs(batterypower))*100);
        batterypercent = 0;
    }
    
    //Update Numbers on Microgrid Visualization
    $("#C1batterytext").html(Math.abs(batterypower) + " kW");
    $("#C1windtext").html(windpower + " kW");
    $("#C1solartext").html(solarpower + " kW");
    $("#C1loadtext").html(Math.round(loadValues[2]) + " kW");
    
    //Turn Arrows off if No Power Flow - Change Direction Too
    if (generationValues[4] == 0) {
        $('#C1batteryarrow').attr("src", 'img/ArrowLeftStop.png');
    } else if (generationValues[4] < 0) {
        $('#C1batteryarrow').attr("src", 'img/ArrowLeft.gif');
    } else {
        $('#C1batteryarrow').attr("src", 'img/ArrowRight.gif');
    }
        
    //Turn On and Off Arrows
    if (generationValues[5] == 0) {
        $('#C1solararrow').attr("src", 'img/ArrowRightStop.png');
    } else {
        $('#C1solararrow').attr("src", 'img/ArrowRight.gif');
    }
    if (generationValues[6] == 0) {
        $('#C1windarrow').attr("src", 'img/ArrowLeftStop.png');
    } else {
        $('#C1windarrow').attr("src", 'img/ArrowLeft.gif');
    }
    
    //Turn On and Off the Wind Turbine
    if (generationValues[6] != 0 && ($('#C1windturbine').attr("src") != 'img/windOn.gif')) {
        $('#C1windturbine').attr("src", 'img/windOn.gif');
    } else if ((generationValues[6] == 0) && ($("#C1windturbine").attr('src') != 'img/wind.png')) {
        $('#C1windturbine').attr("src", 'img/wind.png');
    }

    $('#C1load').html(Math.round(loadValues[2]));
    $("#C1batterypower").html(batterypercent);
    $("#C1solarpower").html(solarpercent);
    $("#C1windpower").html(windpercent);
    $("#C1batterySOC").removeAttr('style').css("width",(generationValues[7]*100) +"%");

    if (generationValues[7] > 1) {
        $("#C1batterySOC").html(100 + "%");
    } else {
        $("#C1batterySOC").html(Math.round(generationValues[7]*100) + "%");
    }
    
    /////////////////////////////////////////////////////////
    
    batterypower = generationValues[8];
    solarpower = generationValues[9];
    windpower = generationValues[10];
    
    //Solution #2 - Using added up load value to determine percentages of each generation --- OPTION: Including battery as the load 
    if (batterypower < 0) {
        loadtotal = loadValues[3];
        
        solarpercent = Math.round(solarpower/loadtotal*100);
        windpercent = Math.round(windpower/loadtotal*100);
        batterypercent = Math.round(Math.abs(batterypower)/loadtotal*100);
        
    } else {
        loadtotal = loadValues[3];

        //Option 1 - include battery as load
        solarpercent = Math.round(solarpower/(loadtotal + Math.abs(batterypower))*100);
        windpercent = Math.round(windpower/(loadtotal + Math.abs(batterypower))*100);
        batterypercent = 0;
    }
    
    //Update Numbers on Microgrid Visualization
    $("#C2batterytext").html(Math.abs(batterypower) + " kW");
    $("#C2windtext").html(windpower + " kW");
    $("#C2solartext").html(solarpower + " kW");
    $("#C2loadtext").html(Math.round(loadValues[3]) + " kW");
    
    //Turn Arrows off if No Power Flow - Change Direction Too
    if (generationValues[8] == 0) {
        $('#C2batteryarrow').attr("src", 'img/ArrowLeftStop.png');
    } else if (generationValues[8] < 0) {
        $('#C2batteryarrow').attr("src", 'img/ArrowLeft.gif');
    } else {
        $('#C2batteryarrow').attr("src", 'img/ArrowRight.gif');
    }
        
    //Turn On and Off Arrows
    if (generationValues[9] == 0) {
        $('#C2solararrow').attr("src", 'img/ArrowRightStop.png');
    } else {
        $('#C2solararrow').attr("src", 'img/ArrowRight.gif');
    }
    if (generationValues[10] == 0) {
        $('#C2windarrow').attr("src", 'img/ArrowLeftStop.png');
    } else {
        $('#C2windarrow').attr("src", 'img/ArrowLeft.gif');
    }
    
    //Turn On and Off the Wind Turbine
    if (generationValues[10] != 0 && ($('#C2windturbine').attr("src") != 'img/windOn.gif')) {
        $('#C2windturbine').attr("src", 'img/windOn.gif');
    } else if ((generationValues[10] == 0) && ($("#C2windturbine").attr('src') != 'img/wind.png')) {
        $('#C2windturbine').attr("src", 'img/wind.png');
    }

    $('#C2load').html(Math.round(loadValues[3]));
    $("#C2batterypower").html(batterypercent);
    $("#C2solarpower").html(solarpercent);
    $("#C2windpower").html(windpercent);
    $("#C2batterySOC").removeAttr('style').css("width",(generationValues[11]*100) +"%");
    
    if (generationValues[11] > 1) {
        $("#C2batterySOC").html(100 + "%");
    } else {
        $("#C2batterySOC").html(Math.round(generationValues[11]*100) + "%");
    }
    
    
    /////////////////////////////////////////////////////////
    
    batterypower = generationValues[12];
    solarpower = generationValues[13];
    windpower = generationValues[14];
    
    //Solution #2 - Using added up load value to determine percentages of each generation --- OPTION: Including battery as the load 
    if (batterypower < 0) {
        loadtotal = loadValues[4];
        
        solarpercent = Math.round(solarpower/loadtotal*100);
        windpercent = Math.round(windpower/loadtotal*100);
        batterypercent = Math.round(Math.abs(batterypower)/loadtotal*100);
        
    } else {
        loadtotal = loadValues[4];

        //Option 1 - include battery as load
        solarpercent = Math.round(solarpower/(loadtotal + Math.abs(batterypower))*100);
        windpercent = Math.round(windpower/(loadtotal + Math.abs(batterypower))*100);
        batterypercent = 0;
    }

    //Update Numbers on Microgrid Visualization
    $("#C3batterytext").html(Math.abs(batterypower) + " kW");
    $("#C3windtext").html(windpower + " kW");
    $("#C3solartext").html(solarpower + " kW");
    $("#C3loadtext").html(Math.round(loadValues[4]) + " kW");

    //Turn Arrows off if No Power Flow - Change Direction Too
    if (generationValues[12] == 0) {
        $('#C3batteryarrow').attr("src", 'img/ArrowLeftStop.png');
    } else if (generationValues[12] < 0) {
        $('#C3batteryarrow').attr("src", 'img/ArrowLeft.gif');
    } else {
        $('#C3batteryarrow').attr("src", 'img/ArrowRight.gif');
    }
        
    //Turn On and Off Arrows
    if (generationValues[13] == 0) {
        $('#C3solararrow').attr("src", 'img/ArrowRightStop.png');
    } else {
        $('#C3solararrow').attr("src", 'img/ArrowRight.gif');
    }
    if (generationValues[14] == 0) {
        $('#C3windarrow').attr("src", 'img/ArrowLeftStop.png');
    } else {
        $('#C3windarrow').attr("src", 'img/ArrowLeft.gif');
    }
    
    //Turn On and Off the Wind Turbine
    if (generationValues[14] != 0 && ($('#C3windturbine').attr("src") != 'img/windOn.gif')) {
        $('#C3windturbine').attr("src", 'img/windOn.gif');
    } else if ((generationValues[14] == 0) && ($("#C3windturbine").attr('src') != 'img/wind.png')) {
        $('#C3windturbine').attr("src", 'img/wind.png');
    }

    
    $('#C3load').html(Math.round(loadValues[4]));
    $("#C3batterypower").html(batterypercent);
    $("#C3solarpower").html(solarpercent);
    $("#C3windpower").html(windpercent);
    $("#C3batterySOC").removeAttr('style').css("width",(generationValues[15]*100) +"%");
    
    if (generationValues[15] > 1) {
        $("#C3batterySOC").html(100 + "%");
    } else {
        $("#C3batterySOC").html(Math.round(generationValues[15]*100) + "%");
    }
    
    
    /////////////////////////////////////////////////////////
    
    batterypower = generationValues[16];
    solarpower = generationValues[17];
    windpower = generationValues[18];
    
    //Solution #2 - Using added up load value to determine percentages of each generation --- OPTION: Including battery as the load 
    if (batterypower < 0) {
        loadtotal = loadValues[5];
        
        solarpercent = Math.round(solarpower/loadtotal*100);
        windpercent = Math.round(windpower/loadtotal*100);
        batterypercent = Math.round(Math.abs(batterypower)/loadtotal*100);
        
    } else {
        loadtotal = loadValues[5];

        //Option 1 - include battery as load
        solarpercent = Math.round(solarpower/(loadtotal + Math.abs(batterypower))*100);
        windpercent = Math.round(windpower/(loadtotal + Math.abs(batterypower))*100);
        batterypercent = 0;
    }
    
    //Update Numbers on Microgrid Visualization
    $("#C4batterytext").html(Math.abs(batterypower) + " kW");
    $("#C4windtext").html(windpower + " kW");
    $("#C4solartext").html(solarpower + " kW");
    $("#C4loadtext").html(Math.round(loadValues[5]) + " kW");
    
    //Turn Arrows off if No Power Flow - Change Direction Too
    if (generationValues[16] == 0) {
        $('#C4batteryarrow').attr("src", 'img/ArrowLeftStop.png');
    } else if (generationValues[16] < 0) {
        $('#C4batteryarrow').attr("src", 'img/ArrowLeft.gif');
    } else {
        $('#C4batteryarrow').attr("src", 'img/ArrowRight.gif');
    }
        
    //Turn On and Off Arrows
    if (generationValues[17] == 0) {
        $('#C4solararrow').attr("src", 'img/ArrowRightStop.png');
    } else {
        $('#C4solararrow').attr("src", 'img/ArrowRight.gif');
    }
    if (generationValues[18] == 0) {
        $('#C4windarrow').attr("src", 'img/ArrowLeftStop.png');
    } else {
        $('#C4windarrow').attr("src", 'img/ArrowLeft.gif');
    }
    
    //Turn On and Off the Wind Turbine
    if (generationValues[18] != 0 && ($('#C4windturbine').attr("src") != 'img/windOn.gif')) {
        $('#C4windturbine').attr("src", 'img/windOn.gif');
    } else if ((generationValues[18] == 0) && ($("#C4windturbine").attr('src') != 'img/wind.png')) {
        $('#C4windturbine').attr("src", 'img/wind.png');
    }

    $('#C4load').html(Math.round(loadValues[5]));
    $("#C4batterypower").html(batterypercent);
    $("#C4solarpower").html(solarpercent);
    $("#C4windpower").html(windpercent);
    $("#C4batterySOC").removeAttr('style').css("width",(generationValues[19]*100) +"%");
    
    if (generationValues[19] > 1) {
        $("#C4batterySOC").html(100 + "%");
    } else {
        $("#C4batterySOC").html(Math.round(generationValues[19]*100) + "%");
    }
    
    
    /////////////////////////////////////////////////////////
    
    batterypower = generationValues[20];
    solarpower = generationValues[21];
    windpower = generationValues[22];
    
    //Solution #2 - Using added up load value to determine percentages of each generation --- OPTION: Including battery as the load 
    if (batterypower < 0) {
        loadtotal = loadValues[6];
        
        solarpercent = Math.round(solarpower/loadtotal*100);
        windpercent = Math.round(windpower/loadtotal*100);
        batterypercent = Math.round(Math.abs(batterypower)/loadtotal*100);
        
    } else {
        loadtotal = loadValues[6];

        //Option 1 - include battery as load
        solarpercent = Math.round(solarpower/(loadtotal + Math.abs(batterypower))*100);
        windpercent = Math.round(windpower/(loadtotal + Math.abs(batterypower))*100);
        batterypercent = 0;
    }

    //Update Numbers on Microgrid Visualization
    $("#C5Abatterytext").html(Math.abs(batterypower) + " kW");
    $("#C5Awindtext").html(windpower + " kW");
    $("#C5Asolartext").html(solarpower + " kW");
    $("#C5Aloadtext").html(Math.round(loadValues[6]) + " kW");

    //Turn Arrows off if No Power Flow - Change Direction Too
    if (generationValues[20] == 0) {
        $('#C5Abatteryarrow').attr("src", 'img/ArrowLeftStop.png');
    } else if (generationValues[20] < 0) {
        $('#C5Abatteryarrow').attr("src", 'img/ArrowLeft.gif');
    } else {
        $('#C5Abatteryarrow').attr("src", 'img/ArrowRight.gif');
    }
        
    //Turn On and Off Arrows
    if (generationValues[21] == 0) {
        $('#C5Asolararrow').attr("src", 'img/ArrowRightStop.png');
    } else {
        $('#C5Asolararrow').attr("src", 'img/ArrowRight.gif');
    }
    if (generationValues[22] == 0) {
        $('#C5Awindarrow').attr("src", 'img/ArrowLeftStop.png');
    } else {
        $('#C5Awindarrow').attr("src", 'img/ArrowLeft.gif');
    }
    
    //Turn On and Off the Wind Turbine
    if (generationValues[22] != 0 && ($('#C5Awindturbine').attr("src") != 'img/windOn.gif')) {
        $('#C5Awindturbine').attr("src", 'img/windOn.gif');
    } else if ((generationValues[22] == 0) && ($("#C5Awindturbine").attr('src') != 'img/wind.png')) {
        $('#C5Awindturbine').attr("src", 'img/wind.png');
    }
    
    $('#C5Aload').html(Math.round(loadValues[6]));
    $("#C5Abatterypower").html(batterypercent);
    $("#C5Asolarpower").html(solarpercent);
    $("#C5Awindpower").html(windpercent);
    $("#C5AbatterySOC").removeAttr('style').css("width",(generationValues[23]*100) +"%");

    if (generationValues[23] > 1) {
        $("#C5AbatterySOC").html(100 + "%");
    } else {
        $("#C5AbatterySOC").html(Math.round(generationValues[23]*100) + "%");
    }
    
    /////////////////////////////////////////////////////////
    
    batterypower = generationValues[24];
    solarpower = generationValues[25];
    windpower = generationValues[26];
    
    //Solution #2 - Using added up load value to determine percentages of each generation --- OPTION: Including battery as the load 
    if (batterypower < 0) {
        loadtotal = loadValues[7];
        
        solarpercent = Math.round(solarpower/loadtotal*100);
        windpercent = Math.round(windpower/loadtotal*100);
        batterypercent = Math.round(Math.abs(batterypower)/loadtotal*100);
        
    } else {
        loadtotal = loadValues[7];

        //Option 1 - include battery as load
        solarpercent = Math.round(solarpower/(loadtotal + Math.abs(batterypower))*100);
        windpercent = Math.round(windpower/(loadtotal + Math.abs(batterypower))*100);
        batterypercent = 0;
    }

    //Update Numbers on Microgrid Visualization
    $("#C5Bbatterytext").html(Math.abs(batterypower) + " kW");
    $("#C5Bwindtext").html(windpower + " kW");
    $("#C5Bsolartext").html(solarpower + " kW");
    $("#C5Bloadtext").html(Math.round(loadValues[7]) + " kW");
    
    //Turn Arrows off if No Power Flow - Change Direction Too
    if (generationValues[24] == 0) {
        $('#C5Bbatteryarrow').attr("src", 'img/ArrowLeftStop.png');
    } else if (generationValues[24] < 0) {
        $('#C5Bbatteryarrow').attr("src", 'img/ArrowLeft.gif');
    } else {
        $('#C5Bbatteryarrow').attr("src", 'img/ArrowRight.gif');
    }
        
    //Turn On and Off Arrows
    if (generationValues[25] == 0) {
        $('#C5Bsolararrow').attr("src", 'img/ArrowRightStop.png');
    } else {
        $('#C5Bsolararrow').attr("src", 'img/ArrowRight.gif');
    }
    if (generationValues[26] == 0) {
        $('#C5Bwindarrow').attr("src", 'img/ArrowLeftStop.png');
    } else {
        $('#C5Bwindarrow').attr("src", 'img/ArrowLeft.gif');
    }
    
    //Turn On and Off the Wind Turbine
    if (generationValues[26] != 0 && ($('#C5Bwindturbine').attr("src") != 'img/windOn.gif')) {
        $('#C5Bwindturbine').attr("src", 'img/windOn.gif');
    } else if ((generationValues[26] == 0) && ($("#C5Bwindturbine").attr('src') != 'img/wind.png')) {
        $('#C5Bwindturbine').attr("src", 'img/wind.png');
    }
    
    $('#C5Bload').html(Math.round(loadValues[7]));
    $("#C5Bbatterypower").html(batterypercent);
    $("#C5Bsolarpower").html(solarpercent);
    $("#C5Bwindpower").html(windpercent);
    $("#C5BbatterySOC").removeAttr('style').css("width",(generationValues[27]*100) +"%");
    
    if (generationValues[27] > 1) {
        $("#C5BbatterySOC").html(100 + "%");
    } else {
        $("#C5BbatterySOC").html(Math.round(generationValues[27]*100) + "%");
    }

    /////////////////////////////////////////////////////////
    
    batterypower = generationValues[28];
    solarpower = generationValues[29];
    windpower = generationValues[30];
    
    //Solution #2 - Using added up load value to determine percentages of each generation --- OPTION: Including battery as the load 
    if (batterypower < 0) {
        loadtotal = loadValues[8];
        
        solarpercent = Math.round(solarpower/loadtotal*100);
        windpercent = Math.round(windpower/loadtotal*100);
        batterypercent = Math.round(Math.abs(batterypower)/loadtotal*100);
        
    } else {
        loadtotal = loadValues[8];

        //Option 1 - include battery as load
        solarpercent = Math.round(solarpower/(loadtotal + Math.abs(batterypower))*100);
        windpercent = Math.round(windpower/(loadtotal + Math.abs(batterypower))*100);
        batterypercent = 0;
    }
    
    //Update Numbers on Microgrid Visualization
    $("#C5Cbatterytext").html(Math.abs(batterypower) + " kW");
    $("#C5Cwindtext").html(windpower + " kW");
    $("#C5Csolartext").html(solarpower + " kW");
    $("#C5Cloadtext").html(Math.round(loadValues[8]) + " kW");
    
    //Turn Arrows off if No Power Flow - Change Direction Too
    if (generationValues[28] == 0) {
        $('#C5Cbatteryarrow').attr("src", 'img/ArrowLeftStop.png');
    } else if (generationValues[28] < 0) {
        $('#C5Cbatteryarrow').attr("src", 'img/ArrowLeft.gif');
    } else {
        $('#C5Cbatteryarrow').attr("src", 'img/ArrowRight.gif');
    }
        
    //Turn On and Off Arrows
    if (generationValues[29] == 0) {
        $('#C5Csolararrow').attr("src", 'img/ArrowRightStop.png');
    } else {
        $('#C5Csolararrow').attr("src", 'img/ArrowRight.gif');
    }
    if (generationValues[30] == 0) {
        $('#C5Cwindarrow').attr("src", 'img/ArrowLeftStop.png');
    } else {
        $('#C5Cwindarrow').attr("src", 'img/ArrowLeft.gif');
    }
    
    //Turn On and Off the Wind Turbine
    if (generationValues[30] != 0 && ($('#C5Cwindturbine').attr("src") != 'img/windOn.gif')) {
        console.log("Changing the source to GIF");
        $('#C5Cwindturbine').attr("src", 'img/windOn.gif');
    } else if ((generationValues[30] == 0) && ($("#C5Cwindturbine").attr('src') != 'img/wind.png')) {
        console.log("Changing the source to IMG");
        $('#C5Cwindturbine').attr("src", 'img/wind.png');
    }
    

    $('#C5Cload').html(Math.round(loadValues[8]));
    $("#C5Cbatterypower").html(batterypercent);
    $("#C5Csolarpower").html(solarpercent);
    $("#C5Cwindpower").html(windpercent);
    $("#C5CbatterySOC").removeAttr('style').css("width",(generationValues[31]*100) +"%");

    if (generationValues[31] > 1) {
        $("#C5CbatterySOC").html(100 + "%");
    } else {
        $("#C5CbatterySOC").html(Math.round(generationValues[31]*100) + "%");
    }
    
    
    //Update Arrow Speeds for Visualization
    
    //Update Dashboard Values
    
    //Update Generation Mix Graph
    
    
    
    var totalSolar, totalWind;
    //totalSolar = updatedData[1] + updatedData[5] + updatedData[9] + updatedData[13] + updatedData[17] + updatedData[21] + updatedData[25] + updatedData[29];
    //totalWind = updatedData[2] + updatedData[6] + updatedData[10] + updatedData[14] + updatedData[18] + updatedData[22] + updatedData[26] + updatedData[30];

    
    
    
    
    
}





function setupVisualizationFromConfig(configID) {
    
    //Special Message if Config 2
    if (configID == 3) {
        $("#messageForConfig2").html("note:  Average wind speed moved to 98.65% of standard deviation"); 
    } else if (configID == 4) {
        $("#messageForConfig2").html("note:  Average wind speed moved to 35.75% of standard deviation"); 
    } else {
        $("#messageForConfig2").html("---");
    }
    
    
    $.getJSON('configValues.php?configID='+configID, function(configData) {
        //console.log(configData);
        
        
        $("#configname").html(configData[0]);
        $("#configseason").html(configData[1]);

        //Installation Numbers
        $("#4kVsolarnum").html("Total Solar Arrays: " + configData[2]);
        $("#4kVwindnum").html("Total Wind Turbines: " + configData[3]);
        $("#4kVbatterynum").html("Total Battery Banks: " + configData[4]);
        $("#4kVsolararea").html("Total Surface Area: " + Math.round(configData[2]*153.192*100)/100 + " m^2");
        //Capacity Values
        $("#4kVsolarcapacity").html("Total Capacity: " + configData[2]*20 + " kW");
        $("#4kVwindcapacity").html("Total Capacity: " + configData[3]*25 + " kW");
        $("#4kVbatterycapacity").html("Total Energy Capacity: " + Math.round(configData[4]*18.36) + " kWh");
        
        
        //Installation Numbers
        $("#c1solarnum").html("Total Solar Arrays: " + configData[5]);
        $("#c1windnum").html("Total Wind Turbines: " + configData[6]);
        $("#c1batterynum").html("Total Battery Banks: " + configData[7]);
        $("#c1solararea").html("Total Surface Area: " + Math.round(configData[5]*153.192*100)/100 + " m^2");
        //Capacity Values
        $("#c1solarcapacity").html("Total Capacity: " + configData[5]*20 + " kW");
        $("#c1windcapacity").html("Total Capacity: " + configData[6]*25 + " kW");
        $("#c1batterycapacity").html("Total Energy Capacity: " + Math.round(configData[7]*18.36) + " kWh");
        
        
        //Installation Numbers
        $("#c2solarnum").html("Total Solar Arrays: " + configData[8]);
        $("#c2windnum").html("Total Wind Turbines: " + configData[9]);
        $("#c2batterynum").html("Total Battery Banks: " + configData[10]);
        $("#c2solararea").html("Total Surface Area: " + Math.round(configData[8]*153.192*100)/100 + " m^2");
        //Capacity Values
        $("#c2solarcapacity").html("Total Capacity: " + configData[8]*20 + " kW");
        $("#c2windcapacity").html("Total Capacity: " + configData[9]*25 + " kW");
        $("#c2batterycapacity").html("Total Energy Capacity: " + Math.round(configData[10]*18.36) + " kWh");

        
        //Installation Numbers
        $("#c3solarnum").html("Total Solar Arrays: " + configData[11]);
        $("#c3windnum").html("Total Wind Turbines: " + configData[12]);
        $("#c3batterynum").html("Total Battery Banks: " + configData[13]);
        $("#c3solararea").html("Total Surface Area: " + Math.round(configData[11]*153.192*100)/100 + " m^2");
        //Capacity Values
        $("#c3solarcapacity").html("Total Capacity: " + configData[11]*20 + " kW");
        $("#c3windcapacity").html("Total Capacity: " + configData[12]*25 + " kW");
        $("#c3batterycapacity").html("Total Energy Capacity: " + Math.round(configData[13]*18.36) + " kWh");
        
        
        //Installation Numbers
        $("#c4solarnum").html("Total Solar Arrays: " + configData[14]);
        $("#c4windnum").html("Total Wind Turbines: " + configData[15]);
        $("#c4batterynum").html("Total Battery Banks: " + configData[16]);
        $("#c4solararea").html("Total Surface Area: " + Math.round(configData[14]*153.192*100)/100 + " m^2");
        //Capacity Values
        $("#c4solarcapacity").html("Total Capacity: " + configData[14]*20 + " kW");
        $("#c4windcapacity").html("Total Capacity: " + configData[15]*25 + " kW");
        $("#c4batterycapacity").html("Total Energy Capacity: " + Math.round(configData[16]*18.36) + " kWh");
        
        
        //Installation Numbers
        $("#c5Asolarnum").html("Total Solar Arrays: " + configData[17]);
        $("#c5Awindnum").html("Total Wind Turbines: " + configData[18]);
        $("#c5Abatterynum").html("Total Battery Banks: " + configData[19]);
        $("#c5Asolararea").html("Total Surface Area: " + Math.round(configData[17]*153.192*100)/100 + " m^2");
        //Capacity Values
        $("#c5Asolarcapacity").html("Total Capacity: " + configData[17]*20 + " kW");
        $("#c5Awindcapacity").html("Total Capacity: " + configData[18]*25 + " kW");
        $("#c5Abatterycapacity").html("Total Energy Capacity: " + Math.round(configData[19]*18.36) + " kWh");
        
        
        //Installation Numbers
        $("#c5Bsolarnum").html("Total Solar Arrays: " + configData[20]);
        $("#c5Bwindnum").html("Total Wind Turbines: " + configData[21]);
        $("#c5Bbatterynum").html("Total Battery Banks: " + configData[22]);
        $("#c5Bsolararea").html("Total Surface Area: " + Math.round(configData[20]*153.192*100)/100+ " m^2");
        //Capacity Values
        $("#c5Bsolarcapacity").html("Total Capacity: " + configData[20]*20 + " kW");
        $("#c5Bwindcapacity").html("Total Capacity: " + configData[21]*25 + " kW");
        $("#c5Bbatterycapacity").html("Total Energy Capacity: " + Math.round(configData[22]*18.36) + " kWh");
        
    
        //Installation Numbers
        $("#c5Csolarnum").html("Total Solar Arrays: " + configData[23]);
        $("#c5Cwindnum").html("Total Wind Turbines: " + configData[24]);
        $("#c5Cbatterynum").html("Total Battery Banks: " + configData[25]);
        $("#c5Csolararea").html("Total Surface Area: " + Math.round(configData[23]*153.192*100)/100 + " m^2");
        //Capacity Values
        $("#c5Csolarcapacity").html("Total Capacity: " + configData[23]*20 + " kW");
        $("#c5Cwindcapacity").html("Total Capacity: " + configData[24]*25 + " kW");
        $("#c5Cbatterycapacity").html("Total Energy Capacity: " + Math.round(configData[25]*18.36) + " kWh");
        
        
        //Create QTips
        $('.elementWithTooltip').each(function() {
        $(this).qtip ({
            content: {
                text:$(this).next('div').html()
            },
            style: {
                classes: 'customqtipstyle qtip-bootstrap',
                width: 800
            },
            position: {
                my: 'top center',
                at: 'center',
                target: $(this)
            },
            show: {
                event: 'click',
                solo: true
            },
            hide: {
                event: 'click'
            }
        });
        });

        
  
    });
    
    

    

        
}



function createCharts() {
    
    //LoadChart
    $.getJSON('completeLoad.php?season='+configID, function(loadresponse) {
        console.log("THE RESPONSE");
        console.log(loadresponse);
        completeLoadChartOptions.xAxis.categories = loadresponse[0]['data'];
        completeLoadChartOptions.series[1] = loadresponse[1];
        completeLoadChartOptions.series[2] = loadresponse[1];

        
        /*
        completeLoadChartOptions.series[2] = loadresponse[2];
        completeLoadChartOptions.series[3] = loadresponse[3];
        completeLoadChartOptions.series[4] = loadresponse[4];
        completeLoadChartOptions.series[5] = loadresponse[5];
        completeLoadChartOptions.series[6] = loadresponse[6];
        completeLoadChartOptions.series[7] = loadresponse[7];
        completeLoadChartOptions.series[8] = loadresponse[8];
        completeLoadChartOptions.series[9] = loadresponse[9];
        */
        
        if (configID % 2 == 0) {
            completeLoadChartOptions.title.text = "Winter Load Profile";
        } else {
            completeLoadChartOptions.title.text = "Fall Load Profile";
        }
        
        loadresponseTotal = loadresponse[1]['data'];
        loadresponseCircuit1 = loadresponse[2]['data'];
        loadresponseCircuit2 = loadresponse[3]['data'];
        loadresponseCircuit3 = loadresponse[4]['data'];
        loadresponseCircuit4 = loadresponse[5]['data'];
        loadresponseCircuit5a = loadresponse[6]['data'];
        loadresponseCircuit5b = loadresponse[7]['data'];
        loadresponseCircuit5c = loadresponse[8]['data'];
        loadresponse4kVSub = loadresponse[9]['data'];
        
        loadchart = new Highcharts.Chart(completeLoadChartOptions);
        
        /*//loadchart.series[1].hide();
        loadchart.series[2].hide();
        loadchart.series[3].hide();
        loadchart.series[4].hide();
        loadchart.series[5].hide();
        loadchart.series[6].hide();
        loadchart.series[7].hide();
        loadchart.series[8].hide();
        loadchart.series[9].hide();
        */
      

    
    }); 
    
    
    //SolarChart
    $.getJSON('completeSolar.php?configID='+configID, function(solarresponse) {

        completeSolarChartOptions.xAxis.categories = solarresponse[0]['data'];
        completeSolarChartOptions.series[1] = solarresponse[1];
        completeSolarChartOptions.series[2] = solarresponse[1];

        completeSolarChartOptions.title.text = "Solar Profile";

        
        solarresponseTotal = solarresponse[1]['data'];
        solarresponseCircuit1 = solarresponse[2]['data']; 
        solarresponseCircuit2 = solarresponse[3]['data'];
        solarresponseCircuit3 = solarresponse[4]['data'];
        solarresponseCircuit4 = solarresponse[5]['data'];
        solarresponseCircuit5a = solarresponse[6]['data'];
        solarresponseCircuit5b = solarresponse[7]['data'];
        solarresponseCircuit5c = solarresponse[8]['data'];
        solarresponse4kVSub = solarresponse[9]['data'];
        
        solarchart = new Highcharts.Chart(completeSolarChartOptions);
    
    }); 
    
    
    //WindChart
    $.getJSON('completeWind.php?configID='+configID, function(windresponse) {

        completeWindChartOptions.xAxis.categories = windresponse[0]['data'];
        completeWindChartOptions.series[1] = windresponse[1];
        completeWindChartOptions.series[2] = windresponse[1];

        completeWindChartOptions.title.text = "Wind Profile";
        
        windresponseTotal = windresponse[1]['data'];
        windresponseCircuit1 = windresponse[2]['data']; 
        windresponseCircuit2 = windresponse[3]['data'];
        windresponseCircuit3 = windresponse[4]['data'];
        windresponseCircuit4 = windresponse[5]['data'];
        windresponseCircuit5a = windresponse[6]['data'];
        windresponseCircuit5b = windresponse[7]['data'];
        windresponseCircuit5c = windresponse[8]['data'];
        windresponse4kVSub = windresponse[9]['data'];
        
        windchart = new Highcharts.Chart(completeWindChartOptions);
    
    }); 
    
    //Battery Chart
    $.getJSON('completeBattery.php?configID='+configID, function(batteryresponse) {

        console.log("----");
        console.log(batteryresponse);
        console.log("----");

        completeBatteryChartOptions.xAxis.categories = batteryresponse[0]['data'];
        completeBatteryChartOptions.series[1] = batteryresponse[2];
        //completeBatteryChartOptions.series[2] = batteryresponse[1];

        completeBatteryChartOptions.title.text = "Energy Flow - Single Battery Cell";
        
        batteryresponseTotal = batteryresponse[1]['data'];
        batteryresponseCircuit1 = batteryresponse[2]['data']; 
        batteryresponseCircuit2 = batteryresponse[3]['data'];
        batteryresponseCircuit3 = batteryresponse[4]['data'];
        batteryresponseCircuit4 = batteryresponse[5]['data'];
        batteryresponseCircuit5a = batteryresponse[6]['data'];
        batteryresponseCircuit5b = batteryresponse[7]['data'];
        batteryresponseCircuit5c = batteryresponse[8]['data'];
        batteryresponse4kVSub = batteryresponse[9]['data'];
        
        batterychart = new Highcharts.Chart(completeBatteryChartOptions);
    
    }); 
    
    
    //Reset all the buttons
        $('#lbtncircuit1').removeClass("active");
        $('#lbtncircuit2').removeClass("active"); 
        $('#lbtncircuit3').removeClass("active");
        $('#lbtncircuit4').removeClass("active");
        $('#lbtncircuit5A').removeClass("active");
        $('#lbtncircuit5B').removeClass("active");
        $('#lbtncircuit5C').removeClass("active");
        $('#lbtn4kVSub').removeClass("active");
    
        $('#sbtncircuit1').removeClass("active");
        $('#sbtncircuit2').removeClass("active"); 
        $('#sbtncircuit3').removeClass("active");
        $('#sbtncircuit4').removeClass("active");
        $('#sbtncircuit5A').removeClass("active");
        $('#sbtncircuit5B').removeClass("active");
        $('#sbtncircuit5C').removeClass("active");
        $('#sbtn4kVSub').removeClass("active");
    
        $('#wbtncircuit1').removeClass("active");
        $('#wbtncircuit2').removeClass("active"); 
        $('#wbtncircuit3').removeClass("active");
        $('#wbtncircuit4').removeClass("active");
        $('#wbtncircuit5A').removeClass("active");
        $('#wbtncircuit5B').removeClass("active");
        $('#wbtncircuit5C').removeClass("active");
        $('#wbtn4kVSub').removeClass("active");
        
        $('#bbtncircuit1').removeClass("active");
        $('#bbtncircuit2').removeClass("active"); 
        $('#bbtncircuit3').removeClass("active");
        $('#bbtncircuit4').removeClass("active");
        $('#bbtncircuit5A').removeClass("active");
        $('#bbtncircuit5B').removeClass("active");
        $('#bbtncircuit5C').removeClass("active");
        $('#bbtn4kVSub').removeClass("active");
}





/////////////////////////////////////////////////////////////////////////////////  
///// Document Ready
/////////////////////////////////////////////////////////////////////////////////
    
$(document).ready(function () {
    
    setupVisualizationFromConfig(1);
    configID = 1;
    i = 0;
    
    //setup time datetime object
    currenttime.setSeconds(0);
    currenttime.setMinutes(0);
    currenttime.setHours(10);
    console.log(currenttime);

    
    //create charts
    createCharts();
    
    //start updating
    updateData();
    
    //Pause Button


    $('#pause').click(function (event) {
        clearTimeout(timer);
        //event.preventDefault;
        //$(this).removeClass('active');

    });
    
    $('#play').click(function (event) {
        //event.preventDefault;
        //$(this).removeClass('active');
        updateData();
    });
    

    //Configruation Dropdown Events
    ///////////////////////////////////////
    $('#config1').click(function(event) {
        event.preventDefault;
        setupVisualizationFromConfig(1);
        configID = 1;
        timeOfSimulation = 600;
        
        //reset time datetime object
        currenttime.setSeconds(0);
        currenttime.setMinutes(0);
        currenttime.setHours(10);
        
        totalCO2Emissions = 0;
        totalNOEmissions = 0;
        totalSO2Emissions = 0;

    
        createCharts();
    });
    
    $('#config2').click( function(event) {
        event.preventDefault;
        setupVisualizationFromConfig(2);
        configID = 2;  
        timeOfSimulation = 600;
        
        //reset time datetime object
        currenttime.setSeconds(0);
        currenttime.setMinutes(0);
        currenttime.setHours(10);
        
        totalCO2Emissions = 0;
        totalNOEmissions = 0;
        totalSO2Emissions = 0;

        
        createCharts();
    });
    
    $('#config3').click( function(event) {
        event.preventDefault;
        setupVisualizationFromConfig(3);
        configID = 3;  
        timeOfSimulation = 600;
        
        //reset time datetime object
        currenttime.setSeconds(0);
        currenttime.setMinutes(0);
        currenttime.setHours(10);
        
        totalCO2Emissions = 0;
        totalNOEmissions = 0;
        totalSO2Emissions = 0;
        
        createCharts();
    });
    
    $('#config4').click( function(event) {
        event.preventDefault;
        setupVisualizationFromConfig(4);
        configID = 4;  
        timeOfSimulation = 600;
        
        //reset time datetime object
        currenttime.setSeconds(0);
        currenttime.setMinutes(0);
        currenttime.setHours(10);

        totalCO2Emissions = 0;
        totalNOEmissions = 0;
        totalSO2Emissions = 0;
        
        createCharts();
    });

    $('#config5').click( function(event) {
        event.preventDefault;
        setupVisualizationFromConfig(5);
        configID = 5;  
        timeOfSimulation = 600;
        
        //reset time datetime object
        currenttime.setSeconds(0);
        currenttime.setMinutes(0);
        currenttime.setHours(10);
        
        totalCO2Emissions = 0;
        totalNOEmissions = 0;
        totalSO2Emissions = 0;
        
        createCharts();
    });
    
    $('#config6').click( function(event) {
        event.preventDefault;
        setupVisualizationFromConfig(6);
        configID = 6;  
        timeOfSimulation = 600;
        
        //reset time datetime object
        currenttime.setSeconds(0);
        currenttime.setMinutes(0);
        currenttime.setHours(10);
        
        totalCO2Emissions = 0;
        totalNOEmissions = 0;
        totalSO2Emissions = 0;
        
        createCharts();
    });
        
    

    
    //Buttons for Load Chart
    //////////////////////////////////
    $('#lbtntotal').click(function (){
        if ( i % 2 == 0) {
            loadchart.series[2].hide();
        } else {
            loadchart.series[2].show();
        }
        console.log(i);
        i += 1;
        
    });
    
    $('#lbtncircuit1').click(function (){
        loadchart.series[1].setData(loadresponseCircuit1);
        $('#lbtncircuit1').addClass("active");
        $('#lbtncircuit2').removeClass("active"); 
        $('#lbtncircuit3').removeClass("active");
        $('#lbtncircuit4').removeClass("active");
        $('#lbtncircuit5A').removeClass("active");
        $('#lbtncircuit5B').removeClass("active");
        $('#lbtncircuit5C').removeClass("active");
        $('#lbtn4kVSub').removeClass("active");
    });
        
    $('#lbtncircuit2').click(function (){
        loadchart.series[1].setData(loadresponseCircuit2);
        $('#lbtncircuit1').removeClass("active");
        $('#lbtncircuit2').addClass("active"); 
        $('#lbtncircuit3').removeClass("active");
        $('#lbtncircuit4').removeClass("active");
        $('#lbtncircuit5A').removeClass("active");
        $('#lbtncircuit5B').removeClass("active");
        $('#lbtncircuit5C').removeClass("active");
        $('#lbtn4kVSub').removeClass("active");
    });
        
    $('#lbtncircuit3').click(function (){
        loadchart.series[1].setData(loadresponseCircuit3);
        $('#lbtncircuit1').removeClass("active");
        $('#lbtncircuit2').removeClass("active"); 
        $('#lbtncircuit3').addClass("active");
        $('#lbtncircuit4').removeClass("active");
        $('#lbtncircuit5A').removeClass("active");
        $('#lbtncircuit5B').removeClass("active");
        $('#lbtncircuit5C').removeClass("active");
        $('#lbtn4kVSub').removeClass("active");
    });
        
    $('#lbtncircuit4').click(function (){
        loadchart.series[1].setData(loadresponseCircuit4);
        $('#lbtncircuit1').removeClass("active");
        $('#lbtncircuit2').removeClass("active"); 
        $('#lbtncircuit3').removeClass("active");
        $('#lbtncircuit4').addClass("active");
        $('#lbtncircuit5A').removeClass("active");
        $('#lbtncircuit5B').removeClass("active");
        $('#lbtncircuit5C').removeClass("active");
        $('#lbtn4kVSub').removeClass("active");
    });
        
    $('#lbtncircuit5a').click(function (){
        loadchart.series[1].setData(loadresponseCircuit5a);
        $('#lbtncircuit1').removeClass("active");
        $('#lbtncircuit2').removeClass("active"); 
        $('#lbtncircuit3').removeClass("active");
        $('#lbtncircuit4').removeClass("active");
        $('#lbtncircuit5A').addClass("active");
        $('#lbtncircuit5B').removeClass("active");
        $('#lbtncircuit5C').removeClass("active");
        $('#lbtn4kVSub').removeClass("active");
    });
        
    $('#lbtncircuit5b').click(function (){
        loadchart.series[1].setData(loadresponseCircuit5b);
        $('#lbtncircuit1').removeClass("active");
        $('#lbtncircuit2').removeClass("active"); 
        $('#lbtncircuit3').removeClass("active");
        $('#lbtncircuit4').removeClass("active");
        $('#lbtncircuit5A').removeClass("active");
        $('#lbtncircuit5B').addClass("active");
        $('#lbtncircuit5C').removeClass("active");
        $('#lbtn4kVSub').removeClass("active");
    });
        
    $('#lbtncircuit5c').click(function (){
        loadchart.series[1].setData(loadresponseCircuit5c);
        $('#lbtncircuit1').removeClass("active");
        $('#lbtncircuit2').removeClass("active"); 
        $('#lbtncircuit3').removeClass("active");
        $('#lbtncircuit4').removeClass("active");
        $('#lbtncircuit5A').removeClass("active");
        $('#lbtncircuit5B').removeClass("active");
        $('#lbtncircuit5C').addClass("active");
        $('#lbtn4kVSub').removeClass("active");
    });
    
    $('#lbtn4kVSub').click(function (){
        loadchart.series[1].setData(loadresponse4kVSub);
        $('#lbtncircuit1').removeClass("active");
        $('#lbtncircuit2').removeClass("active"); 
        $('#lbtncircuit3').removeClass("active");
        $('#lbtncircuit4').removeClass("active");
        $('#lbtncircuit5A').removeClass("active");
        $('#lbtncircuit5B').removeClass("active");
        $('#lbtncircuit5C').removeClass("active");
        $('#lbtn4kVSub').addClass("active");
    });
        

    
    
    
    //Buttons for Solar Chart
    //////////////////////////////////
    $('#sbtntotal').click(function (){
        if ( i % 2 == 0) {
            solarchart.series[2].hide();
        } else {
            solarchart.series[2].show();
        }
        console.log(i);
        i += 1;
        
    });
    
    $('#sbtncircuit1').click(function (){
        solarchart.series[1].setData(solarresponseCircuit1);
        $('#sbtncircuit1').addClass("active");
        $('#sbtncircuit2').removeClass("active"); 
        $('#sbtncircuit3').removeClass("active");
        $('#sbtncircuit4').removeClass("active");
        $('#sbtncircuit5A').removeClass("active");
        $('#sbtncircuit5B').removeClass("active");
        $('#sbtncircuit5C').removeClass("active");
        $('#sbtn4kVSub').removeClass("active");
    });
        
    $('#sbtncircuit2').click(function (){
        solarchart.series[1].setData(solarresponseCircuit2);
        $('#sbtncircuit1').removeClass("active");
        $('#sbtncircuit2').addClass("active"); 
        $('#sbtncircuit3').removeClass("active");
        $('#sbtncircuit4').removeClass("active");
        $('#sbtncircuit5A').removeClass("active");
        $('#sbtncircuit5B').removeClass("active");
        $('#sbtncircuit5C').removeClass("active");
        $('#sbtn4kVSub').removeClass("active");
    });
        
    $('#sbtncircuit3').click(function (){
        solarchart.series[1].setData(solarresponseCircuit3);
        $('#sbtncircuit1').removeClass("active");
        $('#sbtncircuit2').removeClass("active"); 
        $('#sbtncircuit3').addClass("active");
        $('#sbtncircuit4').removeClass("active");
        $('#sbtncircuit5A').removeClass("active");
        $('#sbtncircuit5B').removeClass("active");
        $('#sbtncircuit5C').removeClass("active");
        $('#sbtn4kVSub').removeClass("active");
    });
        
    $('#sbtncircuit4').click(function (){
        solarchart.series[1].setData(solarresponseCircuit4);
        $('#sbtncircuit1').removeClass("active");
        $('#sbtncircuit2').removeClass("active"); 
        $('#sbtncircuit3').removeClass("active");
        $('#sbtncircuit4').addClass("active");
        $('#sbtncircuit5A').removeClass("active");
        $('#sbtncircuit5B').removeClass("active");
        $('#sbtncircuit5C').removeClass("active");
        $('#sbtn4kVSub').removeClass("active");
    });
        
    $('#sbtncircuit5a').click(function (){
        solarchart.series[1].setData(solarresponseCircuit5a);
        $('#sbtncircuit1').removeClass("active");
        $('#sbtncircuit2').removeClass("active"); 
        $('#sbtncircuit3').removeClass("active");
        $('#sbtncircuit4').removeClass("active");
        $('#sbtncircuit5A').addClass("active");
        $('#sbtncircuit5B').removeClass("active");
        $('#sbtncircuit5C').removeClass("active");
        $('#sbtn4kVSub').removeClass("active");
    });
        
    $('#sbtncircuit5b').click(function (){
        solarchart.series[1].setData(solarresponseCircuit5b);
        $('#sbtncircuit1').removeClass("active");
        $('#sbtncircuit2').removeClass("active"); 
        $('#sbtncircuit3').removeClass("active");
        $('#sbtncircuit4').removeClass("active");
        $('#sbtncircuit5A').removeClass("active");
        $('#sbtncircuit5B').addClass("active");
        $('#sbtncircuit5C').removeClass("active");
        $('#sbtn4kVSub').removeClass("active");
    });
        
    $('#sbtncircuit5c').click(function (){
        solarchart.series[1].setData(solarresponseCircuit5c);
        $('#sbtncircuit1').removeClass("active");
        $('#sbtncircuit2').removeClass("active"); 
        $('#sbtncircuit3').removeClass("active");
        $('#sbtncircuit4').removeClass("active");
        $('#sbtncircuit5A').removeClass("active");
        $('#sbtncircuit5B').removeClass("active");
        $('#sbtncircuit5C').addClass("active");
        $('#sbtn4kVSub').removeClass("active");
    });
    
    $('#sbtn4kVSub').click(function (){
        solarchart.series[1].setData(solarresponse4kVSub);
        $('#sbtncircuit1').removeClass("active");
        $('#sbtncircuit2').removeClass("active"); 
        $('#sbtncircuit3').removeClass("active");
        $('#sbtncircuit4').removeClass("active");
        $('#sbtncircuit5A').removeClass("active");
        $('#sbtncircuit5B').removeClass("active");
        $('#sbtncircuit5C').removeClass("active");
        $('#sbtn4kVSub').addClass("active");
    });
        
    
    
    
    //Buttons for Wind Chart
    //////////////////////////////////
    $('#wbtntotal').click(function (){
        if ( i % 2 == 0) {
            windchart.series[2].hide();
        } else {
            windchart.series[2].show();
        }
        console.log(i);
        i += 1;
        
    });
    
    $('#wbtncircuit1').click(function (){
        windchart.series[1].setData(windresponseCircuit1);
        $('#wbtncircuit1').addClass("active");
        $('#wbtncircuit2').removeClass("active"); 
        $('#wbtncircuit3').removeClass("active");
        $('#wbtncircuit4').removeClass("active");
        $('#wbtncircuit5A').removeClass("active");
        $('#wbtncircuit5B').removeClass("active");
        $('#wbtncircuit5C').removeClass("active");
        $('#wbtn4kVSub').removeClass("active");
    });
        
    $('#wbtncircuit2').click(function (){
        windchart.series[1].setData(windresponseCircuit2);
        $('#wbtncircuit1').removeClass("active");
        $('#wbtncircuit2').addClass("active"); 
        $('#wbtncircuit3').removeClass("active");
        $('#wbtncircuit4').removeClass("active");
        $('#wbtncircuit5A').removeClass("active");
        $('#wbtncircuit5B').removeClass("active");
        $('#wbtncircuit5C').removeClass("active");
        $('#wbtn4kVSub').removeClass("active");
    });
        
    $('#wbtncircuit3').click(function (){
        windchart.series[1].setData(windresponseCircuit3);
        $('#wbtncircuit1').removeClass("active");
        $('#wbtncircuit2').removeClass("active"); 
        $('#wbtncircuit3').addClass("active");
        $('#wbtncircuit4').removeClass("active");
        $('#wbtncircuit5A').removeClass("active");
        $('#wbtncircuit5B').removeClass("active");
        $('#wbtncircuit5C').removeClass("active");
        $('#wbtn4kVSub').removeClass("active");
    });
        
    $('#wbtncircuit4').click(function (){
        windchart.series[1].setData(windresponseCircuit4);
        $('#wbtncircuit1').removeClass("active");
        $('#wbtncircuit2').removeClass("active"); 
        $('#wbtncircuit3').removeClass("active");
        $('#wbtncircuit4').addClass("active");
        $('#wbtncircuit5A').removeClass("active");
        $('#wbtncircuit5B').removeClass("active");
        $('#wbtncircuit5C').removeClass("active");
        $('#wbtn4kVSub').removeClass("active");
    });
        
    $('#wbtncircuit5a').click(function (){
        windchart.series[1].setData(windresponseCircuit5a);
        $('#wbtncircuit1').removeClass("active");
        $('#wbtncircuit2').removeClass("active"); 
        $('#wbtncircuit3').removeClass("active");
        $('#wbtncircuit4').removeClass("active");
        $('#wbtncircuit5A').addClass("active");
        $('#wbtncircuit5B').removeClass("active");
        $('#wbtncircuit5C').removeClass("active");
        $('#wbtn4kVSub').removeClass("active");
    });
        
    $('#wbtncircuit5b').click(function (){
        windchart.series[1].setData(windresponseCircuit5b);
        $('#wbtncircuit1').removeClass("active");
        $('#wbtncircuit2').removeClass("active"); 
        $('#wbtncircuit3').removeClass("active");
        $('#wbtncircuit4').removeClass("active");
        $('#wbtncircuit5A').removeClass("active");
        $('#wbtncircuit5B').addClass("active");
        $('#wbtncircuit5C').removeClass("active");
        $('#wbtn4kVSub').removeClass("active");
    });
        
    $('#wbtncircuit5c').click(function (){
        windchart.series[1].setData(windresponseCircuit5c);
        $('#wbtncircuit1').removeClass("active");
        $('#wbtncircuit2').removeClass("active"); 
        $('#wbtncircuit3').removeClass("active");
        $('#wbtncircuit4').removeClass("active");
        $('#wbtncircuit5A').removeClass("active");
        $('#wbtncircuit5B').removeClass("active");
        $('#wbtncircuit5C').addClass("active");
        $('#wbtn4kVSub').removeClass("active");
    });
    
    $('#wbtn4kVSub').click(function (){
        windchart.series[1].setData(windresponse4kVSub);
        $('#wbtncircuit1').removeClass("active");
        $('#wbtncircuit2').removeClass("active"); 
        $('#wbtncircuit3').removeClass("active");
        $('#wbtncircuit4').removeClass("active");
        $('#wbtncircuit5A').removeClass("active");
        $('#wbtncircuit5B').removeClass("active");
        $('#wbtncircuit5C').removeClass("active");
        $('#wbtn4kVSub').addClass("active");
    });
    
    
//Archive Code Example
//    $('#btn4kVSub').click(function (){
//        loadchart.series[0].setData(loadresponse4kVSub);
//    });
        
    
    
    
    //Buttons for Battery Chart
    //////////////////////////////////
    $('#bbtntotal').click(function (){
        if ( i % 2 == 0) {
            batterychart.series[2].hide();
        } else {
            batterychart.series[2].show();
        }
        console.log(i);
        i += 1;
        
    });
    
    $('#bbtncircuit1').click(function (){
        batterychart.series[1].setData(batteryresponseCircuit1);
        $('#bbtncircuit1').addClass("active");
        $('#bbtncircuit2').removeClass("active"); 
        $('#bbtncircuit3').removeClass("active");
        $('#bbtncircuit4').removeClass("active");
        $('#bbtncircuit5A').removeClass("active");
        $('#bbtncircuit5B').removeClass("active");
        $('#bbtncircuit5C').removeClass("active");
        $('#bbtn4kVSub').removeClass("active");
    });
        
    $('#bbtncircuit2').click(function (){
        batterychart.series[1].setData(batteryresponseCircuit2);
        $('#bbtncircuit1').removeClass("active");
        $('#bbtncircuit2').addClass("active"); 
        $('#bbtncircuit3').removeClass("active");
        $('#bbtncircuit4').removeClass("active");
        $('#bbtncircuit5A').removeClass("active");
        $('#bbtncircuit5B').removeClass("active");
        $('#bbtncircuit5C').removeClass("active");
        $('#bbtn4kVSub').removeClass("active");
    });
        
    $('#bbtncircuit3').click(function (){
        batterychart.series[1].setData(batteryresponseCircuit3);
        $('#bbtncircuit1').removeClass("active");
        $('#bbtncircuit2').removeClass("active"); 
        $('#bbtncircuit3').addClass("active");
        $('#bbtncircuit4').removeClass("active");
        $('#bbtncircuit5A').removeClass("active");
        $('#bbtncircuit5B').removeClass("active");
        $('#bbtncircuit5C').removeClass("active");
        $('#bbtn4kVSub').removeClass("active");
    });
        
    $('#bbtncircuit4').click(function (){
        batterychart.series[1].setData(batteryresponseCircuit4);
        $('#bbtncircuit1').removeClass("active");
        $('#bbtncircuit2').removeClass("active"); 
        $('#bbtncircuit3').removeClass("active");
        $('#bbtncircuit4').addClass("active");
        $('#bbtncircuit5A').removeClass("active");
        $('#bbtncircuit5B').removeClass("active");
        $('#bbtncircuit5C').removeClass("active");
        $('#bbtn4kVSub').removeClass("active");
    });
        
    $('#bbtncircuit5a').click(function (){
        batterychart.series[1].setData(batteryresponseCircuit5a);
        $('#bbtncircuit1').removeClass("active");
        $('#bbtncircuit2').removeClass("active"); 
        $('#bbtncircuit3').removeClass("active");
        $('#bbtncircuit4').removeClass("active");
        $('#bbtncircuit5A').addClass("active");
        $('#bbtncircuit5B').removeClass("active");
        $('#bbtncircuit5C').removeClass("active");
        $('#bbtn4kVSub').removeClass("active");
    });
        
    $('#bbtncircuit5b').click(function (){
        batterychart.series[1].setData(batteryresponseCircuit5b);
        $('#bbtncircuit1').removeClass("active");
        $('#bbtncircuit2').removeClass("active"); 
        $('#bbtncircuit3').removeClass("active");
        $('#bbtncircuit4').removeClass("active");
        $('#bbtncircuit5A').removeClass("active");
        $('#bbtncircuit5B').addClass("active");
        $('#bbtncircuit5C').removeClass("active");
        $('#bbtn4kVSub').removeClass("active");
    });
        
    $('#bbtncircuit5c').click(function (){
        batterychart.series[1].setData(batteryresponseCircuit5c);
        $('#bbtncircuit1').removeClass("active");
        $('#bbtncircuit2').removeClass("active"); 
        $('#bbtncircuit3').removeClass("active");
        $('#bbtncircuit4').removeClass("active");
        $('#bbtncircuit5A').removeClass("active");
        $('#bbtncircuit5B').removeClass("active");
        $('#bbtncircuit5C').addClass("active");
        $('#bbtn4kVSub').removeClass("active");
    });
    
    $('#bbtn4kVSub').click(function (){
        batterychart.series[1].setData(batteryresponse4kVSub);
        $('#bbtncircuit1').removeClass("active");
        $('#bbtncircuit2').removeClass("active"); 
        $('#bbtncircuit3').removeClass("active");
        $('#bbtncircuit4').removeClass("active");
        $('#bbtncircuit5A').removeClass("active");
        $('#bbtncircuit5B').removeClass("active");
        $('#bbtncircuit5C').removeClass("active");
        $('#bbtn4kVSub').addClass("active");
    });
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
/////////////////////////////////////////////////////////////////////////////////  
///// Dashboard - Guage Chart and Bar Chart
/////////////////////////////////////////////////////////////////////////////////
    
    $(function () {

    var gaugeOptions = {

        chart: {
            type: 'solidgauge'
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    // The speed gauge
    $('#container-speed').highcharts(Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 200,
            title: {
                text: 'Load',
                y: -50
            }
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Speed',
            data: [120],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:18px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                       '<span style="font-size:12px;color:silver">km/h</span></div>'
            },
            tooltip: {
                valueSuffix: ' kW'
            }
        }]

    }));
        
        
        
    $(function () {
    $('#stackedbarchart').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Current Generation Mix'
        },
        xAxis: {
            categories: ['Generation']
        },
        legend: {
            reversed: true,
            enabled: false
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Wind',
            data: [50]
        }, {
            name: 'Solar',
            data: [20]
        }, {
            name: 'SOC',
            data: [30]
        }]
    });
});

   

});
    
 
    
/////////////////////////////////////////////////////////////////////////////////  
///// Dynamic Load Chart
/////////////////////////////////////////////////////////////////////////////////
     
/*
    $(function() {
        
    var options3 = {
        chart: {
            renderTo: 'dynamicloadchart',
            type: 'area',
            marginRight: 130,
            marginBottom: 25,
            events: {
                    load: function () {

                        // set up the updating of the chart each second

                        var series = this.series[0];
                        var x, y;
                        
                        setInterval(function () {
                            updateData(series);
                        }, 1500);
                    }
                }
   
        },
        plotOptions : {
            series: {
                marker: {
                    radius: 1
                }
            }
        },
        title: {
            text: 'Circuit Loads Dynamics',
            x: -20 //center
        },
        xAxis: {
            type: 'linear',
            title: {
                text: 'Hours',
                enabled: true
            },
            min: 0,
            max: 24
        },
        yAxis: {
            title: {
                text: 'Load [kW]'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            enabled: false
        },
        tooltip: {
            formatter: function() {
                    return  '<b>Time: </b>' + this.x + '<br />' + '<b>Load: </b>' + this.y + ' kW';
            }
        },
        series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = 0,
                        i;

                    for (i = -4; i <= 0; i += 0.25) {
                        data.push({
                            x: time + i,
                            y: Math.random()
                        });
                    }
                    return data;
                }()),
                pointStart: 0,
                pointInterval: 1 // one day
            }]
    
    }

    
    $.getJSON("completeLoad.php?season=1", function(loadresponse) {

        chart = new Highcharts.Chart(options3);
    
    }); 
        
    });
    
*/
     
/////////////////////////////////////////////////////////////////////////////////  
///// Drill Down Chart
/////////////////////////////////////////////////////////////////////////////////
 /*   
    $(function() {
	//Highcharts with mySQL and PHP - Ajax101.com
        
    var options = {
        chart: {
            renderTo: 'basiccolumnchart',
            type: 'column',
            marginRight: 130,
            marginBottom: 25
        },
        title: {
            text: 'Circuit Loads & Generation',
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            categories: []
        },
        yAxis: {
            title: {
                text: 'Load [kW]'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true
                }
            }
        },
        tooltip: {
            formatter: function() {
                    return '<b>'+ this.series.data[this.x].name +'</b><br/>' + this.y + ' kW';
            }
        },
        series: [{}],
        drilldown: {
            drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    y: 0,
                    x: 0
                },
                theme: {
                    fill: 'white',
                    'stroke-width': 1,
                    stroke: 'silver',
                    r: 0,
                    states: {
                        hover: {
                            fill: '#bada55'
                        },
                        select: {
                            stroke: '#039',
                            fill: '#bada55'
                        }
                    }
                }

            },
            series: [{}]
        
        }
    }
    
    $.getJSON("totals.php", function(json) {
        options.series[0] = json;
        
    });     
        
    $.getJSON("details.php", function(response) {
        options.drilldown.series = response;
        chart = new Highcharts.Chart(options);
    }); 
            
        
        
    });
     
    
    
*/
    
    
    /*
    // Solution #1 - Purely based off of generation and not considering the actual load.  Assumption is that renewables added together = total load.
    if (batterypower < 0) {
        generationtotal = Math.abs(batterypower) + solarpower + windpower;
        solarpercent = Math.round(solarpower/generationtotal*100);
        windpercent = Math.round(windpower/generationtotal*100);
        batterypercent = Math.round(Math.abs(batterypower)/generationtotal*100);
    } else {
        generationtotal = solarpower + windpower;
        solarpercent = Math.round(solarpower/generationtotal * 100);
        windpercent = Math.round(windpower/generationtotal * 100);
        batterypercent = 0;
    }
    */
    
});