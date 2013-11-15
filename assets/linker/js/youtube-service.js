angular.module('youtube-service', []).factory('youtube', function() {
  var yt = {};

  yt.player = function(id) {
    angular.element("#yt-player").attr('src', 'http://www.youtube.com/embed/' + id + '?enablejsapi=1&version=3');
  }

  return yt;
   
});

