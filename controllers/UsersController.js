var db = require("../models/index.js");
var async = require('async');
var comicVine   = require('../lib/comicVine.js');

module.exports = {

    get_index : function(req, res, id) {
        var user = req.getUser();
        // Get user's collection from db and pass to view
        db.collectionsissues.findAll({
            where: {
                collectionId: user.collectionId
            }
        })
        .then(function(collectionData) {
            // res.send(collectionData);

            var issueInfo=[];

            async.each(collectionData,function(item,callback){
                // Get issue data from api
                // console.log('issue id',item.issueId);
                var options = {
                    'searchField':'issue',
                    'id':item.issueId
                }
                var searchURL = comicVine.buildSearchURL(options);
                comicVine.queryAPI(searchURL, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var results = {
                            'results': JSON.parse(body).results,
                            'error': JSON.parse(body).error
                        };
                        issueInfo.push(results);
                        console.log('>>>>>>>>>>> issueInfo: ', issueInfo);
                    } else {
                        res.send('No results from API call! You f*cked up! ', error);
                    }
                });
                callback(null, issueInfo); // << I need to pass issueInfo here, right???
            },function(){
                res.send('issueInfo: ', issueInfo);
                res.render('users/index', {'collectionData':issueInfo, 'user':user})    
            })

            
        })
    },

    get_id_edit : function(req, res, id) {
        // Display form for users to add/edit personal details.
        var user = req.getUser();
        res.render('users/edit', {'user': user});
    },

    post_id_edit : function(req, res) {
        // Handle updates from user details form.
        res.redirect('users/index')
    }

}