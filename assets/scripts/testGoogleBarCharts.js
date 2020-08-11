/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Bar Chart Data Collector

function parseIrlBarChartData(fromParseIrelandData) {

    console.log("parseIrlBarChartData function initiated")

    //console.log("This is the fromParseIrelandData Array inside the parseIrlHeadlineData() function: ",fromParseIrelandData)

    var irlCasesBarChartData = fromParseIrelandData.map(function (item) {
        return (item.slice(0, 2));                                          // only retain upto item index 2 in subarray...(so indexes 0 & 1)
    });

    var irlDeathsBarChartData = fromParseIrelandData.map(function (item) {
        return (item.slice(0, 1)).concat(item.slice(2, 3));                            // concatenates index 0 and 2 of each subarray)
    });

    console.log("This is the irlCasesBarChartData Array inside the parseIrlBarChartData() function: ", irlCasesBarChartData);
    console.log("This is the irlDeathsBarChartData Array inside the parseIrlBarChartData() function: ", irlDeathsBarChartData);

    setBarChartData(irlCasesBarChartData, irlDeathsBarChartData);
}


function setBarChartData(fromBarChartParseCases, fromBarChartParseDeaths) {

    var barChartOneData = fromBarChartParseCases;
    var barChartTwoData = fromBarChartParseDeaths;

    //console.log("This is the barChartOneData data inside setMapData(): ", barChartOneData);
    //console.log("This is the barChartTwoData data inside setMapData(): ", barChartTwoData);


    google.charts.load("current", {
        packages: ["corechart"]
        // Load Bar Chart package
    });

    //google.charts.setOnLoadCallback(drawRegionsMap);
    google.charts.setOnLoadCallback(drawTestBarChartOne);
    google.charts.setOnLoadCallback(drawTestBarChartTwo);



    // Declare function to draw Test Bar Chart One 

    function drawTestBarChartOne() {


        var data = google.visualization.arrayToDataTable(barChartOneData, false);
        // assumes you have timestamps in column 0, and two data series (columns 1 and 2)
        var view = new google.visualization.DataView(data);
        view.setColumns([{
            type: 'date',
            label: data.getColumnLabel(0),
            calc: function (dt, row) {
                var timestamp = dt.getValue(row, 0) / 10000; // convert to milliseconds
                return new Date(timestamp);
            }
        }, 1]);

        /*var formatter_short = new google.visualization.DateFormat({formatType: 'short'});
        formatter_short.format(data, 0);*/

        var options = {
            title: 'Country Wide Cases Over Time',
            hAxis: {
                title: 'Date',
                //format: 'h:mm a',
            },
            vAxis: {
                title: 'Number of New Cases Per Day'
            }
        };

        var chart = new google.visualization.ColumnChart(
            document.getElementById('ireland-total-cases-graphed'));

        chart.draw(data, options);
    }


    // Declare function to draw Test Bar Chart Two 
    function drawTestBarChartTwo() {


        var data = google.visualization.arrayToDataTable(barChartTwoData, false);


        var options = {
            title: 'Country Wide Deaths Over Time',
            hAxis: {
                title: 'Date',
                //format: 'h:mm a',
            },
            vAxis: {
                title: 'Number of New Deaths Per Day'
            }
        };

        var chart = new google.visualization.ColumnChart(
            document.getElementById('ireland-total-deaths-graphed'));

        chart.draw(data, options);
    }
}










