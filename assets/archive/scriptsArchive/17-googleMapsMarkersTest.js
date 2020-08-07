google.charts.load("current", {
  packages: ["geochart"],
  // Note: you will need to get a mapsApiKey for your project.
  // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
  mapsApiKey: "AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY",        //Google Sample API key
});
google.charts.setOnLoadCallback(drawMarkersMap);

function drawMarkersMap() {
  var data = google.visualization.arrayToDataTable([
    ["City", "Population", "Area"],
    ["Dublin", 2761477, 1285.31],
    ["Cork", 1324110, 181.76],
    ["Galway", 959574, 117.27],
    ["Letterkenny", 907563, 130.17],
  ]);

  var options = {
    region: "IE",
    displayMode: "markers",
    colorAxis: { colors: ["green", "blue"] },
  };

  var chart = new google.visualization.GeoChart(
    document.getElementById("map")
  );
  chart.draw(data, options);
}
