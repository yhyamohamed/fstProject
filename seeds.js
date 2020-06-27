const mongoose = require('mongoose'),
    gallery = require("./models/gallery"),
    comment = require("./models/comment");
const startData =
    [{
        name: "I C U",
        image: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "he can see us no kidding"
    },
    {
        name: "what !",
        image: "https://images.unsplash.com/photo-1489084917528-a57e68a79a1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "what ever you say will go here"
    },
    {
        name: "huskky puppy",
        image: "https://images.unsplash.com/photo-1521120584799-f5bceb8a4bed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",

        description: "what ever you say will go here"
    },
    {
        name: "yess g-me dat",
        image: "https://images.unsplash.com/photo-1562089501-5215229b367a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        description: "what ever you say will go here"
    },
    {
        name: "the great friend",
        image: "https://images.unsplash.com/photo-1453487977089-77350a275ec5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        description: "what ever you say will go here"
    }
    ]
function seeds() {
    comment.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("removed");
    });
    gallery.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("removed");
        startData.forEach(pic => {
            gallery.create(pic, (err, gallery) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("a new pic add....!");
                    comment.create({
                        text: "yes i wrote that ....!",
                        author: "L.Diablo"
                    }, (err, commentCreated) => {
                        if (err) {
                            console.log(err)
                        } else {
                            gallery.comments.push(commentCreated);
                            gallery.save();
                            console.log("comment created ....!");
                        }
                    });
                }
            })
        });

    });
};
module.exports = seeds;