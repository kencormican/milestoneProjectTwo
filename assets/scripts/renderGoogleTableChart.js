/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Interactive Table Function animates table height on button click

  $(".table-slider-button").click(function () {

     if ($(".county-table-row").css("height") === "290px") {            // default Table height equal to 290px
          $(".county-table-row").animate({ height: "+=400" }, 1000)     // Grow height by 400px to display entire table
          $(".table-slider").fadeTo(1000,0);                            // Slider overlay fadesOut bottom of visble table div 
     }
      if ($(".county-table-row").css("height") != "290px") {
          $(".county-table-row").animate({ height: "290px" }, 1000);    // return table height to default   
          $(".table-slider").fadeTo(1000,0.9);                          // Slider overlay fadesOut bottom of visble table div 
     }    
  });



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

        var table = new google.visualization.Table(document.getElementById('county-data-table'));
        table.draw(data, {showRowNumber: true, width: '100%', height: '100%',allowHtml: true});
        // display row numbers, set height and width to 100% of container adn allow html interworking 
    }

}










