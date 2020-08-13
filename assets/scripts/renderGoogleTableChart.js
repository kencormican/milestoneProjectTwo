/*----------------------------------------------------------------------------------------------------------------------------------------*/
// County Table Data Collector


function setTableChartData(fromProcessCSVData) {

    var countyTableChartData = fromProcessCSVData;
    console.log("This is the countyTableChartData data inside setTableChartData(): ", countyTableChartData);


    google.charts.load("current", {
        packages: ["table"]                 // Load Table Chart package
    });


    google.charts.setOnLoadCallback(drawCountyTableChart);


    // Declare function to draw the County Table Chart

    function drawCountyTableChart() {

        var data = google.visualization.arrayToDataTable(countyTableChartData, false);

        var options = {
            title: 'County Breakdown of Covid Cases and Deaths'            
        };

        var chart = new google.visualization.Table(
            document.getElementById('county-data-table'));

        chart.draw(data, options);
    }

}










