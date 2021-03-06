/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Modify Unix Timestamp to Local Date

function fetchLocalDate(fromUnixDateFunc) {

    // Extracts local date form Unix Timestamp

    for (i = 1; i < fromUnixDateFunc.length; i++) {
        var unixTimestamp = fromUnixDateFunc[i][0];
        var resetDate = new Date(unixTimestamp);
        fromUnixDateFunc[i][0] = resetDate.toLocaleDateString("en-IE"); // Convert to English Ireland format
    }
    return fromUnixDateFunc;

}


/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Bar Chart Data Collector

function parseIrlBarChartData(fromParseIrelandData) {

    var irlCasesBarChartData = fromParseIrelandData.map(function (item) {
        return (item.slice(0, 2));                                          // only retain upto item index 2 in subarray...(so indexes 0 & 1)
    });

    var irlDeathsBarChartData = fromParseIrelandData.map(function (item) {
        return (item.slice(0, 1)).concat(item.slice(2, 3));                            // concatenates index 0 and 2 of each subarray)
    });

    setBarChartData(irlCasesBarChartData, irlDeathsBarChartData);
}


function setBarChartData(fromBarChartParseCases, fromBarChartParseDeaths) {

    var barChartOneUnixData = fromBarChartParseCases;
    var barChartTwoUnixData = fromBarChartParseDeaths;

    barChartOneData = fetchLocalDate(barChartOneUnixData);                  // Call the fetchLocalDate function to convert unix timestamp to date
    barChartTwoData = fetchLocalDate(barChartTwoUnixData);                  // Call the fetchLocalDate function to convert unix timestamp to date

    google.charts.setOnLoadCallback(drawBarChartDailyCases);
    google.charts.setOnLoadCallback(drawBarChartDailyDeaths);

    // Declare function to draw Bar Chart for Daily Confirmed Cases 

    function drawBarChartDailyCases() {

        /*Multiple API calls were made to render the Daily COVID information to screen.  
        The same GeoHive API call used to produce the Headline Data is used to retrieve this data set. 
        The resultant object is then passed through multiple functions to produce the required array
        format before being rendered to the page via the Google Charts API.
        Functions used to process the geoHive JSON response into arrays including the parseDailyCasesData(),
        fetchLocalDate(), parseIrlBarChartData and setBarChartData().
        Note the deserialised fetchLocalDate() is used to alter the JSON response Unix Timestamp into a usable Date format 
        This Data set is rendered to only medium and large window sizes.*/

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

        var chart = new google.visualization.ColumnChart(document.getElementById('ireland-total-deaths-graphed'));

        chart.draw(data, options);
    }
}










