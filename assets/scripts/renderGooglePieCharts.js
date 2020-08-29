/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Transpose function to alter array for Google Pie chart loader constraints

function transpose(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    let grid = [];
    for (let col = 0; col < cols; col++) {
        grid[col] = [];
    }
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            grid[col][row] = matrix[row][col];
        }
    }
    return grid;
}


/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Pie Chart Country Data Collector

function parseIrlPieChartData(fromParseIrelandData) {

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

    setCountryPieChartData(irlAgePieChartData, irlGenderPieChartData, irlHospitalPieChartData, irlTransmissionPieChartData);
}


function setCountryPieChartData(fromAgePieChartCases, fromGenderPieChartCases,
    fromHospitalPieChartCases, fromTransmissionPieChartCases) {

    /*  Multiple API calls were made to render this infomation to screen. The dataset is retieved using the geoHive API Call.
        The objects are processed into array using a similar process to those described early.
        The array row and columns re then transposed befroe passing them into the google draw functions.
        The graphs are rendered using the Geo Chart API. Addional Interactivity has been added using the select dropdown menus
        in conjunction with jQuery.
        This Data set is rendered to all window sizes.*/

    pieChartAgeData = transpose(fromAgePieChartCases);                          // Call Transpose function passing in fromAgePieChartCases
    pieChartGenderData = transpose(fromGenderPieChartCases);                    // Call Transpose function passing in fromGenderPieChartCases
    pieChartHospitalData = transpose(fromHospitalPieChartCases);                // Call Transpose function passing in fromHospitalPieChartCases
    pieChartTransmissionData = transpose(fromTransmissionPieChartCases);        // Call Transpose function passing in fromTransmissionPieChartCases

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
        var value = this.options[this.selectedIndex].value; //note was .value
        drawChartAgeOrGender(value, pieChartAgeData, pieChartGenderData);
    }

    // Define getHospitalTransmissionSelection() function
    function getHospitalTransmissionSelection() {
        var value = this.options[this.selectedIndex].value; //note was .value
        drawHospitalOrTransmission(value, pieChartHospitalData, pieChartTransmissionData);
    }
}


function drawChartAgeOrGender(value, pieChartAgeData, pieChartGenderData) {
    var selValue = value;
    google.charts.setOnLoadCallback(drawChart);

    /*   These Graphs renders Age, Gender & Hospitalisation Data to the screen.
         Note* media queries altering the wrapper div dimensions had to be used in conjunction with the Geo Charts API 
         option properties to ensure the pie charts rendered correctly at different breakpoints.
         This Data set is rendered to all window sizes. At the  medium breakpoint it changes from a 12 unit column
         to 2x 6 unit colums.*/

    function drawChart(data, options) {
        var dataAgeInDraw = google.visualization.arrayToDataTable(pieChartAgeData, true);
        var dataGenderInDraw = google.visualization.arrayToDataTable(pieChartGenderData, true);
        var optionsAgeInDraw = {
            title: 'Age Breakdown ',
            pieHole: 0.4,
            chartArea: {
                width: '100%',
                height: '80%',
                top: '10px'
            },
            legend: {
                position: 'left',
                alignment: 'center',
                maxLines: 6
            }
        };
        var optionsGenderInDraw = {
            title: 'Gender Breakdown ',
            pieHole: 0.4,
            chartArea: {
                width: '100%',
                height: '80%',
                top: '10px'
            },
            legend: {
                position: 'left',
                alignment: 'center',
                maxLines: 6
            }
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

    }

}



function drawHospitalOrTransmission(value, pieChartHospitalData, pieChartTransmissionData) {

    var selValue = value;
    google.charts.setOnLoadCallback(drawChart);

    function drawChart(data, options) {
        var dataHospitalInDraw = google.visualization.arrayToDataTable(pieChartHospitalData, true);
        var dataTransmissionInDraw = google.visualization.arrayToDataTable(pieChartTransmissionData, true);
        var optionsHospitalInDraw = {
            title: 'Hospital Breakdown ',
            pieHole: 0.4,
            chartArea: {
                width: '100%',
                height: '80%',
                top: '10px'
            },
            legend: {
                position: 'left',
                alignment: 'center',
                maxLines: 6
            }
        };
        var optionsTransmissionInDraw = {
            title: 'Transmission Breakdown ',
            pieHole: 0.4,
            chartArea: {
                width: '100%',
                height: '80%',
                top: '10px'
            },
            legend: {
                position: 'left',
                alignment: 'center',
                maxLines: 6
            }

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

    }

}

