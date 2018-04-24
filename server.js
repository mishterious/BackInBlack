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
mongoose.connect('mongodb://localhost/rest');

//The Schema along with the validation about how data is stored.
var RestSchema = new mongoose.Schema({
    name:  {
        type: String, 
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"],
        unique: [true, "Name must be unique"],
        },
    cuisine: {
        type: String,
        minlength: 1
    },
    messages: [{
        customer: {
            type: String, 
            required: [true, "You need a location"],
            minlength: 5
        },
        stars: {
            type: Number
        },
        description: {
            type: String,
            minlength: 5
        }
    }]
}, {timestamps: true });


// How to Retrieve the Schema and store it in the variable User
var Rest = mongoose.model('Rest', RestSchema);


//Promises are created to help stuff:
mongoose.Promise = global.Promise;


//All the Views and Logic 
app.get('/rests', function(req, res){
    Rest.find({}, function(err, result){
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


app.get('/reviews', function(req, res){
    Rest.find({}).sort('-messages.stars').exec(function(err, result){
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
    Rest.findOne({_id: req.params.id}).sort('-messages.stars').exec(function(err, result){
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
    Rest.findOne({name: req.params.name}, function(err, result){
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

    var rest = new Rest();
    rest.name = req.body.name;
    rest.cuisine = req.body.cuisine;

    rest.save(function(err, result){
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
            res.json({message: "Add rest", data: rest});
        }
    });
});


app.post('/edit/:id', function(req,res){

    Rest.find({_id: req.body._id}, function(err, lunch){
        
        console.log("===========")
        console.log(lunch[0]); 
        console.log(req.body._id);
        console.log(req.body.name);
        lunch[0].name = req.body.name;
        lunch[0].cuisine = req.body.cuisine;

        lunch[0].save(function(err){
            if(err){
                console.log('==== there is an error! =====')
                console.log(err);
                res.json(err);
            }else{
                console.log('==== Edit this one  === ')
                console.log(lunch);
                res.json(lunch);
            }
        });
    });
});


app.get('/quotesBy/:id', function(req, res){
    console.log(req.params.id);
    console.log("========WE'RE ADDING A QUOTE=======")
    Rest.findOne({_id: req.params.id}, function(err, rest){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log('==== Edit this one  === ')
            console.log(rest);
            console.log("were here");
            res.json(rest);
        }
    });
});


app.put('/addReview/:id', function(req, res){
    var newRest = req.body;

    Rest.update({_id: req.params.id}, { $push: {messages: { customer: newRest.customer, stars: newRest.stars, description:description }}}, function(err, rest){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log(rest);
            res.json(rest);
        }
    });
})


app.put('/like/:id', function(req, res){

    var newRest = req.body;
    console.log("85748394857584934857548394857548398475483948")
    console.log(newRest);

    Rest.update({_id: req.params.id}, { $set: { rank: newRest.rank }}, function(err, rest){
        if(err){
            console.log('==== there is an error! =====')
            console.log(err);
            res.json(err);
        }else{
            console.log('==== Edit this one  === ')
            console.log(rest);
            console.log("were here");
            res.json(rest);
        }
    });
})

// app.put('/vote/:id', function(req, res){
//     console.log("03948579302-49587694034857")
//     var newQuote = req.body;
//     console.log (newQuote._id)
//     Rest.update({_id: req.body._id }, { $set: { "messages.$.rank": newQuote.rank }}, function(err, rest){
//         if(err){
//             console.log('==== there is an error! =====')
//             console.log(err);
//             res.json({ message: "not working", erros: err});
//         }else{
//             console.log('==== Edit this one  === ')
//             console.log(rest);
//             console.log("were here");
//             res.redirect('/');
//         }
//     })
// });


app.delete('/delete/:id', function(req, res){
    console.log(req.params.id);
    Rest.remove( {_id: req.params.id}, function(err, result){
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