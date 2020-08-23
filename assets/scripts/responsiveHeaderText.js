// Responsive Script to alter header text on window size change

$(document).ready(function(){

   // console.log("Typography Script Initiated");
   if($( window ).width() < 768) {
       $(".navbar-brand").html(`<h1>Ireland COVID-19<br>Disease Tracker</h1>`);
       $(".navbar-brand h1").addClass('repsonsiveHeader');
   }else{
       $(".navbar-brand").html(`<h1>Ireland COVID-19 Disease Tracker</h1>`);
       $(".navbar-brand h1").removeClass('repsonsiveHeader');
   }
});
