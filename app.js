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

  $scope.getArtist = function(artistName) {
    $http.get(myBaseUrl + 'search?type=artist&query=' + artistName + '&limit=1').success(function(response) {
      $('#explorePopUp').modal('hide');      
      data = $scope.artists = response.artists.items;
      $scope.getAlbums();
      $scope.getRelated();
    })
  };


  $scope.getAlbums = function() {
    $http.get(myBaseUrl + 'artists/' + data[0].id + '/albums?album_type=album,single&market=US&limit=18').success(function(response) {
      albumData = $scope.albums = response.items;
    })
  };

  myApp.filter('uniq', function() {
    return function(input, key) {
      var unique = {};
      var uniqueList = [];
      for(var i = 0; i < input.length; i++){
        if(typeof unique[input[i][key]] == "undefined"){
          unique[input[i][key]] = "";
          uniqueList.push(input[i]);
        }
      }
      return uniqueList;
    };
  });

  $scope.getRelated = function() {
    $http.get(myBaseUrl + 'artists/' + data[0].id + '/related-artists').success(function(response) {
      relatedData = $scope.relatedData = response.artists;
    })
  };

  $('#pageContent').on('click', '.albumArtImg', function() {
    $scope.getAlbumSongs(this.alt);
  });

  $('#pageContent').on('click', '.relatedArtistDiv', function() {
    $scope.getArtist(this.children[1].innerHTML);
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
      // $('#albumPopUp .modal-content').css('background-image', 'url('+albumInfo.images[0].url+')');
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

  $('#albumPopUp').on('hidden.bs.modal', function() {
    $scope.audioObject.pause()
    $scope.currentSong = false    
  })

})

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});


