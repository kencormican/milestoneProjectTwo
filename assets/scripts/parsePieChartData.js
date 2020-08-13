/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Parse features Object into array for CountryWide Pie Graphs 

function parsePieChartCountryData(fromParseIrelandData) {

    console.log("parsePieChartCountryData function initiated");

    var tableHeaders = [];                                                          // Array of Table Headers
    var tableRows = [];                                                             // Array of Table Rows
    var pieChartCountryDataToArray = [];                                                   // Concatenated 2D array with header & row data

    // Map fromParseIrelandData object to new object filtering all Age related key:value pairs 
    var pieChartCountryDataObject = fromParseIrelandData.map(function (retrieveObjKeyValuePair) {
        return {
            "Aged1to4": retrieveObjKeyValuePair.attributes.Aged1to4,
            "Aged5to14": retrieveObjKeyValuePair.attributes.Aged5to14,
            "Aged15to24": retrieveObjKeyValuePair.attributes.Aged15to24,
            "Aged25to34": retrieveObjKeyValuePair.attributes.Aged25to34,
            "Aged35to44": retrieveObjKeyValuePair.attributes.Aged35to44,
            "Aged45to54": retrieveObjKeyValuePair.attributes.Aged45to54,
            "Aged55to64": retrieveObjKeyValuePair.attributes.Aged55to64,
            "Aged65up": retrieveObjKeyValuePair.attributes.Aged65up,
            "Male": retrieveObjKeyValuePair.attributes.Male,
            "Female": retrieveObjKeyValuePair.attributes.Female,
            "Unknown": retrieveObjKeyValuePair.attributes.Unknown
        }
    });   

    console.log("This is the parsed pieChartCountryDataObject: ", pieChartCountryDataObject);


    // Extract pieChartCountryDataObject properties to 2D array

    pieChartCountryDataObject.forEach(function (item) {
        tableRows.push([item.Aged1to4,item.Aged5to14, item.Aged15to24,item.Aged25to34,item.Aged35to44, item.Aged45to54,item.Aged55to64, item.Aged65up, item.Male, item.Female, item.Unknown])
    });

    var lastTableRow = [] 
    lastTableRow.push(tableRows[tableRows.length - 1]);                 //Insert last Row of tableRows into lastTableRow array

    console.log*("this is lastTableRow:", lastTableRow)

    tableHeaders = parseTableHeaders(pieChartCountryDataObject[0]);     // Pass 1st Index of pieChartCountryDataObject to parseTableHeaders Function

    var pieChartCountryDataToArray = lastTableRow;                         // Initialise pieChartCountryDataToArray with contents of tableRows array
    pieChartCountryDataToArray.unshift(tableHeaders);                   // Insert tableHeaders array into index 0 of pieChartCountryDataToArray

    //$.makeArray(irelandDataToArray);

    //console.log("This is the parsed totalsCasesObject: ", totalsCasesObject);
    //console.log("This is tableRows inside parseIrelandData(): ", tableRows);
    //console.log("This is tableHeaders inside parseIrelandData(): ", tableHeaders);
    //console.log("This is totalsCasesToArray inside parseTotalsCasesData(): ", totalsCasesToArray);

    return pieChartCountryDataToArray;    

}