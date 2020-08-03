$(document).ready(writeToDocument);                     // On document ready initiate writeToDocument function

// API CountryWide Query URL Filtered for Daily Cases, Deaths, Hospitaluised Cases, Gender & Age Range
const countryWideURL =
  "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,ConfirmedCovidCases,TotalConfirmedCovidCases,ConfirmedCovidDeaths,TotalCovidDeaths,CovidCasesConfirmed,HospitalisedCovidCases,RequiringICUCovidCases,Male,Female,Unknown,Aged1,Aged1to4,Aged5to14,Aged15to24,Aged25to34,Aged35to44,Aged45to54,Aged55to64,Aged65up,Median_Age,FID&outSR=4326&f=json";

// XHR Function to retrieve COVID Data Set from Geo Hive Open Source Feature - [CovidStatisticsProfileHPSCIrelandOpenData]

function getData(cb) {
  var xhr = new XMLHttpRequest();                       // New javaScript xhr object instance that faciliates consumption of GeoHive API

  xhr.open("GET", countryWideURL);                      // Open connection to Geo Hive service
  xhr.send();                                           // send request

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {   // On successful completion of operation when OK received from server
      cb(JSON.parse(this.responseText));                // JSON parse response from server. callback from outside function
      console.log("API Call Successful");               // Log Success Message to console
    }
  };
}

function getTableHeaders(obj) {                         // Deserialise Table Header Get Operation      
  var tableHeaders = [];

  Object.entries(obj).forEach(function (entry) {        // Object Entries used with forEach () Method to iterate through fields object
    console.log("Table Header Calls SuccessFull");
    tableHeaders.push(`<td>${entry[1].name}</td>`);     // Push field name into table cell.
  });

  return `<tr>${tableHeaders}</tr>`;                    // Return header table cell to table row.
}

function writeToDocument() {                            // writeToDocument function to push API response to the data <div>>
  var pageElement = document.getElementById("data");    // pageElement to store data id
  pageElement.innerHTML = "";                           // innerHTML initiated to blank string

  getData(function (data) {
    //console.dir(data);                                // Console dir show tree to include features and fields objects for data content & headers respectively     

    headerData = data.fields;                           // Header fields array.
    var tableHeaders = getTableHeaders(headerData);

    contentData = data.features;                        // DataContent features array.
    var tableRows = [];

    contentData.forEach(function (featuresItem) {
      featuresItem = featuresItem.attributes;
      var dataRow = [];
      Object.values(featuresItem).forEach(function (value) {        // iterate through array and retieve content data
        console.log("Table Rows Call SuccessFull");
        //console.log(value)
        dataRow.push(`<td>${value}</td>`);                          // push the retrieved value into the table cell
        //Truncated Column Width
        //rowData = featuresItem[value].toString();
        //truncatedColData = rowData.substring(0,20);
      });
      tableRows.push(`<tr>${dataRow}</tr>`);                        // push the table cell into a data row.
    });
    // Header & Rows Added and string commas removed from table.
    // Table rendered to pageElement using innerHTML method and template literals
    pageElement.innerHTML = `<table>${tableHeaders}${tableRows}</table>`.replace( /,/g,""); 
    console.log(tableRows.length)
    
    // Print Headline Data to Page
    var headlineElement = document.getElementById("headline"); 
    var tableArray = tableRows[tableRows.length-1].split(",");
    headlineElement.innerHTML = `
    <p>Total Confirmed Covid Cases: ${tableArray[2]}</p>
    <p>Total Covid Deaths: ${tableArray[4]}</p>
    `

  });
}
