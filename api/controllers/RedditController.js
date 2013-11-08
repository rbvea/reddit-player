/**
 * RedditController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var request = require('request');

module.exports = {
    
  find: function(req, res) {
    // sails.log.info(req.param('id'));
    var id = req.param('id');
    var regexp = new RegExp(/http:\/\/www.reddit.com\/r\/\w+/);
    if(id == undefined) {
      sails.log.info('reddit id is undefined!');
    } else {
      request({url: id + ".json", json: true}, function(err, response, body) {
        if(!err) {
          res.json(body);
        }
      });
    } 
    // else {
    //   res.json({
    //     message: 'not a valid id',
    //   });
    // }

    // res.json({foo: 'bar'});
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to RedditController)
   */
  _config: {}

  
};
