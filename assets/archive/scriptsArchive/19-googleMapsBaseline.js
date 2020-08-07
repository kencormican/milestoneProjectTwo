function setMapData(obj2) {                                        // This is a callback to the 
  var chartData = obj2;

  //$.makeArray(obj2);                 // covert Array object to true array

  console.log($.isArray(obj2)); // Is object a true array

  google.charts.load("current", {
    packages: ["geochart"],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    mapsApiKey: Apikey,
  });
  google.charts.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable(chartData, false);

    var options = {
      region: "IE",                                                 // This property sets the focus on Ireland
      resolution: "provinces",                                      // This property sets the county boudaries
          colorAxis: {colors: ['red', 'black', '#ab0003']},         // LightRed(#f56967), DarkRed(#ab0003)
          backgroundColor: '#81d4fa',
          datalessRegionColor: 'grey',
          defaultColor: '#f5f5f5',
    };
    var chart = new google.visualization.GeoChart(
      document.getElementById("map")
    );

    chart.draw(data, options);
  }
}

