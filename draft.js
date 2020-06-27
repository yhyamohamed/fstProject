const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dogs', { useNewUrlParser: true, useUnifiedTopology: true });

const dogschema = new mongoose.Schema({
    name: String,
    breed: String,
    status: String
});

const Dog = mongoose.model('Dog', dogschema);

// const Leo = new Dog({ name: 'zeus', breed: 'huskey', status: 'killed by a F Goldden dog !!' });
// Leo.save().then(() => console.log("sir yes sir...."));

// Dog.find().then((err, dogs) => {
//     if (!err) { console.log("sir yes sir...."), console.log(dogs) }
//     else { console.log(err) }
// });
// .then((dog) => { console.log("sir yes sir...."), console.log(dog); },
//     (err) => { console.log(err); });


// Dog.remove({ _id: "" }, (err, dog) => {
//     if (err) {
//         console.log("sth is wrong");
//         console.log(err);
//     } else {
//         console.log("sir yes sir....");
//         console.log(dog);
//     }
// });
Dog.find({}, (err, dog) => {
    if (err) {
        console.log(err);
    } else {
        console.log("sir yes sir....");
        console.log(dog);
    }
});



exec(function (err, story) {
    if (err) return handleError(err);
    console.log('The author is %s', story.author.name);
    // prints "The author is Ian Fleming"
});