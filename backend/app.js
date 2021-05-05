const express = require('express');
let app = express();

const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const cors = require('cors')
var mongoose = require('mongoose');
const rateLimiter = require('./middlewares/rateLimiter');
const config = require('./config');

const { db: { host, mport, name } } = config;
var MONGO_URL = process.env.MONGO_URL || `mongodb://${host}:${mport}/${name}`;
var port = process.env.PORT || config.app.port;

if (config.rateLimit.active){
  app.use(rateLimiter);
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


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
