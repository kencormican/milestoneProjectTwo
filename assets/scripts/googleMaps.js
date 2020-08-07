function setMapData(obj2) {
  var mapData = obj2;

  //$.makeArray(obj2);                                          // convert Array object to true array

  console.log($.isArray(obj2));                                 // Is object a true array

  console.log("this is mapData inside drawRegionsMap(): ", mapData);

  google.charts.load("current", {
    packages: ["geochart"],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    mapsApiKey: Apikey,
  });
  google.charts.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {

    

    var data = google.visualization.arrayToDataTable(mapData, false);     
    /* 
    This passes the chartData Array into API and converts to correct
    format for consumption by the API. false means the array has a header row
    */

    var options = {
      region: "IE",                                                 // This property sets the focus on Ireland
      resolution: "provinces",                                      // This property sets the county boudaries
          colorAxis: {colors: ['red', 'black', '#5b0000']},         // LightRed(#f56967), DarkRed(#5b0000)
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

