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

    //console.log("This is the fromParseIrelandData Array inside the parseIrlPieChartData() function: ",fromParseIrelandData)

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

    pieChartAgeData = transpose(fromAgePieChartCases);
    pieChartGenderData = transpose(fromGenderPieChartCases);

    console.log("This is the pieChartAgeData data inside setCountryPieChartData(): ", pieChartAgeData);
    console.log("This is the pieChartGenderData data inside setCountryPieChartData(): ", pieChartGenderData);




    google.charts.load("current", {
        packages: ["corechart"]
        // Load Pie Chart package
    });

    //google.charts.setOnLoadCallback(drawRegionsMap);
    google.charts.setOnLoadCallback(drawPieChartAge);
    google.charts.setOnLoadCallback(drawPieChartGender);



    // Declare function to draw Test Pie Chart Age 

    function drawPieChartAge() {

        var data = google.visualization.arrayToDataTable(pieChartAgeData, true);

        // Set options for Pie Chart Two.
        var options = {
            title: 'Age Breakdown ',
            width: 400,
            height: 300
        };

 
        // Instantiate and draw the chart for Pie Chart Two

        var chart = new google.visualization.PieChart(document.getElementById('ireland-countrywide-chart'));
        chart.draw(data, options);
    }


    // Declare function to draw Test Bar Chart Two 
    // Declare function to draw Test Pie Chart Age 

    function drawPieChartGender() {

        var data = google.visualization.arrayToDataTable(pieChartGenderData, true);

        // Set options for Pie Chart Two.
        var options = {
            title: 'Gender Breakdown ',
            width: 400,
            height: 300
        };

 
        // Instantiate and draw the chart for Pie Chart Gender
        var chart = new google.visualization.PieChart(document.getElementById('ireland-county-chart'));
        chart.draw(data, options);
    }


}










