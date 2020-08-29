/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Map Data Collector

function parseCountyArrayForMap(fromCSVParse) {             // Create create three column array for Geo Map


    var fromCSVParse = fromCSVParse.map(function (item) {
        return item.slice(0, 3);                            // only retain upto item index 2 (3rd item in subarray)
    });

    fromCSVParse[4][0] = "IE-CO";
    // This replaces the Cork label with IE-CO to faciliate GeoChart constraint nd render cor data to the map.

    var parsedCountyArrayForMap = fromCSVParse;

    setMapData(parsedCountyArrayForMap);                    // This passes the parsed array into the Google Charts API Call.

}


function setMapData(fromMapArrayParse) {

    /*  This Map renders the Nationwide COVID statistics published by the Central Statistics Office on the 28th of August. 
        Please Note, A static Data Set was required in this instance because robust dynamic open source 
        information is currently unavailable on a county by county basis.The CSV formatted data is initally retrieved from 
        a locally stored file using a jQuery when().then() promise, before being parsed into arrays using the processCSVData()
        fucntion and the jQuery.csv library.  It it ultimately rendered to a geographic Heat Map using a Google Maps API Call 
        in conjunction with the Geo Chart package/library.
    
        This Data set is rendered to all window sizes.`,*/

    var mapData = fromMapArrayParse;

    google.charts.setOnLoadCallback(drawRegionsMap);


    // Declare GeoChart Function for Country Map
    function drawRegionsMap() {

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


