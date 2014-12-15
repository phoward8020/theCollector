var debug   = require('debug');

module.exports = {
    get_signup : function(req, res) {
        res.send('Got to auth/signup GET');
    },

    post_signup : function(req, res) {
        debug('>> Routing to /auth/signup (POST)');
        res.send('Got to auth/signup POST.');
    }
}
