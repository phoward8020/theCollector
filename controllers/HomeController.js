var debug       = require('debug')
  , moment      = require('moment')
  , request     = require('request')
  , comicVine   = require('../lib/comicVine.js');

module.exports = {
    get_index : function(req, res) {
        var user = req.getUser();
        // if (!user) {
        //     res.send("Oops! Can't req.getUser(). [Home/get_index]")
        // };
        if (typeof searchResults != 'undefined') {
            res.send(searchResults);
        }
        // res.send(req.body);
        res.render('index', {'user':user});
    },

    post_index : function(req, res) {
        var user = req.getUser();
        if (!user) {
            res.send("Oops! Can't req.getUser(). [Home/post_index]")
        };
        var options = {
            'filterValue':req.body.searchTerms
        }
        var searchURL = comicVine.buildSearchURL(options);
        // I think we need a callback/promise here???
        comicVine.queryAPI(searchURL, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var results = {
                    'results': JSON.parse(body).results,
                    'error': JSON.parse(body).error
                };
                res.render('index', {'searchResults': results, 'user':user});
            } else {
                res.send('No testResuls! You fucked up! ', error);
            }
        })
    }

        // var searchField = 'issues';
        // var filterField = 'name'
        // var filterValue = req.body.searchTerms;
        // var sortField = 'cover_date';
        // var sortOrder = 'desc';
        // var format = 'json';
        // var limit = '10';
        // var offset = '0';
        // var key = process.env.comic_vine_api_key;



    // post_index : function(req, res) {
    //     var baseURL = 'http://www.comicvine.com/api'
    //     var searchField = 'issues';
    //     var filterField = 'name'
    //     var filterValue = req.body.searchTerms;
    //     var sortField = 'cover_date';
    //     var sortOrder = 'desc';
    //     var format = 'json';
    //     var limit = '10';
    //     var offset = '0';
    //     var key = process.env.comic_vine_api_key;
    //     var searchURL = baseURL +
    //               '/' + searchField + 
    //               '/?'+ 'filter=' + filterField + ':' + filterValue +
    //               '&' + 'sort=' + sortField + ':' + sortOrder +
    //               '&' + 'format=' + format +
    //               '&' + 'limit=' + limit +
    //               '&' + 'offset=' + offset +
    //               '&' + 'api_key=' + key;
    //     // res.send(searchURL);
    //     // "http://www.comicvine.com/api/issues/?format=json&filter=name:Batman&sort=cover_date:desc&api_key=" + key;
    //     request(searchURL, function (error, response, body) {
    //         if (!error && response.statusCode == 200) {
    //             var results = {
    //                 'results': JSON.parse(body).results,
    //                 'error': JSON.parse(body).error
    //             }
    //             // res.send(results);
    //             res.render('index', {'searchResults': results});
    //         }
    //     });
    // }
};