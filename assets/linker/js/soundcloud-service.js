angular.module('soundcloud-service', []).factory('soundcloud', function($log) {
  var soundcloud = {};

  soundcloud.init = function() {
    if(typeof SC != 'undefined') {
      SC.initialize({
        client_id: 'd4028fd61fff481fd1a26986c25073ea',
      })
    } else {
      alert('soundcloud js file not included!');
    }
  }

  soundcloud.getEmbed = function(id) {
    $log.info(id);
    return id; 
  }

  return soundcloud;
});

