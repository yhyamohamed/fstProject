const express = require("express"),
    app = express(),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    flash = require("connect-flash"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    gallery = require("./models/gallery"),
    Comment = require("./models/comment"),
    user = require("./models/user"),
    seeds = require("./seeds");


const galleryRoutes = require("./routs/gallery"),
    commentRoutes = require("./routs/comment"),
    indexRoutes = require("./routs/index");



const uri = process.env.GALLERYDB || 'mongodb://localhost:27017/gallery-v11';
mongoose
    .connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seeds();


app.use(require("express-session")({
    secret: "yaya",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/gallery", galleryRoutes);
app.use("/gallery/:id/comments", commentRoutes);
app.use(indexRoutes);



const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(port);
    console.log("the journy is  on !!");
});