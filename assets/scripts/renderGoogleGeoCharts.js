/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Map Data Collector

function parseCountyArrayForMap(fromCSVParse) {             // Create create three column array for Geo Map

   
    var fromCSVParse = fromCSVParse.map(function (item) {
        return item.slice(0, 3);                            // only retain upto item index 2 (3rd item in subarray)
    });

    fromCSVParse[4][0] = "IE-CO";                                   
    // This replaces the Cork label with IE-CO to faciliate GeoChart constraint nd render cor data to the map.

                                                            
    var parsedCountyArrayForMap = fromCSVParse;    

    // console.log("this is parsedCountyArrayForMap inside parsedCountyArrayForMap() function: ", parsedCountyArrayForMap);

    setMapData(parsedCountyArrayForMap);                    // This passes the parsed array into the Google Charts API Call.
    
}


function setMapData(fromMapArrayParse) {
  
  var mapData = fromMapArrayParse;


        google.charts.load("current", {
            packages: ["geochart"],                         // Load GeoChart Package
            mapsApiKey: Apikey, 

        });

        google.charts.setOnLoadCallback(drawRegionsMap);


        // Declare GeoChart Function for Country Map
        function drawRegionsMap() {

            // console.log("this is mapData inside drawRegionsMap() function: ", mapData);

            var data = google.visualization.arrayToDataTable(mapData, false);
            /* 
            This passes the chartData Array into API and converts to correct
            format for consumption by the API. false means the array has a header row
            */

            var options = {
                region: "IE",                                                   // This property sets the focus on Ireland
                resolution: "provinces",                                        // This property sets the county boudaries
                colorAxis: { colors: ['red', 'black', '#5b0000'] },             // LightRed(#f56967), DarkRed(#5b0000)
                backgroundColor: 'white',   
                datalessRegionColor: 'LightGrey',
                defaultColor: '#f5f5f5',
            };

            var chart = new google.visualization.GeoChart(
                document.getElementById("map")
            );

            chart.draw(data, options);
        }

}


