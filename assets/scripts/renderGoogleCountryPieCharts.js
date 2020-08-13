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


    google.charts.load("current", {
        packages: ["corechart"]             // Load Pie Chart package
    });

 
    google.charts.setOnLoadCallback(drawPieChartAge);
    google.charts.setOnLoadCallback(drawPieChartGender);

    // Declare function to draw Age Pie Chart 

    function drawPieChartAge() {

        var data = google.visualization.arrayToDataTable(pieChartAgeData, true);            // true means no header row

        // Set options for Age Pie Chart.
        var options = {
            title: 'Age Breakdown ',
            pieHole: 0.4,
            //width: 400,
            height: 600
        };

         // Instantiate and draw the chart for Age Pie Chart

        var chart = new google.visualization.PieChart(document.getElementById('ireland-countrywide-chart'));
        chart.draw(data, options);
    }


    // Declare function to draw Pie Chart Gender 

    function drawPieChartGender() {

        var data = google.visualization.arrayToDataTable(pieChartGenderData, true);         // true means no header row

        // Set options for Gender Pie Chart.
        var options = {
            title: 'Gender Breakdown ',
            pieHole: 0.4,
            //width: 400,
            height: 600
        };

   
        // Instantiate and draw the chart for Pie Chart Gender
        var chart = new google.visualization.PieChart(document.getElementById('ireland-county-chart'));
        chart.draw(data, options);
    }


}










