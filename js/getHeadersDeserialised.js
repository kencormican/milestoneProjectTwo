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


function getTableHeaders(obj) {
    var tableHeaders = [];

    Object.entries(obj).forEach(function(entry) {
        console.log("Table Header Calls SuccessFull")
        tableHeaders.push(`<td>${entry[1].name}</td>`)
    });

    return `<tr>${tableHeaders}</tr>`;
}


function writeToDocument() {
  var pageElement = document.getElementById("data");
  pageElement.innerHTML = "";

  getData(function (data) {

    //console.dir(data);
    headerData = data.fields;
    var tableHeaders = getTableHeaders(headerData);
    
    pageElement.innerHTML = `<table>${tableHeaders}</table>`;

  });

}