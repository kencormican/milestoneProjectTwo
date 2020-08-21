/*----------------------------------------------------------------------------------------------------------------------------------------*/
// Collapse Navbar on click function.


$('.navbar-nav>li>a').on('click', function () {
    $('.navbar-collapse').collapse('hide');
});

/*----------------------------------------------------------------------------------------------------------------------------------------*/
// IntroJS function

function startIntro() {
    var intro = introJs();
    intro.setOptions({
        steps: [
            {
                intro: `Please follow the below instructions as an aid 
                        to understanding the logic behind the 
                        development process for this website`
            },
            {
                element: '.navbar-brand',
                intro: `This Web Site Has been developed to capture realtime 
                        COVID-19 Statistics from open source repositories and 
                        render the information to the web page in a responsive,
                        intuitive & user friendly manner. `,
                position: 'bottom'
            },
            {
                element: '#headline-data',
                intro: `This provides realtime countrywide headline data  derived from a  geoHive Open Source 
                        API & Data set. The information is retrieved using a jQuery when().then() promise before 
                        being processed into arrays by multiple functions & ulimately rendered to the html using 
                        the parseIrlHeadlineData() function. This Data set is rendered to all window sizes.`,
                position: 'bottom'
            },
            {
                element: '#section-map',
                intro: `This Map renderes the Nationwide COVID statistics 
                        published by the Central Statistics Office on of the 
                        17th of August. 
                        Please Note, A static Data Set was required 
                        in this instance because robust dynamic open source 
                        information is currently unavailable on a county by 
                        county basis.
                        The CSV formatted data is initally retrieved from 
                        a locally stored file using a jQuery when().then()
                        promise, before being parsed into arrays using the
                        processCSVData() fucntion and the jQuery.csv library.  
                        It it ultimately rendered to a geographic Heat Map 
                        using a Google Maps API Call in conjunction with the
                        Geo Chart package/library.
                        
                        This Data set is rendered to all window sizes.`,
                position: 'left'
            },
            {
                element: '#ireland-total-cases-graphed',
                intro: `Multiple API calls were made to render the
                        Daily COVID information to screen.  
                        The same GeoHive API call used to produce the
                        Headline Data is used to retriev this data set. 
                        The resultant object is then passed through
                        multiple functions to produce the required array
                        format before being rendered to the page via the 
                        Google Charts API.
                        Functions used to process the geoHive JSON response
                        into arrays including the parseDailyCasesData(),
                        fetchLocalDate(), parseIrlBarChartData and 
                        setBarChartData() 
                        This Data set is rendered to only medium and large 
                        window sizes.`,
                position: 'left'
            },
            {
                element: '#ireland-total-deaths-graphed',
                intro: `Again multiple API calls were made to render this
                        graph to the web page.  Note the deserialised 
                        fetchLocalDate() is used to alter the JSON response 
                        Unix Timestamp into a usable Date format.
                        This Data set is rendered to only medium and large 
                        window sizes.  `,
                position: 'bottom'
            },
            {
                element: '#section-county-table',
                intro: `The county tabel data set was dirived from the same 
                        parseCSV process as the heatmap. Instead of using the
                        Google API call, the Google Charts API and Corechart
                        lirary are used to render the responsive rable to the 
                        page.  
                        The intent here is to partially hide the full table 
                        and use a jquery on click function to expose the remainder 
                        of teh data set.
                        This Data set is rendered to only large window sizes. `,
                position: 'bottom'
            },
            {
                element: '.section-heading-pie-charts',
                intro: `Multiple API calls were made to render this infomation to 
                        screen. The dataset is retieved using the geoHive API Call.
                        The objects are processed into array using a similar process
                        to those described early.
                        The array row and columns re then transposed befroe passing
                        them into the google draw functions.
                        The graphs are rendered using the Geo Chart API. Addional
                        Interactivity has been added using the select dropdown menus
                        in conjunction with jQuery.
                        This Data set is rendered to all window sizes. `,
                position: 'bottom'
            },
            {
                element: '#ageOrGenderChart-div',
                intro: `This Graph renders Age & Gender specific Data top screen.
                        Note* media queries altering the wrapper div dimensions
                        had to be used in conjunction with the Geo Charts API 
                        option properties to ensure the pie sharts rendered 
                        correctly diffent breakpoints.
                        This Data set is rendered to all window sizes. At the 
                        medium breakpoint it changes from a 12 unit column
                        to 2x 6 unit colums.`,
                position: 'right'
            },
            {
                element: '#hospitalOrTransmissionChart-div',
                intro: `This Graph renders Hospitalisation & Transmission Type 
                        statistics to the Web page in the form of a Doughnut Chart.
                        Again, thes Data set is rendered to all window sizes but 
                        stacks the graphs below the medium breakpoint.`,
                position: 'left'
            },
            {
                element: '.footer-div>a',
                intro: `This provides a link to the CSO Website providing the 
                        heatmap and county table data set`,
                position: 'top'
            },
        ]
    });

    intro.start();

}
