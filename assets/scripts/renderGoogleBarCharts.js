/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Modify Unix Timestamp to Local Date

function fetchLocalDate (fromUnixDateFunc){

    // Extracts local date form Unix Timestamp

        for (i=1; i<fromUnixDateFunc.length; i++){
        var unixTimestamp = fromUnixDateFunc[i][0];
        var resetDate = new Date(unixTimestamp); 
        fromUnixDateFunc[i][0] = resetDate.toLocaleDateString("en-IE");        
    }
        //console.log("this is inside fromUnixDateFunc fetchLocalDate(): ",fromUnixDateFunc);

        return fromUnixDateFunc;

}


/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Bar Chart Data Collector

function parseIrlBarChartData(fromParseIrelandData) {

    // console.log("parseIrlBarChartData function initiated")

    var irlCasesBarChartData = fromParseIrelandData.map(function (item) {
        return (item.slice(0, 2));                                          // only retain upto item index 2 in subarray...(so indexes 0 & 1)
    });

    var irlDeathsBarChartData = fromParseIrelandData.map(function (item) {
        return (item.slice(0, 1)).concat(item.slice(2, 3));                            // concatenates index 0 and 2 of each subarray)
    });

    // console.log("This is the irlCasesBarChartData Array inside the parseIrlBarChartData() function: ", irlCasesBarChartData);
    // console.log("This is the irlDeathsBarChartData Array inside the parseIrlBarChartData() function: ", irlDeathsBarChartData);

    setBarChartData(irlCasesBarChartData, irlDeathsBarChartData);
}


function setBarChartData(fromBarChartParseCases, fromBarChartParseDeaths) {

    var barChartOneUnixData = fromBarChartParseCases;
    var barChartTwoUnixData = fromBarChartParseDeaths;

    //console.log("This is the barChartOneUnixData data inside setMapData(): ", barChartOneUnixData);
    //console.log("This is the barChartTwoUnixData data inside setMapData(): ", barChartTwoUnixData);

    barChartOneData = fetchLocalDate(barChartOneUnixData);                  // Call the fetchLocalDate function to convert unix timestamp to date
    barChartTwoData = fetchLocalDate(barChartTwoUnixData);                  // Call the fetchLocalDate function to convert unix timestamp to date

    //console.log("This is the barChartOneData data inside setMapData(): ", barChartOneData);
    //console.log("This is the barChartTwoData data inside setMapData(): ", barChartTwoData);

    google.charts.setOnLoadCallback(drawBarChartDailyCases);
    google.charts.setOnLoadCallback(drawBarChartDailyDeaths);



    // Declare function to draw Bar Chart for Daily Confirmed Cases 

    function drawBarChartDailyCases() {

        var data = google.visualization.arrayToDataTable(barChartOneData, false);
        // assumes you have timestamps in column 0, and two data series (columns 1 and 2)

        var options = {
            height: 400,
            title: 'Country Wide Cases Over Time',
            legend: 'none',
            hAxis: {
                title: 'Covid Cases Timeline',
            },
            vAxis: {
                title: 'Number of New Cases Per Day'                
            }
        };

        var chart = new google.visualization.ColumnChart(
            document.getElementById('ireland-total-cases-graphed'));

        chart.draw(data, options);
    }


    // Declare function to draw Bar Chart for Daily Confirmed Deaths
     
    function drawBarChartDailyDeaths() {


        var data = google.visualization.arrayToDataTable(barChartTwoData, false);       


        var options = {
            height: 400,
            title: 'Country Wide Deaths Over Time',
            legend: 'none',
            hAxis: {
                title: 'Covid Deaths Timeline',
            },
            
            vAxis: {
                title: 'Number of New Deaths Per Day',
            }
        };

        //var view = new google.visualization.DataView(data);
        //data.setColumnProperty(0,'type','date');

              var chart = new google.visualization.ColumnChart(document.getElementById('ireland-total-deaths-graphed'));

        chart.draw(data, options);
    }
}










