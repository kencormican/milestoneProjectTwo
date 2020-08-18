$(document).ready(fetchGeoHiveDataSet); // On document ready initiate fetchGeoHiveDataSet function

// API CountryWide Query URL Filtered for Daily Cases, Deaths, Hospitaluised Cases, Gender & Age Range
// Response to be used for Google HeatMAP, headline info, graphs and pie charts
const countryWideURL = "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,ConfirmedCovidCases,TotalConfirmedCovidCases,ConfirmedCovidDeaths,TotalCovidDeaths,CovidCasesConfirmed,HospitalisedCovidCases,RequiringICUCovidCases,Male,Female,Unknown,Aged1,Aged1to4,Aged5to14,Aged15to24,Aged25to34,Aged35to44,Aged45to54,Aged55to64,Aged65up,CommunityTransmission,CloseContact,TravelAbroad,FID&outSR=4326&f=json";

/*
All
"https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";

/*
    "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,ConfirmedCovidCases,TotalConfirmedCovidCases,ConfirmedCovidDeaths,TotalCovidDeaths,CovidCasesConfirmed,HospitalisedCovidCases,RequiringICUCovidCases,Male,Female,Unknown,Aged1,Aged1to4,Aged5to14,Aged15to24,Aged25to34,Aged35to44,Aged45to54,Aged55to64,Aged65up,Median_Age,FID&outSR=4326&f=json";

*/


