$(document).ready(function(){

  $('#loginButton').on('click', function() {
    $('#loginPopUp').modal();
  });
  $('#signUpButton').on('click', function() {
  	$('#loginPopUp').modal('hide');
  	$('#signUpPopUp').modal();
  });
  $('#exploreButton').on('click', function() {
  	$('#explorePopUp').modal();
  });
  // $('#pageContent').on('click', '.albumArtImg', function() {
  // 	alert(this.src + '   ' + this.alt +  '   ' );
  // });
});