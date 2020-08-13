<img src="https://codeinstitute.s3.amazonaws.com/fullstack/ci_logo_small.png" style="margin: 0;">


--------

# Ken Cormican - Milestone Project Two 

This is my Second Milestone Project for the Code Institute's Diploma in Full Stack Development.

--------

## The Project Brief
--------
The brief was to create an Interactive Web Front End that exposes the learnings from the HTML, CSS, JS, UXD & Interactive Front End Development Modules. 

1. Design, develop and implement a dynamic front-end web application using HTML, CSS and JavaScript
2. Implement front-end interactivity, using core JavaScript, JavaScript libraries and/or Application Programming Interfaces (APIs)
3. Test an interactive front-end web application through the development, implementation and deployment stages
4. Deploy an interactive front-end web application to a Cloud platform
5. Demonstrate and document the development process through a version control system such
--------

### Development Process

* Design a web application following the principles of UX design which meets accessibility guidelines, is easy to navigate and allows the user to find information and resources intuitively
* Design a web application that lets the user initiate and control actions, and gives feedback
* Implement a web application whose purpose is immediately evident to a new user and which provides a good solution to the user’s demands and expectations
* Write code such that users who direct to a non-existent page or resource are redirected back to the main page without having to use browser navigation buttons
* Commit often, for each individual feature/fix, ensuring that commits are small, well-defined and have clear, descriptive messages
* Present a clear rationale for the development of the project, in the README, demonstrating that it has a clear, well-defined purpose addressing the needs of, and user stories for a particular target audience (or multiple related audiences).
* Document the UX design work undertaken for this project, including any wireframes, mockups, diagrams, etc created as part of the design process, and the reasoning behind it.
  Include diagrams created as part of the design process and demonstrate that these have been followed through to implementation
* Document testing fully to include evaluation of bugs found and their fixes and explanation of any bugs that are left unfixed.
* Fully document the deployment procedure in a section in the README file.

--------

## Purpose

I've chosen to develop my own Website to produce an Irish COVID 19 Statistics Dashboard integrating functionality from the Google MAPs API with historical COVID statistics.
I intend on using an OpenSource Government produced Data Set to provide a hypothetical end user with accurate and localised COVID information.

--------
## UX

### Requirements

Use the Google API too render a COVID 19 Heat Map of Ireland broken down by County Boundary.
The Map should be responsive allowing end user to request more detailed statistics by selecting the county on the MAP.
I addition to the heat map, A Government data set should be used to provide an accurate breakdown of infection and death rate :
    * per county
    * per gender
    * per age range
The End user should also be able to select a specific date range and the website should produce graphs or pie charts refeling statistics.

### User stories:

* I would like to have localised figures showing the number of infected people and the number of deaths for each county .

* I would like to see how the disease is affecting different age groups.

*  Are children vectors?

*  What is the percentage breakdown of Men vs Women?

*  What was the peak and when did it occur?

*  How does that compare to now?

--------
## Development Process Todate 

