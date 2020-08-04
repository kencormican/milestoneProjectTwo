
var xhr = new XMLHttpRequest();				                // New javaScript xhr object instance that faciliates consumption of GeoHive API
var data;

xhr.open("GET", "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,TotalConfirmedCovidCases,TotalCovidDeaths&returnGeometry=false&returnDistinctValues=true&outSR=4326&f=json");		// open connection with URL we want to retrieve from server
xhr.send();					                                // send request


xhr.onreadystatechange = function () {			                    // Event Listener checking for change in internal state of xhr object	
  if (this.readyState == 4 && this.status == 200) {			        // If opereation is complete (4) and has succeeded (200) do the following
    console.log("SUCCESS");
    //console.log(this.responseText);	// modify innerHTML of element with "data" id to responseText
    data = this.responseText; 
    console.log(data);
  }
};


