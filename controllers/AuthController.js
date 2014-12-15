var debug   = require('debug')
  , db      = require("../models/index.js");

module.exports = {

    post_signup : function(req, res) {
        debug('>> Routing to /auth/signup (POST)');
        // res.send('req.body.email: ', req.body.email);

        db.user.findOrCreate(
        {
            where: {
                email:req.body.email
            },
            defaults: {
                email:req.body.email,
                password:req.body.password
            }
        }).spread(function(user, created) {
            if (!created) {
                req.flash('danger', 'Email already exists in database!');
                res.redirect('/');
            } else {
                req.flash('info', 'User created successfully.');
                res.redirect('/');
            }
        }).catch(function(error) {
            if (error && Array.isArray(error.errors)) {
                error.errors.forEach(function(errorItem) {
                    req.flash('danger', errorItem.message);
                    debug('>>>>> ERROR: ', errorItem.message);
                })
            } else {
                req.flash('danger', 'Unknown error')
            };
            res.redirect('/');
        });

    }

}