*  Initial plan was to produce (multidimensional) Ireland based COVID statistics web page.
*  Following exploration of the user stories and similar International websites I landed on the concept of producing an Irish heat map providing Covid statistics based on county boundary.
*  I also noted that any websites providing Ireland statistics did not currently provide death rates on a county by county basis.
*  The plan was to provide accompanying tabular, bar/line chart and pie chart data to support the statistics and to provide a further breakdown of cases by date, by age and by gender.
*  Initially I was focused on using the Google Maps API to render the COVID data Set. 
*  For the COVID data Set I looked a multiple sources but ultimately settled on the geoHive API. It is an open source API and provides a dynamic daily statistics for both Country and County.
*  Re the Google Maps API I looked at and tested multiple approaches to rendering the Data Set on a per county basis.  These included using XML based KML Layer data acquired from the GADM Utility and TopoJSON data to render the polygon county boundaries on the Google Map. 
*  Given the construction of the Google Maps API call it also proved difficult to mask the API Key.
*  Ultimately I settled on the Google Charts API.  It natively supported rendering of Geographic county boundaries and also provided libraries for rendering heat maps, bar chart and pie chart data.
*  Having tested the geoCharts library with a static array of county data I went about testing the geoHive opensource API calls and data manipulation. 
*  The initial plan was to make two discrete API calls to two separate Data Sets. The first would provide the country wide base data set and the second would provide the county breakdown.
*  Initially I used an XHR request per the "Consuming APIs Using JavaScript" tutorial and went about converting the nested JSON objects to a 2D Array using the approach described within the Tabular Data Modules.
*  The approach worked well, and I was able to use console.logs() at various points within the parsing process to determine I had produced a viable 2D array.
*  I also completed the parse Headline data function which captured the most recent iteration of the Total Confirmed Cases and Total Confirmed Deaths from the Countrywide Array.
*  At this point in time I moved from the XHR fetch process to a jQuery.Get via a $.when/.then promises, as described in the GitHub API module.  I felt it was cleaner and better suited to working with multiple responses from simultaneous API calls for the Countrywide and county specific datasets.
*  Unfortunately, having successfully made calls to both datasets and passed the resultant responses into their own respective arrays I noted that the county death statistics contained null values for each cell.  I believe this is why the majority of the other Ireland COVID trackers omit this information.
*  I then set about looking for another source with a comparable dataset that provided the necessary statistics.  
*  While there were no publicly available API sources I was able to find a spreadsheet hosted by the Central Statistics authority that provided the necessary breakdown of deaths by county.
*  I felt that while this data would be static it provided the necessary proof of concept to proceed. 
*  I began by converting the Spreadsheet to the appropriate CSV format.  I then used an Ajax() requested to fetch the CSV data and nested for loop to iterate through the rows and columns and produce the necessary 2D array output.
*  Unfortunately, however, I encountered problems with both functional scope and type constraints errors when passing the array data to the Google API function.
*  I also noted through use of console.log that the render function was iterating twice.
*  To verify the array type was a standard array as opposed to JSON array I used the jQuery $.isArray & $.makeArray methods at the point they were received into google function.
*  Having confirmed they were good I then created a static array inside the package loader but outside the map render function. I then used the arrayToDataTable() method and successfully passed that into the render function as an argument.
*  Having confirmed the arrayToDataTable() method worked as anticipated I attempted to introduce a Jasmine based approach to testing.  I thought it might aid in identifying the root cause of the problem. Unfortunately I encountered difficulty dealing with the testing of outputs from nested functions.
*  I spoke at length with the Tutor team , re resolving the issues, and the recommendation was to drop the jasmine testing (as testing of nested functions was outside the scope of the course) and focus on resolving my other issue (Functional vs Global scope and passing array data to the Google API Call).
*  Ultimately, the problem turned out to be unrelated to type. The root cause was solely specific to scope. 
*  I resolved the problem with scope and type by encapsulating the google Render process in its entirety with a separate function that I used to pass in the array arguments.  The problem with type was perceived only and a direct result of the double iteration of the render function by calling it a 2nd time from outside the package loader.
*  While I successfully passed the data to Google function I noted the time it took to iterate through the country data resulted in a circa 5 second delay to rendering the Map.  This was as a result of the circa 30K iterations required to parse the countrywide JSON object data to a 2D array.
*  I felt this would produce a negative user response so set about providing a cleaner more timely process.
*  So for the Bar Chart timeline I moved away from the nested Object.entry(), forEach(), dataRow.push(), tableRows,push()  methods to a map() object filter followed by a forEach() .push([]) operation to produce the 2D Array. This improved parsing times significantly.
*  I also moved from the Ajax request to a jQuery.Get() via $.when()/.then promise for the CSV fetch and added the jQuery.csv library to parse the response.  I felt it was a more concise approach to parsing the CSV data.
*  Following that I tested the Google Charts function with static data to simultaneously render the heatMap with, Bar charts and Pie Charts.
*  I then went about parsing the bar chart deserialising the mapping of the Unix timestamp to local date function.
*  I noted the bar chart rendering operation was constrained in terms of x-axis functionality but produced two clean graphs, mapping dynamically acquired Confirmed Daily Cases and Confirmed Daily deaths over the lifetime of the disease.
*  I also removed the legend and updated the chart height, titles and axis descriptions to make the rendered graph more aesthetically pleasing.
*  Having rendered the dynamic Bar Charts with the heat Map I moved onto parsing the pie chart data. Unfortunately, the data set available countrywide was not duplicated for each county.
*  The Pie Chart Data also requires the columns to be transposed to the rows and vice versa.
