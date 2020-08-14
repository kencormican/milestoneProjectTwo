/*----------------------------------------------------------------------------------------------------------------------------------------*/
// County Table Data Collector


function setTableChartData(fromProcessCSVData) {

    var countyTableChartData = fromProcessCSVData;
    console.log("This is the countyTableChartData data inside setTableChartData(): ", countyTableChartData);


    google.charts.load("current", {
        packages: ["table"]                 // Load Table Chart package
    });


    google.charts.setOnLoadCallback(drawCountyTable);


    // Declare function to draw the County Table Chart

    function drawCountyTable() {

        var data = google.visualization.arrayToDataTable(countyTableChartData, false);

        var options = {
            //title: 'County Breakdown of Covid Cases and Deaths'            
        };

        /*chartArea: {
          height: chartAreaHeight,
          top: "100",
          right: "100",
          bottom: "100",
          left: "100"
        },*/

        var table = new google.visualization.Table(document.getElementById('county-data-table'));
        //table.draw(data, {showRowNumber: true, width: '100%', height: chartHeight, allowHtml: true});
        table.draw(data, {showRowNumber: true, width: '100%', height: '100%',allowHtml: true});

        //chart.draw(data, options);
    }

}










