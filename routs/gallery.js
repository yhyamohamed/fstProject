const express = require("express");
const router = express.Router(),
    middleware = require("../middleware"),
    gallery = require("../models/gallery");

//index rout > show all gallery
router.get("/", (req, res) => {
    gallery.find({}, (err, allgallery) => {
        if (err) {
            console.log(err);
        } else {
            res.render("gallery/gallery", { pics: allgallery, currentUser: req.user });
        }
    });
});
//create rout > add new pics
router.post("/", middleware.isLoggedIn, (req, res) => {
    //install body parser
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    const newimg = { name: name, image: image, description: description, author: author };
    gallery.create(newimg, (err, newitem) => {
        if (err) { console.log(err); }
        else {
            console.log("new item added");
            req.flash("success", "you add a new pic");
            res.redirect("/gallery");
        }
    });

});

//new > show form to create new item
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("gallery/new");
});


///show > more detail
router.get("/:id", (req, res) => {
    //the selected
    // gallery.findById(req.params.id, (err, selecteditem) => {
    //to find the selected pic comments
    gallery.findById(req.params.id).populate("comments").exec((err, selecteditem) => {
        if (err||!selecteditem) {
            req.flash("error", "image not found");
            res.redirect("back");
        } else {
            res.render("gallery/show", { pics: selecteditem });
        }
    });

});

// EDIT 
router.get("/:id/edit", middleware.isHeOwnIt, (req, res) => {
    gallery.findById(req.params.id, (err, selecteditem) => {
        res.render("gallery/edit", { pics: selecteditem });
    });
});
// UPDATE 
router.put("/:id", middleware.isHeOwnIt, (req, res) => {
    gallery.findByIdAndUpdate(req.params.id, req.body.pics, (err, updateditem) => {
        if (err) {
            res.redirect("/gallery");
        } else {
            req.flash("success", "the item successfully updated ");
            res.redirect("/gallery/" + req.params.id);
        }
    });
});


//DEATROY 
router.delete("/:id", middleware.isHeOwnIt, (req, res) => {
    gallery.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/gallery");
        } else {
            res.redirect("/gallery");
            console.log("an item has been deleted");
        }
    });
});
module.exports = router; 