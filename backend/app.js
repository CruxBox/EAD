const express = require('express');
let app = express();

const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var router = express.Router();
const movies = require('./routes/movies');

app.use('/movies', movies);

app.get('/', (req, res) => {
        res.send('Hello World!');
});

let server = app.listen(8080, function() {
    console.log('Server is listening on port 8080')
});