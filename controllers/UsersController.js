//requirements here...

module.exports = {

    get_index : function(req, res, id) {
        // Display users' default view.
        res.render('users/index')
    },

    get_edit : function(req, res) {
        // Display form for users to add/edit personal details.
        res.render('users/edit')
    },

    post_edit : function(req, res) {
        // Handle updates from user details form.
        res.redirect('users/index')
    }

}