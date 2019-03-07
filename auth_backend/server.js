var mongoose = require('mongoose');

var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
const cors = require('cors');

const uri = "mongodb+srv://dbAdmin:dbAdminPassword@cluster0-hdse0.mongodb.net/test?retryWrites=true";
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds,
    dbName: "Gridly_auth"
  };
mongoose.connect(uri, options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected database:", options.dbName);
});

//setting request headers
app.use(function (request, response, next) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
  next();
});

// the following 2 middleware convert the URL req and res to json format
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

//our defined routes
const userAccounts = require('./routes/userAccounts');


//default
router.get('/', function(req, res) {
    res.json({ message: 'Hello World!' });   
});

//models
app.use('/UserAccounts', userAccounts);
app.use('/', router);
app.use(cors());

//setting request headers
app.use(function (request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, PUT, DELETE, OPTIONS');
    next();
});

//middleware
app.listen(3700, function () {
    console.log('Server is up and listening on port 3700');
});
