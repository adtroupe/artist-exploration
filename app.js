var data;
var albumData;
var albumName;

var myBaseUrl = 'https://api.spotify.com/v1/'

var baseUrl = 'https://api.spotify.com/v1/search?type=track&query='

var myApp = angular.module('myApp', [])

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  // $scope.getSongs = function() {
  //   $http.get(baseUrl + $scope.track).success(function(response){
  //     data = $scope.tracks = response.tracks.items
      
  //   })
  // }

  $scope.myGetSongs = function() {
    $http.get(myBaseUrl + 'search?type=' + $scope.sType + '&query=' + $scope.sString + '&limit=1').success(function(response) {
      $('#explorePopUp').modal('hide');      
      data = $scope.artists = response.artists.items;
      $scope.getAlbums();
    })
  };

  $scope.getAlbums = function() {
    $http.get(myBaseUrl + 'artists/' + data[0].id + '/albums?album_type=album&market=US&limit=8').success(function(response) {
      albumData = $scope.albums = response.items;
    })
  };

  $('#pageContent').on('click', '.albumArtImg', function() {
    $scope.getAlbumSongs(this.alt);
  });

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
      $('#albumPopUp .modal-content').css('background-image', 'url('+albumInfo.images[0].url+')');
    })
  };

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
})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});


