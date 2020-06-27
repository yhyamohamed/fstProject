const express = require("express");
const router = express.Router({ mergeParams: true }),
    middleware = require("../middleware"),
    gallery = require("../models/gallery"),
    Comment = require("../models/comment");

router.get("/new", middleware.isLoggedIn, (req, res) => {
    gallery.findById(req.params.id, (err, selectedItem) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { pic: selectedItem });
        }
    });
});

router.post("/", middleware.isLoggedIn, (req, res) => {
    gallery.findById(req.params.id, (err, selectedItem) => {
        if (err) {
            console.log(err);
            res.redirect("/gallery");
        } else {

            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    req.flash("error", "sorry ...something went wrong");
                    console.log(err);
                } else {
                    ///add username and id to comment 
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    /////save 
                    comment.save();
                    selectedItem.comments.push(comment);
                    selectedItem.save();
                    req.flash("success", "successfully added comment"),
                        res.redirect("/gallery/" + selectedItem._id);
                }
            });
        }
    });
});

//EDIT
router.get("/:comment_id/edit", middleware.isHeOwnTheComment, (req, res) => {
    Comment.findById(req.params.comment_id, (err, selectedcomment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", { pics_id: req.params.id, comment: selectedcomment });

        }
    });
});

//UPDATE
router.put("/:comment_id", middleware.isHeOwnTheComment, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, ubdatedComment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/gallery/" + req.params.id);
        }
    });
});

//DESTROY 
router.delete("/:comment_id", middleware.isHeOwnTheComment, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "comment deleted ");
            res.redirect("/gallery/" + req.params.id);
            console.log("a comment has been deleted");
        }
    });
});
module.exports = router; 