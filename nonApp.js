$(document).ready(function(){

  $('#signUpButton').on('click', function() {
  	$('#loginPopUp').modal('hide');
  	$('#signUpPopUp').modal();
  });
  $('#exploreButton').on('click', function() {
  	$('#explorePopUp').modal();
  });
  $('#reset').on('click', function() {
  	$('#explorePopUp').modal();
  })
});