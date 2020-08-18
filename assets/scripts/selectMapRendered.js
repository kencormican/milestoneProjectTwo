/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Interactive Table Function animates table height on button click

  $(".table-slider-button").click(function () {

     if ($(".county-table-row").css("height") === "290px") {
          $(".county-table-row").animate({ height: "+=400" }, 1000)
          $(".table-slider").fadeTo(1000,0);
     }
      if ($(".county-table-row").css("height") != "290px") {
          $(".county-table-row").animate({ height: "290px" }, 1000);
          $(".table-slider").fadeTo(1000,0.9);
     }
    
  });





/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Transpose function to alter array for Google Pie chart loader constraints

function transpose(matrix) {
  const rows = matrix.length
  const cols = matrix[0].length

  let grid = []
  for (let col = 0; col < cols; col++) {
    grid[col] = []
  }
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      grid[col][row] = matrix[row][col]
    }
  }
  return grid
}


/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Pie Chart Country Data Collector

function parseIrlPieChartData(fromParseIrelandData) {

    console.log("parseIrlPieChartData function initiated")

    var irlAgePieChartData = fromParseIrelandData.map(function (item) {
        return (item.slice(0, 8));                                          // only retain upto item index 8 in subarray...(so indexes 0 to 7)
    });

    var irlGenderPieChartData = fromParseIrelandData.map(function (item) {
        return (item.slice(8, 11));                                         // retains indexes 8,9 & 10)
    });

    console.log("This is the irlAgePieChartData Array inside the parseIrlPieChartData() function: ", irlAgePieChartData);
    console.log("This is the irlGenderPieChartData Array inside the irlGenderPieChartData() function: ", irlGenderPieChartData);

    setCountryPieChartData(irlAgePieChartData, irlGenderPieChartData);
}



function setCountryPieChartData(fromAgePieChartCases, fromGenderPieChartCases) {

    pieChartAgeData = transpose(fromAgePieChartCases);                          // Call Transpose function passing in fromAgePieChartCases
    pieChartGenderData = transpose(fromGenderPieChartCases);                    // Call Transpose function passing in fromGenderPieChartCases

    console.log("This is the pieChartAgeData data inside setCountryPieChartData(): ", pieChartAgeData);
    console.log("This is the pieChartGenderData data inside setCountryPieChartData(): ", pieChartGenderData);

    var test2 = [["Aged1to4", 157],
    ["Aged5to14", 419],
    ["Aged15to24", 2186],
    ["Aged25to34", 4661],
    ["Aged35to44", 4753],
    ["Aged45to54", 4791],
    ["Aged55to64", 3356],
    ["Aged65up", 6567],
    ["Aged65up", 6567]];

    var test3 = [["Male", 11823],
    ["Female", 15340],
    ["Unknown", 28]];


    console.log("this is test2", test2)
    console.log("this is test3", test3)

    //testSelect(test3);

// Render Initial Graph with Age Data
changeChartAgeorGender("Age", test2, test3);
    
document.getElementById('ageOrGenderSelect').addEventListener('change', getSelection, false);


function getSelection() {
    console.log("Hello this is getSelection")
    var value = this.options[this.selectedIndex].text; //note was .value
    changeChartAgeorGender(value, test2, test3);
}


}




function changeChartAgeorGender(value, pieChartAgeData,pieChartGenderData) {

        console.log("This is the pieChartAgeData data inside changeChartAgeorGender(): ", pieChartAgeData);
        console.log("This is the pieChartGenderData data inside changeChartAgeorGender(): ", pieChartGenderData);

        /*var listbox = document.getElementById("ageOrGenderSelect");
        var selIndex = listbox.selectedIndex;
        var selValue = listbox.options[selIndex].value;
        var selText = listbox.options[selIndex].text;*/
        var selValue = value;
        console.log(selValue);

        google.charts.load("current", {
            packages: ["corechart"]             // Load Pie Chart package
            });

        google.charts.setOnLoadCallback(drawChart);

        function drawChart(data, options) {
            var dataAgeInDraw = google.visualization.arrayToDataTable(pieChartAgeData, true);
            var dataGenderInDraw = google.visualization.arrayToDataTable(pieChartGenderData, true);   
            var optionsAgeInDraw = {
                title: 'Age Breakdown ',
                pieHole: 0.4,
                //width: 'auto', 
                height: 400,
                //animation:{"startup": true}
                
            };
            var optionsGenderInDraw = {
                title: 'Gender Breakdown ',
                pieHole: 0.4,
                //width: 'auto', 
                height: 400,
                //animation:{ "startup": true}
                
            };

            

            // set Gender or Age Chart redering options before chart draw

            if (selValue == 'Age') {
                data = dataAgeInDraw;
                options = optionsAgeInDraw;                
            }
            else if (selValue == 'Gender') {
                data = dataGenderInDraw;
                options = optionsGenderInDraw;                
            }

            var chart = new google.visualization.PieChart(document.getElementById('ageOrGenderChart-div'));

            chart.draw(data, options);

        };

    }


