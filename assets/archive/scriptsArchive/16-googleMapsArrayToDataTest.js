google.charts.load("current", {
  packages: ["geochart"],
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  mapsApiKey: Apikey,
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap(obj) {

console.log(obj); 
var chartData = [];
chartData = [["County","col3","col3",],
["Dublin", 2000,400]]

console.log(chartData);

// var data = google.visualization.arrayToDataTable(chartData, false);
// var data = google.visualization.getSelection(chartData)
// var data = new google.visualization.DataTable($parse.jsonData(chartData));
 var data = google.visualization.DataTable(chartData);
  var data = new google.visualization.arrayToDataTable(chartData, false);
 

       var options = {
          region: "IE",
          resolution: "provinces",
  
        };

   var chart = new google.visualization.GeoChart(
          document.getElementById("map")
        );
        chart.draw(data, options);
      }

