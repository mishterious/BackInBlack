//Require the following Modules:
var express = require('express');
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');

//Instantiate your Express application:
var app = express();

//BodyParser and Static must be connected to the server:
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, './static')));

//ANGULAR is being connected:
app.use(express.static(__dirname + "/BackInBlack/dist"));

// configure body-parser to read JSON
app.use(bodyParser.json());

//This is the Mongo and mongoose connection:
mongoose.connect('mongodb://localhost/pets');

//The Schema along with the validation about how data is stored.
var PetSchema = new mongoose.Schema({
    name:  {
        type: String, 
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"],
        unique: [true, "Name must be unique"],
        },
    animal_type: {
        type: String,
        minlength: 1
    },
    description: {
        type: String,
        minlength: 5
    },
    skill1: {    
        type: String,
        minlength: 4
    },
    skill2: {
        type: String
    },
    skill3: {    
        type: String    
    },
    rank: {
        type: Number
    }
}, {timestamps: true });


// How to Retrieve the Schema and store it in the variable User
var Pet = mongoose.model('Pet', PetSchema);


//Promises are created to help stuff:
mongoose.Promise = global.Promise;


//All the Views and Logic 
app.get('/pets', function(req, res){
    Pet.find({}).sort('-animal_type').exec(function(err, result){
        if(err){
            myerr = { error: "==== there is an error! ====="};
            console.log(err);
            res.json(err);
        }else{
            console.log(result);
            res.json(result);
        }
    });
});


app.get('/by/:id', function(req, res){
    console.log("INSIDE OF ID");
    Pet.findOne({_id: req.params.id}, function(err, result){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log('==== Edit this one  === ')
            console.log(result);
            console.log("were here");
            res.json(result);
        }
    });
});


app.get('/byName/:name', function(req, res){
    console.log("INSIDE OF ID");
    Pet.findOne({name: req.params.name}, function(err, result){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log('==== Edit this one  === ')
            console.log(result);
            console.log("were here");
            res.json(result);
        }
    });
});


app.post('/create', function(req, res){
    console.log("----------------------------------------------")
    console.log("Post Data", req.body);

    var pet = new Pet();
    pet.name = req.body.name;
    pet.animal_type = req.body.animal_type;
    pet.description = req.body.description;

    if(req.body.skill1.length > 1){
        pet.skill1 = req.body.skill1;
        console.log(pet.skill1);
    }
    if(req.body.skill2.length > 1){
        pet.skill2 = req.body.skill2;
        console.log(pet.skill2);
    }
    if(req.body.skill3.length > 1){
        pet.skill3 = req.body.skill3;
        console.log(pet.skill3t);
    }

    pet.rank = 1;
    pet.save(function(err, result){
        console.log("are we here?")
        if(err){
            if(err.name == "BulkWriteError"){
                res.json({message: "Unique Error", error: err});
            }
            else {
                res.json({message: "Error", error: err});
            }
        }
        else{
            console.log('==== Seeing all users successfully === ')
            console.log(result);
            res.json({message: "Add Pet", data: pet});
        }
    });
});


app.post('/edit/:id', function(req,res){

    Pet.findOne({_id: req.params.id}, function(err, pet){
        pet.name = req.body.name;
        pet.animal_type = req.body.animal_type;
        pet.description = req.body.description;

        if(req.body.skill1){
            pet.skill1 = req.body.skill1;
        }
        if(req.body.skill2){
            pet.skill2 = req.body.skill2;
        }
        if(req.body.skill3){
            pet.skill3 = req.body.skill3;
        }
        pet.save(function(err){
            if(err){
                console.log('==== there is an error! =====')
                console.log(err);
                res.json(err);
            }else{
                console.log('==== Edit this one  === ')
                console.log(pet);
                res.json(pet);
            }
        });
    });
});


app.get('/quotesBy/:id', function(req, res){
    console.log(req.params.id);
    console.log("========WE'RE ADDING A QUOTE=======")
    Pet.findOne({_id: req.params.id}, function(err, pet){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log('==== Edit this one  === ')
            console.log(pet);
            console.log("were here");
            res.json(pet);
        }
    });
});


app.put('/addQuote/:id', function(req, res){
    var newPet = req.body;

    Pet.update({_id: req.params.id}, { $push: {messages: { quote: newPet.quote, rank: newPet.rank }}}, function(err, pet){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log(pet);
            res.json(pet);
        }
    });
})


app.put('/like/:id', function(req, res){

    var newPet = req.body;
    console.log("85748394857584934857548394857548398475483948")
    console.log(newPet);

    Pet.update({_id: req.params.id}, { $set: { rank: newPet.rank }}, function(err, pet){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log('==== Edit this one  === ')
            console.log(pet);
            console.log("were here");
            res.json(pet);
        }
    });
})

// app.put('/vote/:id', function(req, res){
//     console.log("03948579302-49587694034857")
//     var newQuote = req.body;
//     console.log (newQuote._id)
//     Pet.update({_id: req.body._id }, { $set: { "messages.$.rank": newQuote.rank }}, function(err, pet){
//         if(err){
//             console.log('==== there is an error! =====')
//             console.log(err);
//             res.json({ message: "not working", erros: err});
//         }else{
//             console.log('==== Edit this one  === ')
//             console.log(pet);
//             console.log("were here");
//             res.redirect('/');
//         }
//     })
// });


app.delete('/delete/:id', function(req, res){
    console.log(req.params.id);
    Pet.remove( {_id: req.params.id}, function(err, result){
        // This code will run when the DB has attempted to remove one matching record to {_id: 'insert record unique id here'}
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log('==== Edit this one  === ')
            console.log(result);
            console.log("were here");
            res.json(result);
        }        
    })
});


app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./BackInBlack/dist/index.html'));
});


//Setting up the Server to listen to a partical port:
app.listen(8000, function() {
    console.log("listening on port 8000");
})