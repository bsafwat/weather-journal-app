/* Global Variables */
// openWeatherMap.org API
// const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?';
/*
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const apiId = 'id=524901&';
const cityParam = 'q=Cairo,eg&units=metric&';
const apiKey = 'appid=467cdc0273a13eefe43d0ca35ff041f2';
*/

// call by ZIP example
// http://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid={API key}
//
// http://api.openweathermap.org/data/2.5/weather?zip=94040,us&units=metric&appid=467cdc0273a13eefe43d0ca35ff041f2


const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?';
const units = 'units=metric&';
const apiKey = 'appid=467cdc0273a13eefe43d0ca35ff041f2';
let lastEpochApiFetch = 100;
let lastZipUsed = '00000';
let fetchError = '';
// let apiWeatherData = {date: "01.01.2021", temperature: 0, feelings: "a" };

// Create a new date instance dynamically with JS
let d = new Date();
let currentTime = d.getTime();
let newDate = d.getDate() +'.'+ (d.getMonth() + 1) +'.'+ d.getFullYear();
console.log(`Current date: ${newDate}`);

let isErrorMessageDisplayed = false;

const getWeatherData = async (url) => {

	const response = await fetch(url);    
    try {
        const allData = await response.json();

        // check fetched data
        
        if (allData.cod !== 200) {
            // alert(`Error: ${allData.message}`);
            fetchError = `${allData.message}`;
            return undefined;
            // throw new Error(`myError: ${allData.message}`);
        }
        

        console.log(allData);
        console.log(`main: ${allData.main.temp}`);
        console.log(`time in ms: ${allData.dt}`);
        //
        const apiWeatherData = {};
        apiWeatherData.date = newDate;
        apiWeatherData.temperature = allData.main.temp;
        apiWeatherData.feelings = document.getElementById('feelings').value;
        apiWeatherData.time = allData.dt;  // time in ms
        lastEpochApiFetch = allData.dt;
        lastZipUsed = document.getElementById('zip').value;
        console.log(`weather data is: ${apiWeatherData.temperature}`);
        console.log('returned date from get will be:' , apiWeatherData);
        // check ??
        // return allData;
        return apiWeatherData;
    } catch(error) {
        console.log("catchError", error)
    }
}


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
        // const responseData = await response.json();
        console.log('Response is : ', response);
        console.log('within POST: ', data);
        // console.log('within POST: ', responseData.temperature);
        // return newData;
        return data;
    } catch(err) {
        console.log(`Error: ${err}`);
    }
}

//
const displayWeather = async (days) => {
    // const request = await fetch('/weatherAll');
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

//store last updated time in the server
// POST request to server with current time

function performClickAction(event){
    // validate first
    if (ValidateInput() ) {

        if( isMinTimeToFetchElapsed() ) {
            // fetch
            console.log("I will fetch !")
                
            const zipCode =  'zip=' + document.getElementById('zip').value + ',us&';
            console.log(`zip code is: ${zipCode}`);
        
            const urlString = baseUrl + zipCode + units + apiKey;
            console.log(`URL is: ${urlString}`);
            
            // cascading promises
            getWeatherData(urlString)
            .then ( (fetechData) => {
                    if(! fetechData ) {
                        // throw new Error(`myError: ${allData.message}`);
                        throw new Error(`${fetchError}`);
                    }
                    console.log('what passed to me is' , fetechData);
                    updateWeatherData('/updateWeather', fetechData );
                })
            .then ( (storedData) => {
                    console.log('stored data passed to me is:' , storedData);
                    displayWeather(1);
                })
            .catch((error) => {
                    console.log('Chain broken in normal console!');
                    console.log(`${error}`);
                    console.error('Chain broken on std-err!');

                    if( error.toString() === 'Error: city not found' ) {
                        const zipElement = document.getElementById('zip');
                        const elementsWithError = [];
                        elementsWithError.push(zipElement);
                        displayErrorMessage(elementsWithError);
                    }
                    
                    
                });
        } else {
            // get last fetched data
            console.log("Got last data");
            displayWeather(1).then ( () => {
                useUpdatedFeelings();
            });
             
            
        }
        

    }
}

const generateButton = document.getElementById('generate');
generateButton.addEventListener('click', performClickAction );


function  ValidateInput(){
    let invalidInput = false;
    const elementsWithError = [];

    if( isErrorMessageDisplayed ){
        cleanUpErrorMessages();
    }

    const zipElement = document.getElementById('zip');
    // const zipCode =  document.getElementById('zip').value;
    const zipCode =  zipElement.value;
    
    if (zipCode.length < 5) {       //empty or short 
        // alert('please enter a ZIP code');
        // displayErrorMessage(zipElement);
        invalidInput = true;
        elementsWithError.push(zipElement);
        // return false;
    }
    
    // const feelings = document.getElementById('feelings').value;
    const feelingsElement = document.getElementById('feelings');
    const feelings =  feelingsElement.value;
    if (feelings.length < 1) {
        //  alert('please enter your feelings today');
        // displayErrorMessage(feelings);
        // return false;
        invalidInput = true;
        elementsWithError.push(feelingsElement);
    }
    
    if (invalidInput) {
        displayErrorMessage(elementsWithError);
        return false;
    } else return true;
}

// function displayErrorMessage(element) {
function displayErrorMessage(elements) {
    console.log(elements);
    for (element of elements) {
        console.log('element is :', element);
        element.placeholder = element.placeholder;
        additionalHelpMessage = '';
        if(element.id === 'zip'){
            additionalHelpMessage = `<a href="https://www.unitedstateszipcodes.org/" 
                                            target="_blank">Check ZIP guide</a>`;
        }
        let parentElement = element.parentElement;
        console.log('parent is :', element.parentElement);

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