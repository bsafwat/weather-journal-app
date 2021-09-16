// Setup empty JS object to act as endpoint for all routes
projectData = {};

// historyData = [];
// populated with sample date to be able to test historty functionality
// as max one entry is assumed per day
historyData = [
	{date: "06.09.2021", temperature: 33, feelings: "hot", tempMax: 33, tempMin: 24 },
	{date: "07.09.2021", temperature: 33, feelings: "warm", tempMax: 28, tempMin: 21 },
	{date: "08.09.2021", temperature: 33, feelings: "cold", tempMax: 22, tempMin: 19 },
	{date: "09.09.2021", temperature: 33, feelings: "hot", tempMax: 30, tempMin: 20 },
	{date: "10.09.2021", temperature: 33, feelings: "nice", tempMax: 28, tempMin: 19 }
];

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
	// insert to history
	addToHistory(projectData);
	response.send(projectData);
}

app.get('/weatherHistory', getWeatherHistory);

function getWeatherHistory(request, response) {
	response.send(historyData);
}

function addToHistory(data) {
	maxDays = 7;
	const fetchDate = data.date;
	console.log(`Fetch Date: ${fetchDate}`);
	if ( isOkToAdd(fetchDate) ) {
		if(historyData.length === maxDays) {
			historyData.shift();  // keep max days
		}
		historyData.push(data);
	}
}

function isOkToAdd(fetchDate){
	// max one entry per day
	for (entry of historyData) {
		if(entry.date === fetchDate ) {
			return false;
		} else {
			return true;
		}
	}
}