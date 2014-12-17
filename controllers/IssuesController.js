var debug       = require('debug')
  , db          = require("../models/index.js")
  , comicVine   = require('../lib/comicVine.js')
  , request     = require('request');

module.exports = {
    get_index : function(req, res, id) {
        var user = req.getUser();
        if (!user) {
            res.send("Oops! Can't req.getUser(). [Issues/get_index]")
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


        // findOrCreate issue record here
        // db.issue.findOrCreate(
        // {
        //     where: {
        //         api_id:id
        //     },
        //     defaults: {
        //         api_id:req.params.id
        //     }
        // }).spread(function(issue, created) {
        //     if (!created) {
        //         //  Issue already exists in database. Pull data from there.
        //         db.issue.find({})

        //         res.redirect('issues/index', {'user': user});
        //     } else {
        //         //  Issue id has been added to database. Now put the rest of the data in there.
        //         //  -- (1/3) QUERY API

        //         //  -- (2/3) PASS RESULTS TO DB
        //         db.issue.update(
        //         {
        //             where: {
        //                 api_id:id
        //             },
        //             defaults: {

        //             }
        //         })
        //         // -- (3/3) RENDER ISSUE DETAIL PAGE
        //         res.redirect('issues/index', {'user': user});
        //     }
        // }).catch(function(error) {
        //     if (error && Array.isArray(error.errors)) {
        //         error.errors.forEach(function(errorItem) {
        //             res.send('>>>>> ERROR: ', errorItem.message)
        //             req.flash('danger', errorItem.message);
        //             debug('>>>>> ERROR: ', errorItem.message);
        //         })
        //     } else {
        //         res.send('Unknown error')
        //         req.flash('danger', 'Unknown error')
        //     };
        //     res.redirect('issues/index');
        // });
    }
}