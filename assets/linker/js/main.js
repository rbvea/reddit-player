var app = angular.module('rplayer', ['soundcloud-service', 'youtube-service']);

app.controller('PlayerCtrl', ['$scope' ,'$http', '$log', 'soundcloud', 'youtube', '$window' ,  function(scope, $http, $log, soundcloud, youtube, $window) {
  scope.group = 'http://reddit.com/r/listentothis';
  scope.songs = [];
  scope.current_youtube = null;
  scope.current_song = null;
  scope.player = null;
  scope.ready = false;

  $window.onYouTubeIframeAPIReady = function() {
    scope.ready = true;
    // $log.warn('iframe api ready');
    scope.player = new $window.YT.Player('player-div', {
      height: '300',
      width: '100%',
    });
    // $log.warn(scope.player);
  }

  scope.$watch('group', function(nu, old) {
    if(typeof nu != 'undefined') {
      $http.get('/reddit/?id=' + nu).success(function(data, status) {
        scope.songs = data.data.children;
      });
    }
  });

  scope.$watch('current_youtube', function(nu, old) {
    if(!angular.isUndefined(nu) && nu != null) {
      var id = nu.data.media.oembed.url.split('?v=')[1];
      scope.player.loadVideoById(id);
      // var player = new yt.player('yt-player', {
      //   videoId: id,
      // });
        // $log.warn(scope.player);
           // angular.element(document.querySelector('#yt-player')).attr('src', 'http://www.youtube.com/embed/' + id + '?enablejsapi=1&version=3&origin=http://reddit-player.herkouapp.com');
      // scope.player = new YT.player('yt-player');
      // scope.player.loadVideoById(id);
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


