$(document).ready(fetchGeoHiveDataSet); // On document ready initiate fetchGeoHiveDataSet function

// GeoHive API CountryWide Query URL Filtered for Daily Cases, Deaths, Hospitalised Cases, Gender, Age Range & Transmission Type
// Response to be used for Google HeatMAP, headline info, graphs and pie charts
const countryWideURLFiltered = "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,ConfirmedCovidCases,TotalConfirmedCovidCases,ConfirmedCovidDeaths,TotalCovidDeaths,CovidCasesConfirmed,HospitalisedCovidCases,RequiringICUCovidCases,Male,Female,Unknown,Aged1,Aged1to4,Aged5to14,Aged15to24,Aged25to34,Aged35to44,Aged45to54,Aged55to64,Aged65up,CommunityTransmission,CloseContact,TravelAbroad,FID&outSR=4326&f=json";


// GeoHive API CountryWide Query URL unfiltered - All Fields (No filters)
const countryWideURLNoFilter = "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";

// Single Loader for Google Geochart, Table and Corechart (Bar & PieChart) Packages 

google.charts.load('current', {
    'packages': ["corechart", "table", "geochart"],
    mapsApiKey: Apikey,
});


/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Fetch Country Data and pass response as argument into processing functions.
function fetchGeoHiveDataSet() {

    // Loader Gif for external resources
    $("#headline-data").html(
        `<div id="loader">
                 <img src="assets/images/InternetSlowdownLoader.gif" alt="loading..." />
                 </div>`);   
    $("#ireland-total-cases-graphed").html(
        `<div id="loader">
                 <img src="assets/images/InternetSlowdownLoader.gif" alt="loading..." />
                 </div>`);  
    $("#ageOrGenderChart-div").html(
        `<div id="loader">
                 <img src="assets/images/InternetSlowdownLoader.gif" alt="loading..." />
                 </div>`);  
    $("#hospitalOrTransmissionChart-div").html(
        `<div id="loader">
                 <img src="assets/images/InternetSlowdownLoader.gif" alt="loading..." />
                 </div>`);       

    $.when($.getJSON(countryWideURLFiltered)).then(                         //Retrive JSOn Parsed Data from countryWideURL
            function (response) {
            var irelandDataObject = response;                             // set irelandData to store API response
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

    var featuresData = irelandDataObjFromFetch.features;                            // features Object array.
    var totalsCasesArray = parseTotalsCasesData(featuresData);
    var dailyCasesArray = parseDailyCasesData(featuresData);
    var pieChartCountryArray = parsePieChartCountryData(featuresData);

    parseIrlHeadlineData(totalsCasesArray);                   // Call parseIrlHeadlineData passing in totalsCasesArray  
    parseIrlBarChartData(dailyCasesArray);                   // Call parseIrlBarChartData passing in dailyCasesArray        
    parseIrlPieChartData(pieChartCountryArray);                   // Call parseIrlBarChartData passing in dailyCasesArray       

}


/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Dynamic Header processing function to return header details to respective calling functions

function parseTableHeaders(obj) {

    var tableHeaders = [];
    //iterate over each obj, retrieve the key and insert it into a table cell
    Object.keys(obj).forEach(function (key) {
        tableHeaders.push(key);                              // Push keys into tableHeaders array
    });
    return tableHeaders; 
}





/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Parse fetaures Object into array for Headline Data

function parseTotalsCasesData(fromParseIrelandData) {

    var tableHeaders = [];                                                          // Array of Table Headers
    var tableRows = [];                                                             // Array of Table Rows
    var totalsCasesToArray = [];                                                    // Concatenated 2D array with header & row data

    // Map fromParseIrelandData object to new object filtering Date, Cases & Deaths key:value pairs 
    var totalsCasesObject = fromParseIrelandData.map(function (retrieveObjKeyValuePair) {
        return {
            "Date": retrieveObjKeyValuePair.attributes.Date,
            "TotalConfirmedCovidCases": retrieveObjKeyValuePair.attributes.TotalConfirmedCovidCases,
            "TotalCovidDeaths": retrieveObjKeyValuePair.attributes.TotalCovidDeaths,
        };
    }); 

    // Extract totalsCasesObject properties to 2D array

    totalsCasesObject.forEach(function (item) {
        tableRows.push([item.Date, item.TotalConfirmedCovidCases, item.TotalCovidDeaths]);
    });

    tableHeaders = parseTableHeaders(totalsCasesObject[0]);     // Pass 1st Index of totalsCasesObject to parseTableHeaders Function

    var totalsCasesToArray = tableRows;                         // Initialise totalsCasesToArray with contents of tableRows array
    totalsCasesToArray.unshift(tableHeaders);                   // Insert tableHeaders array into index 0 of totalsCasesToArray

    return totalsCasesToArray;
    

}

/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Parse fetaures Object into array for Daily Graphs 

function parseDailyCasesData(fromParseIrelandData) {

    var tableHeaders = [];                                                          // Array of Table Headers
    var tableRows = [];                                                             // Array of Table Rows
    var dailyCasesToArray = [];                                                    // Concatenated 2D array with header & row data

    // Map fromParseIrelandData object to new object filtering Date, Daily Cases & Daily Deaths key:value pairs 
    var dailyCasesObject = fromParseIrelandData.map(function (retrieveObjKeyValuePair) {
        return {
            "Date": retrieveObjKeyValuePair.attributes.Date,
            "ConfirmedCovidCases": retrieveObjKeyValuePair.attributes.ConfirmedCovidCases,
            "ConfirmedCovidDeaths": retrieveObjKeyValuePair.attributes.ConfirmedCovidDeaths
        };
    });   

    // Extract totalsCasesObject properties to 2D array

    dailyCasesObject.forEach(function (item) {
        tableRows.push([item.Date,item.ConfirmedCovidCases, item.ConfirmedCovidDeaths]);
    });

    tableHeaders = parseTableHeaders(dailyCasesObject[0]);     // Pass 1st Index of totalsCasesObject to parseTableHeaders Function

    var dailyCasesToArray = tableRows;                         // Initialise totalsCasesToArray with contents of tableRows array
    dailyCasesToArray.unshift(tableHeaders);                   // Insert tableHeaders array into index 0 of totalsCasesToArray

    return dailyCasesToArray;  

}




/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Headline Data Collector

/*This provides realtime countrywide headline data  derived from a  geoHive Open Source API & Data set. 
The information is retrieved using a jQuery when().then() promise before being processed into arrays by multiple 
functions & ulimately rendered to the html using the parseIrlHeadlineData() function. 
This Data set is rendered to all window sizes.`*/

function parseIrlHeadlineData(fromParseIrelandData) {

    var headlineData = [];
    headlineData.push(fromParseIrelandData[fromParseIrelandData.length - 1][1]);    //Insert 2nd Index of last array 
    headlineData.push(fromParseIrelandData[fromParseIrelandData.length - 1][2]);    //Insert 3rd Index of last array 

    $("#headline-data").html(`
        <h2>Total Confirmed Covid Cases: ${headlineData[0]}</h2>
        <h2>Total Covid Deaths: ${headlineData[1]}</h2>`
    );
    
}


