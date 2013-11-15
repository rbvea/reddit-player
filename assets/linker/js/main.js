var app = angular.module('rplayer', ['soundcloud-service', 'youtube-service']);

app.controller('PlayerCtrl', ['$scope' ,'$http', '$log', 'soundcloud', 'youtube', function(scope, $http, $log, soundcloud, youtube) {
  scope.group = 'http://reddit.com/r/listentothis';
  scope.songs = [];
  scope.current_youtube = null;
  scope.current_song = null;

  scope.$watch('group', function(nu, old) {
    if(typeof nu != 'undefined') {
      $http.get('/reddit/?id=' + nu).success(function(data, status) {
        scope.songs = data.data.children;
      });
    }
  });

  scope.$watch('current_youtube', function(nu, old) {
    if(!angular.isUndefined(nu) && nu != null) {
      var id = nu.data.media.oembed.url + '?enablejsapi=1&version=3';
      angular.element(document.querySelector("#yt-player")).attr('src', id);
      // $log.info(id);
      // scope.player = youtube.player(id, angular.element('#yt-player'));
      // $log.warn(scope.id);
    }
  });

  scope.set = function(song) {
    if(song.data.media.oembed.provider_name == "YouTube") {
      scope.current_youtube = song; 
    } else {
      scope.current_song = song;
    }
  }
}]);

app.filter('icon', function() {
  return function(song) {
    if(song.data.media.oembed.provider_name == "YouTube") {
      return 'youtube play icon';
    } else {
      return 'music icon';
    }
  }
});

app.filter('media', ['$log', function($log) {
  return function(songs) {
    angular.forEach(songs, function(value, key){
      if(value.data.media == null) {
        songs.splice(key, 1);
      } 
    }); 
    return songs;
  }
}]);


