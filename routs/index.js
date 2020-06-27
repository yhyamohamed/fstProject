const express = require("express");
const router = express.Router(),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    user = require("../models/user");


router.get("/", (req, res) => {
    res.render("home");
});



router.get("/register", (req, res) => {
    res.render("register");
});

router.post("/register", (req, res) => {
    const newUser = new user({ username: req.body.username });
    user.register(newUser, req.body.password, (err, user) => {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "welcome to The Gallery " + user.username);
            res.redirect("/gallery");
        });
    });
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/gallery",
        failureRedirect: "/login"
    }),
    (req, res) => { }

);

router.get("/logout", (req, res) => {
    req.logOut();
    req.flash("success", "you are logged out...see ya");
    res.redirect("/gallery");
});
module.exports = router; 