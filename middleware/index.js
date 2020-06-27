const gallery = require("../models/gallery"),
    Comment = require("../models/comment");

module.exports = {
    isHeOwnIt: (req, res, next) => {
        if (req.isAuthenticated()) {
            gallery.findById(req.params.id, (err, selecteditem) => {
                if (err) {
                    res.redirect("back");
                } else {
                    //does he own the post after find it &compare ids
                    if (selecteditem.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash("error", "sorry ...you don't have permission to do that");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "sorry ...you need to be loggedin to do that");
            res.redirect("back");
        }
    },
    isHeOwnTheComment: (req, res, next) => {
        if (req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, (err, selectedcomment) => {
                if (err) {
                    res.redirect("back");
                } else {
                    //does he own the post after find it &compare ids
                    if (selectedcomment.author.id.equals(req.user._id)) {
                        next();
                    } else {
                        req.flash("error", "sorry ...you don't have permession to do that");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "please login first");
            res.redirect("back");
        }
    },
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "please login first!");
        res.redirect("/login");
    }


};