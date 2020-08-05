$(document).ready(fetchGeoHiveDataSet);                             // On document ready initiate fetchGeoHiveDataSet function

// API CountryWide Query URL Filtered for Daily Cases, Deaths, Hospitaluised Cases, Gender & Age Range
// Response to be used for headline info, graphs and pie charts
const countryWideURL =
  "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,ConfirmedCovidCases,TotalConfirmedCovidCases,ConfirmedCovidDeaths,TotalCovidDeaths,CovidCasesConfirmed,HospitalisedCovidCases,RequiringICUCovidCases,Male,Female,Unknown,Aged1,Aged1to4,Aged5to14,Aged15to24,Aged25to34,Aged35to44,Aged45to54,Aged55to64,Aged65up,Median_Age,FID&outSR=4326&f=json";

// API County Query URL Filtered for Daily Cases, Deaths & recovered
// Response to be used for Google HeatMAP, Table info and pie charts

// countyURL#1  https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIreland/FeatureServer/0/query?where=1%3D1&outFields=CountyName,TimeStamp,ConfirmedCovidCases,ConfirmedCovidDeaths,ConfirmedCovidRecovered&returnGeometry=false&returnDistinctValues=true&outSR=4326&f=json
// countyURL#2  https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=CountyName,ConfirmedCovidCases,ConfirmedCovidDeaths,FID,TimeStampDate,ConfirmedCovidRecovered&returnGeometry=false&returnDistinctValues=true&outSR=4326&f=json

const countyURL =
  "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19CountyStatisticsHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=CountyName,ConfirmedCovidCases,ConfirmedCovidDeaths&returnGeometry=false&returnDistinctValues=true&outSR=4326&f=json";


function fetchGeoHiveDataSet() {
  $.when(
      $.getJSON(countryWideURL),
      $.getJSON(countyURL)
      ).then(                                                       //Retrive JSOn Parsed Data from countryWideURL
    function (firstResponse, secondResponse) {
      var irelandData = firstResponse[0];                           // set irelandData to store API response
      var countyData = secondResponse[0];                           // set countyData to store API response
      console.dir(countyData)                                    // object tree include features and fields objects for data content & headers respectively
      $("#ireland-data").html(parseIrelandData(irelandData));       // placeholder for calling parseIrelandData function passing in irelandData response
      $("#county-data").html(parseCountyData(countyData));           // placeholder for calling parseCountyData function passing in countyData response
    },
    function (errorResponse) {                                      // 2nd argument of $.when()$.then() promise for Error Responses
      if (errorResponse.status === 404) {
        $("#headline-data").html(
          `<h2>The Service is currently unavailable</h2>`
        );
      } else {
        console.log(errorResponse);
        $("#headline-data").html(
          `<h2>Error: ${errorResponse.responseJSON.message}</h2>`
        );
      }
    }
  );
}

function parseIrlTableHeaders(obj) {                    // Deserialise Table Header Get Operation
  var tableHeaders = [];
  Object.entries(obj).forEach(function (entry) {        // Object Entries used with forEach () Method to iterate through fields object
    console.log("Irl Table Header Calls SuccessFull");
    tableHeaders.push(entry[1].name);                   // Push field name into table cell.
  });
  return tableHeaders;                                  // Return header table cell to table row.
}

function parseIrelandData(irelandData) {
 
  headerData = irelandData.fields; // Header fields array.
  var tableHeaders = parseIrlTableHeaders(headerData);

  contentData = irelandData.features; // DataContent features array.
  var tableRows = [];

  contentData.forEach(function (featuresItem) {
    featuresItem = featuresItem.attributes;
    var dataRow = [];
    Object.values(featuresItem).forEach(function (value) {          // iterate through array and retieve content data
      console.log("Irl Table Rows Call SuccessFull");
      dataRow.push(value);                                          // push the retrieved value into the table cell      
    });
    tableRows.push(dataRow);                                        // push the table cell into a data row.    
  });
  
  // Create single Array concatenating header & row data to be used in pie charts and headline details
  var irelandDataToArray = tableRows;    
  irelandDataToArray.unshift(tableHeaders);
  //console.log(irelandDataToArray);

  parseIrlHeadlineData(irelandDataToArray);                         // Call parseIrlHeadlineData function passing in irelandDataToArray as argument
 
}


function parseIrlHeadlineData(obj) {

    console.log("parseIrlHeadlineData function initiated")

    var headlineData = [];                                          // Create variable to store Ireland Headline Data
    headlineData.push(obj[obj.length - 1][2]);                      // Latest Total Cumulative Covid cases in 3rd item of final array
    headlineData.push(obj[obj.length - 1][4]);                      // Latest Total Cumulative Covid Deaths in 5th item of final array

    $("#headline-data").html(`
        <p>Total Confirmed Covid Cases: ${headlineData[0]}</p>
        <p>Total Covid Deaths: ${headlineData[1]}</p>`
    );

    //console.log(headlineData);
}


function parseCountyTableHeaders(obj) {                             // Deserialise Table Header Get Operation
    var countyTableHeaders = [];
    obj.forEach(function (item) {
        countyTableHeaders.push(`<td>${item.name}</td>`);
    });

    return `<tr>${countyTableHeaders}</tr>`;                                   // Return header table cell to table row.
}



function parseCountyData(countyData) {
    
  var countyTable = "";  
  
  headerData = countyData.fields; // Header fields array.
  var countyTableHeaders = parseCountyTableHeaders(headerData);

  contentData = countyData.features; // DataContent features array.
  var countyTableRows = [];

  contentData.forEach(function (featuresItem) {
    featuresItem = featuresItem.attributes;
    var countyDataRow = [];
    Object.values(featuresItem).forEach(function (value) {          // iterate through array and retieve content data
      console.log("County Table Rows Call SuccessFull");
      countyDataRow.push(`<td>${value}</td>`);                                          // push the retrieved value into the table cell      
    });
    countyTableRows.push(`<tr>${countyDataRow}</tr>`);                                    // push the table cell into a data row.    
  });

  //var countyArray = countyTableRows;    
  //countyArray.unshift(countyTableHeaders);
  //countyArray = countyArray.replace( /<tr>/g,""); 
  //console.log(countyArray);

  countyTable = `<table>${countyTableHeaders}${countyTableRows}</table>`;       //bind table header and row elements
  countyTable = countyTable.replace( /,/g,"");                                  //remove commas from table  

  return countyTable;

}
