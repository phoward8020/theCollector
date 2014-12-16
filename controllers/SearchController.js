var debug       = require('debug')
  , request     = require('request');

module.exports = {
    post_index : function(req, res) {
        debug('>> Routing to search/');
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
                    'results': JSON.parse(body)
                }
                // res.send(results);
                // res.send('req.session: ', req.session);
                res.render('index', {'searchResults': results});
            };
        });
    }
}