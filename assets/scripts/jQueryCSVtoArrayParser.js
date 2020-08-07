var varOutside;
function cb(data) {
  varOutside = data;
  //console.log(varOutside);
  //use return_first variable here
  //return varOutside;
}


const csvURL = "assets/dataSet/publicHealthInformation.csv";

$.when($.get(csvURL)
    .then(function (response) {
        //console.log(CSVdata)
        var CSVdata = response;
        //console.log(CSVdata)
        processCSVData(CSVdata)
        //alert( "CSV File was uploaded Successfully" );
    },
    function (errorResponse) {                          // 2nd argument of $.when()$.then() promise for Error Responses
        console.log(errorResponse);
        $("#map").html(
          `<h2>Error: ${errorResponse.responseJSON.message}</h2>`
        );
      }  
    ));

    function processCSVData(obj){
    //console.log(obj)
    data = $.csv.toArrays(obj);
    //callback(data);
    console.log(data)
    cb(data)
 }


 //console.log(varOutside)

 setTimeout(function(){
     console.log(varOutside)
 },1000);

