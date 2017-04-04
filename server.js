var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');
var UserSchema = new mongoose.Schema({
 name: String,
 color: String,
 gender: String,
 weight: Number,
 age: Number
})
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User')

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine','ejs');
app.get('/',function(req,res){
  var users = User.find({}, function(err, users) {
    res.render('index',{users:users});

 // Retrieve an array of users
 // This code will run when the DB is done attempting to retrieve all matching records to {}
})
//
})
// Routes
// Root Request
// app.get('/', function(req, res) {
//     // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
//     res.render('index');
// })

app.get('/mongooses/new', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    res.render('new');
})
// app.get('/mongooses', function(req, res) {
//     // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
//     res.render('index');
// })
app.get('/mongooses/:id', function(req, res) {
  var id = req.params.id;
  var users = User.find({_id: id}, function(err, users) {
    console.log(users);
    res.render('detail',{users:users});

    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
});

})
 app.get('/mongooses/edit/:id', function(req, res) {
   var id = req.params.id;
   var users = User.find({_id: id}, function(err, users) {
     console.log(users);
     res.render('edit',{users:users});

     // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
 });

  })
  app.get('/mongooses/delete/:id', function(req, res) {
    var id = req.params.id;
    var users = User.remove({_id: id}, function(err, users) {
      console.log(users);
      res.redirect('/');

      // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
  });

   })
  app.post('/mongooses/:id', function(req, res) {
      console.log("POST DATA", req.body);
      var id = req.params.id;

      User.update({_id: id}, {name:req.body.name, age:req.body.age, color:req.body.color, gender:req.body.gender, weight: req.body.weight}, function(err){

        if(err){
          console.log('something went wrong');
        } else {
          console.log('successfully updated a user');
          res.redirect('/');
        }
      })

    })
//    var users = User.find({_id: id}, function(err, users) {
//      console.log(users);
//      res.render('detail',{users:users});
//     // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
//     res.render('index');
// })
// app.get('/mongooses/destroy/:id', function(req, res) {
//     // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
//     res.render('index');
// })
// Add User Request
app.post('/mongooses', function(req, res) {
    console.log("POST DATA", req.body);

    var newuser = new User({name:req.body.name, age:req.body.age, color:req.body.color, gender:req.body.gender, weight: req.body.weight});
    newuser.save(function(err){
      if(err){
        console.log('something went wrong');
      } else {
        console.log('successfully added a user');
        res.redirect('/');
      }
    })

  })
    // This is where we would add the user from req.body to the database.

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {

    console.log("listening on port 8000");
})
