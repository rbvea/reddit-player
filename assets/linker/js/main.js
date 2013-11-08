var app = angular.module('rplayer', ['soundcloud-service']);

app.directive('player', ['$http', '$log', 'soundcloud', function($http, $log, soundcloud) {
  return function(scope, elm, attrs) {

    soundcloud.init();
    
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
      if(nu != null) {
        var id = nu.data.media.oembed.url.split('?v=')[1];
        // $log.info(id);
        scope.player = new YT.Player('yt-player', {
          videoId: id,
        })
        $log.warn(scope.player);
      }
    });

    scope.set = function(song) {
      if(song.data.media.oembed.provider_name == "YouTube") {
        scope.current_youtube = song; 
      } else {
        scope.current_song = song;
      }
      // $log.warn(scope.current_song);
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
