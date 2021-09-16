/* Global Variables */
// openWeatherMap.org API
//
// call by ZIP example
// http://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}
//
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const units = 'units=metric&';
const apiKey = 'appid=467cdc0273a13eefe43d0ca35ff041f2';
let lastEpochApiFetch = 100;
let lastZipUsed = '00000';
let fetchError = '';

// Create a new date instance dynamically with JS
let d = new Date();
let currentTime = d.getTime();
let newDate = d.getDate() +'.'+ (d.getMonth() + 1) +'.'+ d.getFullYear();

let isErrorMessageDisplayed = false;

const getWeatherData = async (url) => {

	const response = await fetch(url);    
    try {
        const allData = await response.json();

        // check fetched data
        if (allData.cod !== 200) {
            fetchError = `${allData.message}`;
            return undefined;
        }
        const apiWeatherData = {};
        apiWeatherData.date = newDate;
        apiWeatherData.temperature = allData.main.temp;
        apiWeatherData.feelings = document.getElementById('feelings').value;
        apiWeatherData.time = allData.dt;  // time in ms
        apiWeatherData.tempMax = allData.main.temp_max;
        apiWeatherData.tempMin = allData.main.temp_min;
        lastEpochApiFetch = allData.dt;
        lastZipUsed = document.getElementById('zip').value;

        return apiWeatherData;
    } catch(error) {
        console.log("catchError", error)
    }
}


//store last updated time in the server
// POST request to server with current time

const updateWeatherData = async (url, data={} ) => {
	const response = await fetch( url, {
		method: 'POST', 
      	credentials: 'same-origin',
      	headers: {
          'Content-Type': 'application/json',
      	},
      	body: JSON.stringify(data)
    });

    try {
        return data;
    } catch(error) {
        console.log(`Error: ${error}`);
    }
}

//
const displayWeather = async (days) => {
    const request = await fetch('/weather');
    try{
      const weatherData = await request.json();
      
      document.getElementById('date').innerHTML = 'Date:';
      document.getElementById('date-value').innerHTML = `${weatherData.date}`;
      document.getElementById('temp').innerHTML = 'Temp:';
      document.getElementById('temp-value').innerHTML = `${weatherData.temperature}`;
      document.getElementById('content').innerHTML = 'Feelings:';
      document.getElementById('content-value').innerHTML = `${weatherData.feelings}`;
    }catch(error){
      console.log("error", error);
    }
  }

const useUpdatedFeelings = async () => {
    document.getElementById('content-value').innerHTML = `${document.getElementById('feelings').value}`;
}


function performClickAction(event){
    // validate first
    if (ValidateInput() ) {

        if( isMinTimeToFetchElapsed() ) {
            // fetch API
            const zipCode =  'zip=' + document.getElementById('zip').value + ',us&';
        
            const urlString = baseUrl + zipCode + units + apiKey;
            
            // promises chain
            getWeatherData(urlString)
            .then ( (fetechData) => {
                    if(! fetechData ) {
                        throw new Error(`${fetchError}`);
                    }
                    updateWeatherData('/updateWeather', fetechData );
                })
            .then ( (storedData) => {
                    displayWeather(1);
                })
            .catch((error) => {
                    console.log(`${error}`);

                    if( error.toString() === 'Error: city not found' ) {
                        const zipElement = document.getElementById('zip');
                        const elementsWithError = [];
                        elementsWithError.push(zipElement);
                        displayErrorMessage(elementsWithError);
                    }
                });
        } else {
            // get last fetched data
            displayWeather(1).then ( () => {
                useUpdatedFeelings();
            });
        }
    }
}

const actionContainer = document.getElementById('actionContainer');
actionContainer.addEventListener('click', (event) => {
    // to capture clicks on buttons only
    if( event.target.id === 'history' ) {
        displayHistory();
    } 
    if( event.target.id === 'generate' ) {
        performClickAction();
    } 
});

const displayHistory = async (days) => {
    
    const response = await fetch('/weatherHistory');
    try{
      const historyData = await response.json();
    
      let maxTemp = historyData[0].tempMax;
      let minTemp = historyData[0].tempMin;
      oldestDate = historyData[0].date;
      newestDate = historyData[historyData.length-1].date;
      for( entry of historyData) {
        maxTemp = getMaxValue(maxTemp, entry.tempMax);
        minTemp = getMinValue(minTemp, entry.tempMin);
      }
      document.getElementById('dateRange').innerHTML = 'Date:';
      document.getElementById('dateRange-value').innerHTML = `${oldestDate} to ${newestDate}`;
      document.getElementById('tempMax').innerHTML = 'Max:';
      document.getElementById('tempMax-value').innerHTML = `${maxTemp}`;
      document.getElementById('tempMin').innerHTML = 'Min:';
      document.getElementById('tempMin-value').innerHTML = `${minTemp}`;
       
    }catch(error){
      console.log("error", error);
    }
  }

function getMaxValue (firstValue, secondValue) {
    if(firstValue >= secondValue) {
        return firstValue;
    } else { 
        return secondValue;
    }
}

function getMinValue (firstValue, secondValue) {
    if(firstValue <= secondValue) {
        return firstValue;
    } else { 
        return secondValue;
    }
}

function  ValidateInput(){
    let invalidInput = false;
    const elementsWithError = [];

    if( isErrorMessageDisplayed ){
        cleanUpErrorMessages();
    }
    const zipElement = document.getElementById('zip');
    const zipCode =  zipElement.value;
    
    if (zipCode.length < 5) {       //empty or short 
        invalidInput = true;
        elementsWithError.push(zipElement);
    }
    const feelingsElement = document.getElementById('feelings');
    const feelings =  feelingsElement.value;
    if (feelings.length < 1) {
        invalidInput = true;
        elementsWithError.push(feelingsElement);
    }
    
    if (invalidInput) {
        displayErrorMessage(elementsWithError);
        return false;
    } else return true;
}

function displayErrorMessage(elements) {
    for (element of elements) {
        element.placeholder = element.placeholder;
        additionalHelpMessage = '';
        if(element.id === 'zip'){
            additionalHelpMessage = `<a href="https://www.unitedstateszipcodes.org/" 
                                            target="_blank">Check ZIP guide</a>`;
        }
        let parentElement = element.parentElement;
        let newElement = document.createElement('span');
        newElement.id = `${element.id}-error`;
        newElement.innerHTML = `* Error: please enter a valid ${element.id} input. ${additionalHelpMessage}`;
        newElement.className = 'error__message';
        parentElement.appendChild(newElement);

        isErrorMessageDisplayed = true;
    }
}

function cleanUpErrorMessages() {    
    if ( document.getElementById('zip-error') ) {
        document.getElementById('zip-error').remove();
    }
    if ( document.getElementById('feelings-error') ) {
        document.getElementById('feelings-error').remove();
    }
    isErrorMessageDisplayed = false;
    fetchError = '';
}

// Check if min 10 min elapsed since last API fetch 
// to comply with Open Weather Map's constraint
function isMinTimeToFetchElapsed() {
    const minTimeToFetch = 600000;   // 10 min in milli-sec

    let d = new Date();
    const currentEpochTime = d.getTime();

    if ( (currentEpochTime - (lastEpochApiFetch * 1000) ) > minTimeToFetch ||
            lastZipUsed !== document.getElementById('zip').value ) {
        return true;
    } else { 
        return false
    }
}