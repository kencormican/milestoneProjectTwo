$(document).ready(fetchGeoHiveDataSet); // On document ready initiate fetchGeoHiveDataSet function

// API CountryWide Query URL Filtered for Daily Cases, Deaths, Hospitaluised Cases, Gender & Age Range
// Response to be used for headline info, graphs and pie charts
const countryWideURL =
  "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,ConfirmedCovidCases,TotalConfirmedCovidCases,ConfirmedCovidDeaths,TotalCovidDeaths,CovidCasesConfirmed,HospitalisedCovidCases,RequiringICUCovidCases,Male,Female,Unknown,Aged1,Aged1to4,Aged5to14,Aged15to24,Aged25to34,Aged35to44,Aged45to54,Aged55to64,Aged65up,Median_Age,FID&outSR=4326&f=json";

function fetchGeoHiveDataSet() {
  $.when($.getJSON(countryWideURL)).then(               //Retrive JSOn Parsed Data from countryWideURL
    function (response) {
      var irelandData = response;                       // set irelandData to store API response
      //console.dir(irelandData);
      $("#ireland-data").html(parseIrelandData(irelandData));       // placeholder for calling parseIrelandData function pa =ssing ing irelandData response
    },
    function (errorResponse) {                          // 2nd argument of $.when()$.then() promise for Error Responses
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

function parseTableHeaders(obj) {
  // Deserialise Table Header Get Operation
  var tableHeaders = [];

  Object.entries(obj).forEach(function (entry) {
    // Object Entries used with forEach () Method to iterate through fields object
    console.log("Table Header Calls SuccessFull");
    tableHeaders.push(entry[1].name); // Push field name into table cell.
  });
  //console.log(tableHeaders)
  return tableHeaders; // Return header table cell to table row.
}

function parseIrelandData(irelandData) {
  //console.dir(irelandData); // Console dir show tree to include features and fields objects for data content & headers respectively

  headerData = irelandData.fields; // Header fields array.
  var tableHeaders = parseTableHeaders(headerData);

  contentData = irelandData.features; // DataContent features array.
  var tableRows = [];

  contentData.forEach(function (featuresItem) {
    featuresItem = featuresItem.attributes;
    var dataRow = [];
    Object.values(featuresItem).forEach(function (value) {
      // iterate through array and retieve content data
      console.log("Table Rows Call SuccessFull");
      //console.log(value)
      dataRow.push(value); // push the retrieved value into the table cell
      //console.log(dataRow);
    });
    tableRows.push(dataRow); // push the table cell into a data row.
    //console.log(tableRows)
  });
  
  // Create single Array concatenating header & row data to be used in pie charts and headline details
  var irelandDataToArray = tableRows;    
  irelandDataToArray.unshift(tableHeaders);
  //console.log(irelandDataToArray);
  parseIrlHeadlineData(irelandDataToArray);
  return irelandDataToArray;

 
}

function parseIrlHeadlineData(obj) {

    console.log("parseIrlHeadlineData function initiated")

    var headlineData = [];
    headlineData.push(obj[obj.length-1][2]);
    headlineData.push(obj[obj.length-1][4]);

    $("#headline-data").html(`
        <p>Total Confirmed Covid Cases: ${headlineData[0]}</p>
        <p>Total Covid Deaths: ${headlineData[1]}</p>`
        );

 console.log(headlineData);
}
