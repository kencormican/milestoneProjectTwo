function parseCountyArrayForMap(fromCSVParse) {                       // Create create three column array for Geo Map

   
    fromCSVParse = fromCSVParse.map(function (item) {
        return item.slice(0, 3);                           // only retain upto item index 2 (3rd item in subarray)
    });

    fromCSVParse[4][0] = "IE-CO";                                    
    // This replaces the Cork label with IE-CO to faciliate GeoChart constraint nd render cor data to the map.

    //console.log("this is obj after the pop inside parsedCountyArrayForMap(): ", obj );
                                                            
    parsedCountyArrayForMap = fromCSVParse;    

    //console.log("this is parsedCountyArrayForMap inside parsedCountyArrayForMap(): ", parsedCountyArrayForMap);
            
    setMapData(parsedCountyArrayForMap);                    // This passes the parsed array into the Google Charts API Call.
    
}


function setMapData(fromMapArrayParse) {
  
  var mapData = fromMapArrayParse;

  // $.makeArray(mapData);                                          // convert Array object to true array

  // console.log($.isArray(mapData));                                 // Is object a true array

  

  google.charts.load("current", {
    packages: ["geochart"],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    mapsApiKey: Apikey,
  });
  google.charts.setOnLoadCallback(drawRegionsMap);

  function drawRegionsMap() {

    console.log("this is mapData inside drawRegionsMap(): ", mapData);

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

