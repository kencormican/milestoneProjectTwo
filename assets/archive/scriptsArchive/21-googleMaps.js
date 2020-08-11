function parseCountyArrayForMap(fromCSVParse) {             // Create create three column array for Geo Map

   
    var fromCSVParse = fromCSVParse.map(function (item) {
        return item.slice(0, 3);                            // only retain upto item index 2 (3rd item in subarray)
    });

    fromCSVParse[4][0] = "IE-CO";                                   
    // This replaces the Cork label with IE-CO to faciliate GeoChart constraint nd render cor data to the map.

                                                            
    var parsedCountyArrayForMap = fromCSVParse;    

    console.log("this is parsedCountyArrayForMap inside parsedCountyArrayForMap() function: ", parsedCountyArrayForMap);

    setMapData(parsedCountyArrayForMap);                    // This passes the parsed array into the Google Charts API Call.
    
}


function setMapData(fromMapArrayParse) {
  
  var mapData = fromMapArrayParse;

  // $.makeArray(mapData);                                          // convert Array object to true array

  // console.log($.isArray(mapData));                                 // Is object a true array

  

  google.charts.load("current", {
    packages: ["corechart" , "geochart"],
    // Note: you will need to get a mapsApiKey for your project.
    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
    mapsApiKey: Apikey,

  });

  google.charts.setOnLoadCallback(drawRegionsMap);
  google.charts.setOnLoadCallback(drawTestBarChartOne);
  google.charts.setOnLoadCallback(drawTestBarChartTwo);
  google.charts.setOnLoadCallback(drawTestPieChartOne);
  google.charts.setOnLoadCallback(drawTestPieChartTwo);


  // Declare GeoChart Function for Country Map

  function drawRegionsMap() {

    console.log("this is mapData inside drawRegionsMap() function: ", mapData);

    var data = google.visualization.arrayToDataTable(mapData, false);     
    /* 
    This passes the chartData Array into API and converts to correct
    format for consumption by the API. false means the array has a header row
    */

    var options = {
      region: "IE",                                                 // This property sets the focus on Ireland
      resolution: "provinces",                                      // This property sets the county boudaries
          colorAxis: {colors: ['red', 'black', '#5b0000']},         // LightRed(#f56967), DarkRed(#5b0000)
          backgroundColor: 'white',
          datalessRegionColor: 'LightGrey',
          defaultColor: '#f5f5f5',
    };

    var chart = new google.visualization.GeoChart(
      document.getElementById("map")
    );

    chart.draw(data, options);
  }




    // Declare function to draw Test Bar Chart One 

    function drawTestBarChartOne() {

      var data = new google.visualization.DataTable();
      data.addColumn('timeofday', 'Time of Day');
      data.addColumn('number', 'Motivation Level');

      data.addRows([
        [{v: [8, 0, 0], f: '8 am'}, 1],
        [{v: [9, 0, 0], f: '9 am'}, 2],
        [{v: [10, 0, 0], f:'10 am'}, 3],
        [{v: [11, 0, 0], f: '11 am'}, 4],
        [{v: [12, 0, 0], f: '12 pm'}, 5],
        [{v: [13, 0, 0], f: '1 pm'}, 6],
        [{v: [14, 0, 0], f: '2 pm'}, 7],
        [{v: [15, 0, 0], f: '3 pm'}, 8],
        [{v: [16, 0, 0], f: '4 pm'}, 9],
        [{v: [17, 0, 0], f: '5 pm'}, 10],
      ]);

      var options = {
        title: 'Total Country Wide Cases over Time',
        hAxis: {
          title: 'Time of Day',
          format: 'h:mm a',
          viewWindow: {
            min: [7, 30, 0],
            max: [17, 30, 0]
          }
        },
        vAxis: {
          title: 'Rating (scale of 1-10)'
        }
      };

      var chart = new google.visualization.ColumnChart(
        document.getElementById('ireland-total-cases-graphed'));

      chart.draw(data, options);
    }


        // Declare function to draw Test Bar Chart Two 

    function drawTestBarChartTwo() {

      var data = new google.visualization.DataTable();
      data.addColumn('timeofday', 'Time of Day');
      data.addColumn('number', 'Motivation Level');

      data.addRows([
        [{v: [8, 0, 0], f: '8 am'}, 1],
        [{v: [9, 0, 0], f: '9 am'}, 2],
        [{v: [10, 0, 0], f:'10 am'}, 3],
        [{v: [11, 0, 0], f: '11 am'}, 4],
        [{v: [12, 0, 0], f: '12 pm'}, 5],
        [{v: [13, 0, 0], f: '1 pm'}, 6],
        [{v: [14, 0, 0], f: '2 pm'}, 7],
        [{v: [15, 0, 0], f: '3 pm'}, 8],
        [{v: [16, 0, 0], f: '4 pm'}, 9],
        [{v: [17, 0, 0], f: '5 pm'}, 10],
      ]);

      var options = {
        title: 'Total Country Wide Deaths over Time',
        hAxis: {
          title: 'Time of Day',
          format: 'h:mm a',
          viewWindow: {
            min: [7, 30, 0],
            max: [17, 30, 0]
          }
        },
        vAxis: {
          title: 'Rating (scale of 1-10)'
        }
      };

      var chart = new google.visualization.ColumnChart(
        document.getElementById('ireland-total-deaths-graphed'));

      chart.draw(data, options);
    }


  
    // Declare function to draw Test Pie Chart One 

    function drawTestPieChartOne() {

        // Create the data table for Pie Chart One.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
            ['Mushrooms', 1],
            ['Onions', 1],
            ['Olives', 2],
            ['Zucchini', 2],
            ['Pepperoni', 1]
        ]);

        // Set options for Pie Chart One.
        var options = {
            title: 'How Much Pizza X Ate Last Night',
            width: 400,
            height: 300
        };

        // Instantiate and draw the chart for Pie Chart One
        var chart = new google.visualization.PieChart(document.getElementById('ireland-countrywide-chart'));
        chart.draw(data, options);
    }

    // Declare function to draw Test Pie Chart Two 

    function drawTestPieChartTwo() {

        // Create the data table for Pie Chart Two.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
            ['Mushrooms', 2],
            ['Onions', 2],
            ['Olives', 2],
            ['Zucchini', 0],
            ['Pepperoni', 3]
        ]);

        // Set options for Pie Chart Two.
        var options = {
            title: 'How Much Pizza Y Ate Last Night',
            width: 400,
            height: 300
        };

        // Instantiate and draw the chart for Pie Chart Two
        var chart = new google.visualization.PieChart(document.getElementById('ireland-county-chart'));
        chart.draw(data, options);
    }



}

