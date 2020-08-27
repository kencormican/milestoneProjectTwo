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
                        to understanding how to navigate this website`
            },
            {
                element: '.navbar-brand',
                intro: `This Web Site attempts to provide end users with 
                        nationwide, realtime COVID-19 Statistics in a responsive, 
                        intuitive & user friendly manner. `,
                position: 'bottom'
            },
            {
                element: '.navbar-toggler-icon',
                intro: `Please use this menu to navigation directly to your 
                        prefered suite of information. You May select from 
                        Headline Data, a Geographic Heat Map, A daily timeline
                        for covid cases or deaths, a table providing total cases, 
                        total deaths and median age data for each county. You 
                        may also view the Nationwide data broken down as pie 
                        charts by Age, Gender, Number of Hospitalisations or 
                        transmission type.`,
                position: 'right'
            },
            {
                element: '#headline-data',
                intro: `This provides the current Headline figures relating to the 
                        Total Number of Covid Cases and COVID Deaths`,
                position: 'bottom-right-aligned'
            },
            {
                element: '#map',
                intro: `This Geographic Heat Map highlights the Nationwide COVID 
                        statistics by county. To view the total number of covid 
                        cases for a given county hover over your county of choice `,
                position: 'bottom-middle-aligned'
            },
            {
                element: '#ireland-total-cases-graphed',
                intro: `This Bar Chart provides a timeline of the daily number of
                        COVID cases. To view the statistics for a given day hover 
                        over the column associated with your date of choice`,
                        position: 'auto'
            },
                        {
                element: '#ireland-total-deaths-graphed',
                intro: `This Bar Chart provides a timeline of the daily number of
                        COVID deaths. To view the statistics for a given day hover 
                        over the column associated with your date of choice`,
                        position: 'auto'
            },
            {
                element: '.county-table-row',
                intro: `This Table provides the total cases, total deaths and median 
                        age data for each county. It is currently partially hidden. 
                        To view statistics for all 26 Counties in the ROI click the 
                        Show More button `,
                position: 'auto'
            },
                        {
                element: '.section-heading-pie-charts',
                intro: `This section provides Nationwide data broken down as pie 
                        charts by Age, Gender, Number of Hospitalisations or 
                        transmission type. To view your suite of choice use the 
                        below dropdown menus`,
                position: 'bottom'
            },
            {
                element: '#ageOrGenderChart-div',
                intro: `This Pie Chart provides Nationwide COVID statistics by 
                        Age or Gender.  The default display is Age. To view 
                        the breakdown of covid statistics by Gender select
                        gender from the dropdown menu`,
                position: 'right'
            },
            {
                element: '#hospitalOrTransmissionChart-div',
                intro: `This Pie Chart provides Hospitalisation & Transmission Type 
                        statistics. The default display provides the ration of 
                        Hospitalisation to ICU addmissions. To view the breakdown 
                        by transmission type select transmission rate from the 
                        dropdown menu`,
                position: 'left'
            },
            {
                element: '.footer-div>a',
                intro: `This provides a link to the CSO Website`,
                position: 'top'
            },      

        ]
    });

    intro.setOption('positionPrecedence', ['top', 'bottom', 'left', 'right'])

    intro.start();

}
