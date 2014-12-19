var db = require("../models")

module.exports = {

    get_id_issueId : function(req, res, id, issueId) {
        res.send("The collection ID is: " + id + " and the issue ID is: " + issueId);
    },
    
    post_id_issueId : function(req, res, id, issueId) {
        var user = req.getUser();
        if (user) {
                db.collectionsissues.findOrCreate({where: {collectionId: id, issueId: issueId}}).spread(function(gotIt, created) {
                    res.redirect("/issues/" + issueId);
                })       
        } else{
            res.redirect("/")
        }
        // res.send(user);

    }

}