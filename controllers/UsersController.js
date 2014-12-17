//requirements here...

module.exports = {

    get_index : function(req, res, id) {
        // Display users' default view.
        res.render('users/index')
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