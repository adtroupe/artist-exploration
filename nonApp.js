$(document).ready(function(){

  $('#loginButton').on('click', function() {
    $('#loginPopUp').modal();
  });
  $('#signUpButton').on('click', function() {
  	$('#loginPopUp').modal('hide');
  	$('#signUpPopUp').modal();
  });



});