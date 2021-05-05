const express = require('express');
let app = express();

const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/recco"


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var router = express.Router();
const movies = require('./routes/movies');
const users = require('./routes/users');

app.use('/movies', movies);
app.use('/users', users);

app.get('/', (req, res) => {
        res.send('Hello World!');
});

mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  } ,(err, res) => {
  if(err){
    throw err;
  }else{
    console.log("Connection is up and running...");

    app.listen(port, function(){
      console.log("API server running at http://localhost:" + port);
    })
  }
});
