// Static Data Set derived from CSO spreadsheet
const csvURL = "assets/dataSet/publicHealthInformation.csv";

$.when(
  $.get(csvURL).then(
    function (response) {
      var CSVdata = response;
      processCSVData(CSVdata);
    },
    function (errorResponse) {
      // 2nd argument of $.when()$.then() promise for Error Responses
      $("#map").html(`<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
    }
  )
);

function processCSVData(fromCSVGet) {
    // Convert csv data to 2D Array
    var csvArrayData = $.csv.toArrays(fromCSVGet);
    
    // Convert number fields in array from string to numbers type

    for (var i = 1; i < csvArrayData.length; i++) {

        for (var j = 1; j < csvArrayData[i].length; j++) {

            csvArrayData[i][j] = parseInt(csvArrayData[i][j]);
        }
        
    }

    var typeFormatedCsvArrayData = csvArrayData;

    // Call parseCountyArrayForMap() and pass in formatted Array Data 

    parseCountyArrayForMap(typeFormatedCsvArrayData);
    setTableChartData(typeFormatedCsvArrayData);
}

