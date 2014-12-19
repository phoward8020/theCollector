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
                // Create Collection/Wishlist for New User
                user.createCollection({
                    collection_type:0,
                    name:'My Collection'
                }).then(function(collection_0) {
                    user.createCollection({
                        collection_type:1,
                        name:'My Wishlist'
                    }).then(function(collection_1){
                        req.session.user = {
                                    id: user.id,
                                    email: user.email,
                                    name: user.name_first,
                                    collectionId: collection_0.id,
                                    wishlistId: collection_1.id
                        };
                        res.redirect('/users/'+ user.id +'/edit/');
                    })
                })
            }
        })
        .catch(function(error) {
            if (error && Array.isArray(error.errors)) {
                error.errors.forEach(function(errorItem) {
                    req.flash('danger', errorItem.message);
                    debug('>>>>> ERROR: ', errorItem.message);
                })
            } else {
                console.log('-------------',error);
                req.flash('danger', 'Unknown error 1')
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
                       
                        db.collection.findAll({where: {userId: userObj.id}}).then(function(data){

                            req.session.user = {
                                id: userObj.id,
                                email: userObj.email,
                                name: userObj.name_first,
                                collectionId: data[0].id,
                                wishlistId: data[1].id
                            };
                            res.send(req.session.user);
                            // res.redirect("/");
                            
                        });
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
