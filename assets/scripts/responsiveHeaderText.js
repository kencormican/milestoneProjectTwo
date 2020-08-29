// Responsive Script to alter header text on window size change

$(document).ready(function () {
    if ($(window).width() < 768) {
        $(".navbar-brand").html(`<h1>Ireland COVID-19<br>Disease Statistics</h1>`);
        $(".navbar-brand h1").addClass('repsonsiveHeader');
    } else {
        $(".navbar-brand").html(`<h1>Ireland COVID-19 Disease Statistics</h1>`);
        $(".navbar-brand h1").removeClass('repsonsiveHeader');
    }
});
