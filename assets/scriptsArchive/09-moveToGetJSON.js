$(document).ready(function(){
    const countryWideURL =
    "https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIrelandOpenData/FeatureServer/0/query?where=1%3D1&outFields=Date,ConfirmedCovidCases,TotalConfirmedCovidCases,ConfirmedCovidDeaths,TotalCovidDeaths,CovidCasesConfirmed,HospitalisedCovidCases,RequiringICUCovidCases,Male,Female,Unknown,Aged1,Aged1to4,Aged5to14,Aged15to24,Aged25to34,Aged35to44,Aged45to54,Aged55to64,Aged65up,Median_Age,FID&outSR=4326&f=json";


    $.when(
        $.getJSON(countryWideURL)
    ).then(
        function(response) {
            var countryWideData = response;
            console.log(countryWideData);
            $("#data").html(`${countryWideData}`);
        },
        function(errorResponse) {
            if (errorResponse.status === 404) {
                $("#data").html(
                    `<h2>The Service is currently unavailable</h2>`);
            } else {
                console.log(errorResponse);
                $("#data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
            }
        });




})

