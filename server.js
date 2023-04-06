const bodyParser = require('body-parser'); //dependency
const cors = require('cors'); //dependency
const express = require('express'); // (dependency) Require Express to run server and routes

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const app = express();

/* Middleware*/
// Configure express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//GET route that returns the entire projectData object
app.get('/all', function (req, res) {
    res.send(projectData);
});

//POST route that adds incoming data to projectData
app.post('/add', function (req, res) {
    //req.body is the data sent from the client side in the POST request. 
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    res.send(projectData);
});

// Setup Server
const port = 8080;
const server = app.listen(port, listening);

function listening() {
    console.log(`running on localhost: ${port}`);
};
