var debug   = require('debug')
  , bcrypt  = require('bcrypt')
  , db      = require("../models/index.js");

module.exports = {

    post_signup : function(req, res) {
        debug('>> Routing to /auth/signup (POST)');
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
    },  // << End 'post_signup'

    post_login : function(req, res) {
        // res.send('Got to post_login route.');
        //do login here (check password and set session value)
        db.user.find({where:{email:req.body.email}}).then(function(userObj) {
            if (userObj) {
                // check password now
                // res.send("we will test password now.")
                bcrypt.compare(req.body.password, userObj.password, function(err, match) {
                    if (match) {
                        // store userObj in session here.
                        // res.send("password is correct!");
                        req.session.user = {
                            id: userObj.id,
                            email: userObj.email,
                            name: userObj.name
                        };
                        res.redirect("/");
                    } else {
                        req.flash('danger', 'Invalid Password!');
                        res.redirect("/");
                        // res.send("invalid password!");
                    }
                })
            } else {
                // error - user not found.
                req.flash('danger', 'Unknown User!');
                res.redirect("/");
                // res.send("Unknown user.");
            }
        });
        //user is logged in forward them to the home page
        // res.redirect('/');
    }   // << End 'post_login'

}