/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Fetch Country Data and pass response as argument into processing functions.
function fetchGeoHiveDataSet() {

    console.log("fetchGeoHiveDataSet function initiated");

    $.when($.getJSON(countryWideURL)).then(                         //Retrive JSOn Parsed Data from countryWideURL
        function (response) {
            var irelandDataObject = response;                             // set irelandData to store API response
            //console.log(irelandDataObject);
            console.dir(irelandDataObject);
            $("#ireland-data").html(parseIrelandData(irelandDataObject)); // placeholder for calling parseIrelandData function passing ing irelandData response
        },
        function (errorResponse) {                                  // 2nd argument of $.when()$.then() promise for Error Responses
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

/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Parse Ireland Object Data into Subarrays for further Processing

function parseIrelandData(irelandDataObjFromFetch) {

    console.log("parseIrelandData function initiated");
    // console.dir(irelandDataObjFromFetch);
    // console dir shows tree to include features and fields objects for data content & headers respectively

    featuresData = irelandDataObjFromFetch.features;                            // features Object array.
    
    //console.log("This is the featuresData Object inside the parseIrelandData() function: ", featuresData);

    var totalsCasesArray = parseTotalsCasesData(featuresData);
    var dailyCasesArray = parseDailyCasesData(featuresData);
    var pieChartCountryArray = parsePieChartCountryData(featuresData);

    parseIrlHeadlineData(totalsCasesArray);                   // Call parseIrlHeadlineData passing in totalsCasesArray  
    parseIrlBarChartData(dailyCasesArray);                   // Call parseIrlBarChartData passing in dailyCasesArray        
    parseIrlPieChartData(pieChartCountryArray);                   // Call parseIrlBarChartData passing in dailyCasesArray       
    console.log("This is the pieChartCountryArray inside the parseIrelandData() function: ", pieChartCountryArray);

}


/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Dynamic Header processing function to return header details to respective calling functions

function parseTableHeaders(obj) {

    console.log("parseTableHeaders function initiated");

    var tableHeaders = [];
    //iterate over each obj, retrieve the key and insert it into a table cell
    Object.keys(obj).forEach(function (key) {
        tableHeaders.push(key)                              // Push keys into tableHeaders array
    });
    //console.log("This is tableHeaders inside parseTableHeaders: ", tableHeaders)
    return tableHeaders; 
}





/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Parse fetaures Object into array for Headline Data

function parseTotalsCasesData(fromParseIrelandData) {

    console.log("parseTotalsCasesData function initiated");

    var tableHeaders = [];                                                          // Array of Table Headers
    var tableRows = [];                                                             // Array of Table Rows
    var totalsCasesToArray = [];                                                    // Concatenated 2D array with header & row data

    // Map fromParseIrelandData object to new object filtering Date, Cases & Deaths key:value pairs 
    var totalsCasesObject = fromParseIrelandData.map(function (retrieveObjKeyValuePair) {
        return {
            "Date": retrieveObjKeyValuePair.attributes.Date,
            "TotalConfirmedCovidCases": retrieveObjKeyValuePair.attributes.TotalConfirmedCovidCases,
            "TotalCovidDeaths": retrieveObjKeyValuePair.attributes.TotalCovidDeaths,
        }
    }); 

    // Extract totalsCasesObject properties to 2D array

    totalsCasesObject.forEach(function (item) {
        tableRows.push([item.Date, item.TotalConfirmedCovidCases, item.TotalCovidDeaths])
    });

    tableHeaders = parseTableHeaders(totalsCasesObject[0]);     // Pass 1st Index of totalsCasesObject to parseTableHeaders Function

    var totalsCasesToArray = tableRows;                         // Initialise totalsCasesToArray with contents of tableRows array
    totalsCasesToArray.unshift(tableHeaders);                   // Insert tableHeaders array into index 0 of totalsCasesToArray

    //$.makeArray(irelandDataToArray);

    //console.log("This is the parsed totalsCasesObject: ", totalsCasesObject);
    //console.log("This is tableRows inside parseIrelandData(): ", tableRows);
    //console.log("This is tableHeaders inside parseIrelandData(): ", tableHeaders);
    //console.log("This is totalsCasesToArray inside parseTotalsCasesData(): ", totalsCasesToArray);

    return totalsCasesToArray;
    

}






/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Parse fetaures Object into array for Daily Graphs 

function parseDailyCasesData(fromParseIrelandData) {

    console.log("parseDailyCasesData function initiated");

    var tableHeaders = [];                                                          // Array of Table Headers
    var tableRows = [];                                                             // Array of Table Rows
    var dailyCasesToArray = [];                                                    // Concatenated 2D array with header & row data

    // Map fromParseIrelandData object to new object filtering Date, Daily Cases & Daily Deaths key:value pairs 
    var dailyCasesObject = fromParseIrelandData.map(function (retrieveObjKeyValuePair) {
        return {
            "Date": retrieveObjKeyValuePair.attributes.Date,
            "ConfirmedCovidCases": retrieveObjKeyValuePair.attributes.ConfirmedCovidCases,
            "ConfirmedCovidDeaths": retrieveObjKeyValuePair.attributes.ConfirmedCovidDeaths
        }
    });   

    // Extract totalsCasesObject properties to 2D array

    dailyCasesObject.forEach(function (item) {
        tableRows.push([item.Date,item.ConfirmedCovidCases, item.ConfirmedCovidDeaths])
    });

    tableHeaders = parseTableHeaders(dailyCasesObject[0]);     // Pass 1st Index of totalsCasesObject to parseTableHeaders Function

    var dailyCasesToArray = tableRows;                         // Initialise totalsCasesToArray with contents of tableRows array
    dailyCasesToArray.unshift(tableHeaders);                   // Insert tableHeaders array into index 0 of totalsCasesToArray

    //$.makeArray(irelandDataToArray);

    //console.log("This is the parsed totalsCasesObject: ", totalsCasesObject);
    //console.log("This is tableRows inside parseIrelandData(): ", tableRows);
    //console.log("This is tableHeaders inside parseIrelandData(): ", tableHeaders);
    //console.log("This is totalsCasesToArray inside parseTotalsCasesData(): ", totalsCasesToArray);

    return dailyCasesToArray;
    

}




/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Headline Data Collector

function parseIrlHeadlineData(fromParseIrelandData) {

    console.log("parseIrlHeadlineData function initiated")

    //console.log("This is the fromParseIrelandData Array inside the parseIrlHeadlineData() function: ",fromParseIrelandData)

    var headlineData = [];
    headlineData.push(fromParseIrelandData[fromParseIrelandData.length - 1][1]);    //Insert 2nd Index of last array 
    headlineData.push(fromParseIrelandData[fromParseIrelandData.length - 1][2]);    //Insert 3rd Index of last array 

    $("#headline-data").html(`
        <h2>Total Confirmed Covid Cases: ${headlineData[0]}</h2>
        <h2>Total Covid Deaths: ${headlineData[1]}</h2>`
    );

    //console.log("This is the headlineData Array inside the parseIrlHeadlineData() function: ", headlineData);
}


