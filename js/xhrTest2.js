const baseURL = "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,TotalConfirmedCovidCases,TotalCovidDeaths&returnGeometry=false&returnDistinctValues=true&outSR=4326&f=json";		// open connection with URL we want to retrieve from server";

function getData(cb) {
    var xhr = new XMLHttpRequest();                             // New javaScript xhr object instance that faciliates consumption of GeoHive API

    xhr.open("GET", baseURL);                                   // Open connection to Geo Hive service
    xhr.send();                                                 // send request

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {       // On successful completion of operation 
            cb(JSON.parse(this.responseText));                  // JSON parse response from server. callback from outside function
            console.log("SUCCESS");                             // Log "Success" to console
        }
    };


}


function writeToDocument() {
    getData(function(data) {
        console.dir(data);                          // Log Data Tree to console.
        data = data.features;                       // console.dir tree, features, attributes [date, TotalConfirmedCovidCases, TotalCovidDeaths]
        data.forEach(function(item){                // iterate throught features array and write below values to #data <div>
            document.getElementById("data").innerHTML += "<p>" + item.attributes.TotalConfirmedCovidCases + "  ,  " + item.attributes.TotalCovidDeaths  + "</p>"
        });
        
    });
}




$(document).ready(writeToDocument);             // On document ready initiate writeToDocument function
