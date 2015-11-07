var data;
var albumData;
var myBaseUrl = 'https://api.spotify.com/v1/'
var myApp = angular.module('myApp', [])
var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}

  //Get artist function based on a passed artist name
  $scope.getArtist = function(artistName) {
    $http.get(myBaseUrl + 'search?type=artist&query=' + artistName + '&limit=1').success(function(response) {
      $('#explorePopUp').modal('hide');      
      data = $scope.artists = response.artists.items;
      $scope.getAlbums();
      $scope.getRelated();
    })
  };

  //Retrieves the albums based on the artist given
  $scope.getAlbums = function() {
    $http.get(myBaseUrl + 'artists/' + data[0].id + '/albums?album_type=album,single&market=US&limit=18').success(function(response) {
      albumData = $scope.albums = response.items;
    })
  };

  //Retrieves related artists based on the artist given
  $scope.getRelated = function() {
    $http.get(myBaseUrl + 'artists/' + data[0].id + '/related-artists').success(function(response) {
      relatedData = $scope.relatedData = response.artists;
    })
  };

  //Creates pop up when an album is clicked
  $('#pageContent').on('click', '.albumArtImg', function() {
    $scope.getAlbumSongs(this.alt);
  });

  //Changes artist in focus on click of related artist
  $('#pageContent').on('click', '.relatedArtistDiv', function() {
    $scope.getArtist(this.children[1].innerHTML);
  });

  //Retrieves the album information based on an albumID 
  $scope.getAlbumSongs = function(albumID) {
    $http.get(myBaseUrl + 'albums/' + albumID).success(function(response) {
      albumInfo = $scope.albumInfo = response;
      $scope.byLine = albumInfo.artists[0].name;
      if(albumInfo.artists.length > 1){
        for (var i = 1; i < albumInfo.artists.length - 1; i++) {
          $scope.byLine += ', ' + albumInfo.artists[i].name;
        };
        $scope.byLine += ' & ' + albumInfo.artists[albumInfo.artists.length - 1].name;
      };
      $('#albumPopUp').modal();
    })
  };

  //Triggers when songs are played or paused
  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }
  $('#albumPopUp').on('hidden.bs.modal', function() {
    $scope.audioObject.pause()
    $scope.currentSong = false    
  })

});

//Triggers modal pop ups on button clicks
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