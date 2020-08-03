$(document).ready(writeToDocument); // On document ready initiate writeToDocument function

const countryWideURL =   "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=false&returnDistinctValues=true&outSR=4326&f=json";

// filtered for [date, TotalConfirmedCovidCases, TotalCovidDeaths] - "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,TotalConfirmedCovidCases,TotalCovidDeaths&returnGeometry=false&returnDistinctValues=true&outSR=4326&f=json";
// XHR Function to retrieve COVID Data Set from Geo Hive Open Source Feature - [CovidStatisticsProfileHPSCIrelandOpenData]

function getData(cb) {
  var xhr = new XMLHttpRequest(); // New javaScript xhr object instance that faciliates consumption of GeoHive API

  xhr.open("GET", countryWideURL); // Open connection to Geo Hive service
  xhr.send(); // send request

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // On successful completion of operation when OK received from server
      cb(JSON.parse(this.responseText)); // JSON parse response from server. callback from outside function
      console.log("API Call Successful"); // Log Success Message to console
    }
  };
}



function writeToDocument() {
  var pageElement = document.getElementById("data");
  pageElement.innerHTML = "";

  getData(function (data) {
    var tableHeaders = [];
    //console.dir(data);
    data = data.fields;
    data.forEach(function (item) { 
        tableHeaders.push(`<td>${item.name}</td>`)
        });
    
    pageElement.innerHTML = `<table>${tableHeaders}</table>`;

  });

}