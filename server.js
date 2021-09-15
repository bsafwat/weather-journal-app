// Setup empty JS object to act as endpoint for all routes
// projectData = {};
projectData = {date: "06.09.2021", temperature: 33, feelings: "hot" };

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use( cors() );

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
function listening() {
	console.log('Starting server .....');
	console.log(`Running on port ${port}`);
}

const port = 8099;
const weatherServer = app.listen(port, listening);

//
app.get('/weather', getWeather);

function getWeather(request, response) {
	response.send(projectData);
}

//
app.post('/updateWeather', updateWeather);

function updateWeather(request, response) {
	projectData = request.body;
    console.log("New Data: ", projectData);
	response.send(projectData);
}

/////