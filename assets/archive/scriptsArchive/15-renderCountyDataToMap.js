$(document).ready(fetchCSVData);                // On document ready run fetchCSVData to intiate ajax get request and retrieve the CSV File

function fetchCSVData() {                                           // retrieve CSV file using jQuey .ajax(GET) method 
    $.ajax({
        type: "GET",
        url: "/assets/dataSet/publicHealthInformation.csv",
        dataType: "text",
        success: function (response) {                              // On successful response initiate function pssing in response as argument
            var rawCSVdata = response;                              // Store response in rawCSVdata variable
            //processCSVData(rawCSVdata);                           // Call processCSVData function and pass ajax response as argument. 
            var parsedCountyDataArray = processCSVData(rawCSVdata); // store output of processCSVData in parsedCountyDataArray variable
            //console.log(parsedCountyDataArray);
        }        
    });    
};

function processCSVData(csvText) {                          // Parses CSV data into county data array
    var allTextLines = csvText.split(/\r\n|\n/);            // Creates 2D array with innner array as single string of text
    var headers = allTextLines[0].split(',');               // Creaters header array by splitting first index of allTextLines Array
    //allTextLines.pop();
    var parsedCountyDataArray = [];                         // Array to store parsed County Data set

    for (var i = 0; i < allTextLines.length; i++) {
        var rowData = allTextLines[i].split(',');           // Split string into rowData Array

        if (rowData.length == headers.length) {             // Iterated trough each row up to end of row and push into dataRows Array
            var dataRows = [];
            for (var j = 0; j < headers.length; j++) {

                if (i > 0 && j > 0) {                       // if row & column number are greater than 0 header and name fields isolated from parseInt()
                    rowData[j] = parseInt(rowData[j]);      // convert number fields in array from string to numbers type
                }
                dataRows.push(rowData[j]);
            }
            parsedCountyDataArray.push(dataRows);            // Push parsed dataRows into parsedCountyDataArray
        }
    }

     parseCountyArrayForMap(parsedCountyDataArray);

    return parsedCountyDataArray;                           // Return array as output from function
}


function parseCountyArrayForMap(obj) {                       // Create create three column array for Geo Map

    obj = obj.map(function (item) {
        return item.splice(0, 3);                           // only retain upto item index 2 (3rd item in subarray)
    });

    console.log(obj)

}

