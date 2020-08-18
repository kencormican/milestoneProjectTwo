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

    var irlHospitalPieChartData = fromParseIrelandData.map(function (item) {
        return (item.slice(11, 13));                                         // retains indexes 11 & 12)
    });

    var irlTransmissionPieChartData = fromParseIrelandData.map(function (item) {
        return (item.slice(13, 16));                                         // retains indexes 13,14 & 15)
    });


    console.log("This is the irlAgePieChartData Array inside the parseIrlPieChartData() function: ", irlAgePieChartData);
    console.log("This is the irlGenderPieChartData Array inside the irlGenderPieChartData() function: ", irlGenderPieChartData);
    console.log("This is the irlHospitalPieChartData Array inside the irlGenderPieChartData() function: ", irlHospitalPieChartData);
    console.log("This is the irlTransmissionPieChartData Array inside the irlGenderPieChartData() function: ", irlTransmissionPieChartData);

    setCountryPieChartData(irlAgePieChartData, irlGenderPieChartData, irlHospitalPieChartData, irlTransmissionPieChartData);
}


function setCountryPieChartData(fromAgePieChartCases, fromGenderPieChartCases,
    fromHospitalPieChartCases, fromTransmissionPieChartCases) {

    pieChartAgeData = transpose(fromAgePieChartCases);                          // Call Transpose function passing in fromAgePieChartCases
    pieChartGenderData = transpose(fromGenderPieChartCases);                    // Call Transpose function passing in fromGenderPieChartCases
    pieChartHospitalData = transpose(fromHospitalPieChartCases);                // Call Transpose function passing in fromHospitalPieChartCases
    pieChartTransmissionData = transpose(fromTransmissionPieChartCases);        // Call Transpose function passing in fromTransmissionPieChartCases

    console.log("This is the pieChartAgeData data inside setCountryPieChartData(): ", pieChartAgeData);
    console.log("This is the pieChartGenderData data inside setCountryPieChartData(): ", pieChartGenderData);
    console.log("This is the pieChartHospitalData data inside setCountryPieChartData(): ", pieChartHospitalData);
    console.log("This is the pieChartTransmissionData data inside setCountryPieChartData(): ", pieChartTransmissionData);

    // Render default Age/Gender Graph with Age Data
    drawChartAgeOrGender("ageChart", pieChartAgeData, pieChartGenderData);

    // Render default Hospital/Transmission Graph with Hospital Data
    drawHospitalOrTransmission("hospitalChart", pieChartHospitalData, pieChartTransmissionData);

    // Event Listener for Age/Gender DropDown
    document.getElementById('ageOrGenderSelect').addEventListener('change', getAgeGenderSelection, false);

    // Event Listener for Hospital/Transmission DropDown
    document.getElementById('hospitalOrTransmissionSelect').addEventListener('change', getHospitalTransmissionSelection, false);

    // Define getAgeGenderSelection() function
    function getAgeGenderSelection() {
        console.log("getAgeGenderSelection function initiated")
        var value = this.options[this.selectedIndex].value; //note was .value
        drawChartAgeOrGender(value, pieChartAgeData, pieChartGenderData);
    }

    // Define getHospitalTransmissionSelection() function
    function getHospitalTransmissionSelection() {
        console.log("getHospitalTransmissionSelection function initiated")
        var value = this.options[this.selectedIndex].value; //note was .value
        drawHospitalOrTransmission(value, pieChartHospitalData, pieChartTransmissionData);
    }
}

google.charts.load("current", {
    packages: ["corechart"]             // Load Pie Chart package
});


function drawChartAgeOrGender(value, pieChartAgeData, pieChartGenderData) {

    console.log("This is the pieChartAgeData data inside drawChartAgeOrGender(): ", pieChartAgeData);
    console.log("This is the pieChartGenderData data inside drawChartAgeOrGender(): ", pieChartGenderData);
    var selValue = value;
    console.log(selValue);


    google.charts.setOnLoadCallback(drawChart);

    function drawChart(data, options) {
        var dataAgeInDraw = google.visualization.arrayToDataTable(pieChartAgeData, true);
        var dataGenderInDraw = google.visualization.arrayToDataTable(pieChartGenderData, true);
        var optionsAgeInDraw = {
            title: 'Age Breakdown ',
            pieHole: 0.4,
            height: 400,
        };
        var optionsGenderInDraw = {
            title: 'Gender Breakdown ',
            pieHole: 0.4,
            height: 400,
        };

        // set Gender or Age Chart rendering options before chart draw

        if (selValue == 'ageChart') {
            data = dataAgeInDraw;
            options = optionsAgeInDraw;
        }
        else if (selValue == 'genderChart') {
            data = dataGenderInDraw;
            options = optionsGenderInDraw;
        }

        var chart = new google.visualization.PieChart(document.getElementById('ageOrGenderChart-div'));

        chart.draw(data, options);

    };

}



function drawHospitalOrTransmission(value, pieChartHospitalData, pieChartTransmissionData) {

    console.log("This is the pieChartHospitalData data inside drawHospitalOrTransmission(): ", pieChartHospitalData);
    console.log("This is the pieChartTransmissionData data inside drawHospitalOrTransmission(): ", pieChartTransmissionData);
    var selValue = value;
    console.log(selValue);


    google.charts.setOnLoadCallback(drawChart);

    function drawChart(data, options) {
        var dataHospitalInDraw = google.visualization.arrayToDataTable(pieChartHospitalData, true);
        var dataTransmissionInDraw = google.visualization.arrayToDataTable(pieChartTransmissionData, true);
        var optionsHospitalInDraw = {
            title: 'Hospital Breakdown ',
            pieHole: 0.4,
            height: 400,
        };
        var optionsTransmissionInDraw = {
            title: 'Transmission Breakdown ',
            pieHole: 0.4,
            height: 400,
        };

        // set Gender or Age Chart rendering options before chart draw

        if (selValue == 'hospitalChart') {
            data = dataHospitalInDraw;
            options = optionsHospitalInDraw;
        }
        else if (selValue == 'transmissionChart') {
            data = dataTransmissionInDraw;
            options = optionsTransmissionInDraw;
        }

        var chart = new google.visualization.PieChart(document.getElementById('hospitalOrTransmissionChart-div'));

        chart.draw(data, options);

    };

}

