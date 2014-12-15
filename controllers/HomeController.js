var debug   = require('debug');

module.exports = {
    get_index : function(req, res) {
        debug('>> Routing to /');
        var key = process.env.comic_vine_api_key;
        var searchURL = "http://www.comicvine.com/api/issues/?format=json&sort=id&api_key=" + key;
        res.render('index', {'searchURL': searchURL});
    }
}