var debug   = require('debug')
  , bcrypt  = require('bcrypt')
  , db      = require("../models/index.js")
  , async   = require('async');

module.exports = {

    post_signup : function(req, res) {
        //  Create New User record in database
        db.user.findOrCreate(
        {
            where: {
                email:req.body.email
            },
            defaults: {
                email:req.body.email,
                password:req.body.password
            }
        })
        .spread(function(user, created) {
            if (!created) {
                req.flash('danger', 'Email already exists in database!');
                res.redirect('/');
            } else {
                req.flash('info', 'User created successfully.');
                req.session.user = {
                            id: user.id,
                            email: user.email,
                            name: user.name_first
                };
                async.series([
                    // Create new user's collection & wishlist
                    // then redirect to /users/:id/edit/
                    function(callback) {
                        console.log('\n>>>>>>>>> Attempting to create My Collection for userId ' + user.id);
                        db.collection.findOrCreate({
                            where: {
                                userId: user.id,
                                collection_type: 0
                            },
                            defaults: {
                                userId: user.id,
                                collection_type: 0,
                                name: 'My Collection'
                            }
                        })
                        .spread(function(collection, created) {
                            if (created) {
                                console.log('\n>>>>>>>>> Created My Collection for userId ' + user.id);
                            } else {
                                console.log('\n>>>>>>>>> Failed to create My Collection for userId ' + user.id);                            
                            }
                        })
                        .catch(function(error) {
                            if (error && Array.isArray(error.errors)) {
                                error.errors.forEach(function(errorItem) {
                                    req.flash('danger', errorItem.message);
                                    debug('>>>>> ERROR: ', errorItem.message);
                                })
                            } else {
                                req.flash('danger', 'Unknown error')
                            };
                            // res.redirect('/');
                        })
                        callback(err, 'success');
                    },
                ],
                    function(err, results) {
                        res.redirect('../users/'+ user.id +'/edit/');
                    }
                )
            }
        })
        .catch(function(error) {
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
                            name: userObj.name_first
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
    },   // << End 'post_login'

//logout
//sign up form
get_logout : function(req, res) {
    // res.send('logged out');
    delete req.session.user;
    req.flash('info', 'You have been logged out.')
    res.redirect('/');
}

}
