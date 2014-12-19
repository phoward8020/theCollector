var debug       = require('debug')
  , db          = require("../models/index.js")
  , comicVine   = require('../lib/comicVine.js')
  , request     = require('request');

module.exports = {
    get_index : function(req, res, id) {
        var user = req.getUser();
        if (!user) {
            // Only need to check this here when user clicks "Got It/Want It" buttons.
            // res.send("Oops! Can't req.getUser(). [Issues/get_index]")
        };
        //  Get issue info from API and send to view
        var options = {
            searchField:'issue',
            id:id
        }
        searchURL = comicVine.buildSearchURL(options);
        // res.send('searchURL: ', searchURL);




        comicVine.queryAPI(searchURL, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var results = {
                    'results': JSON.parse(body).results,
                    'error': JSON.parse(body).error
                };
                res.render('issues/detail', {'searchResults': results, 'user': user});
            } else {
                res.send('No testResuls! You fucked up! ', error);
            }
        })
    }
}