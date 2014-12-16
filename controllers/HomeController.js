var debug       = require('debug')
  , request     = require('request');

module.exports = {
    get_index : function(req, res) {
        debug('>> Routing to /');
        
        var user = req.getUser();
        if (typeof searchResults != 'undefined') {
            res.send(searchResults);
        }
        // res.send(req.body);
        res.render('index', {'user':user});
    },

    post_index : function(req, res) {
        var baseURL = 'http://www.comicvine.com/api'
        var searchField = 'issues';
        var filterField = 'name'
        var filterValue = req.body.searchTerms;
        var sortField = 'cover_date';
        var sortOrder = 'desc';
        var format = 'json';
        var limit = '10';
        var offset = '0';
        var key = process.env.comic_vine_api_key;
        var searchURL = baseURL +
                  '/' + searchField + 
                  '/?'+ 'filter=' + filterField + ':' + filterValue +
                  '&' + 'sort=' + sortField + ':' + sortOrder +
                  '&' + 'format=' + format +
                  '&' + 'limit=' + limit +
                  '&' + 'offset=' + offset +
                  '&' + 'api_key=' + key;
        // res.send(searchURL);
        // "http://www.comicvine.com/api/issues/?format=json&filter=name:Batman&sort=cover_date:desc&api_key=" + key;
        request(searchURL, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var results = {
                    'results': JSON.parse(body).results,
                    'error': JSON.parse(body).error
                }
                // res.send(results);
                res.render('index', {'searchResults': results});
            }
        });
    }
};