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

// let apiWeatherData = {date: "01.01.2021", temperature: 0, feelings: "a" };

// Create a new date instance dynamically with JS
let d = new Date();
let currentTime = d.getTime();
let newDate = d.getDate() +'.'+ (d.getMonth() + 1) +'.'+ d.getFullYear();
console.log(`Current date: ${newDate}`);


const getWeatherData = async (url) => {

	const response = await fetch(url);    
    try {
        const allData = await response.json();
        console.log(allData);
        console.log(`main: ${allData.main.temp}`);
        console.log(`time in ms: ${allData.dt}`);
        //
        const apiWeatherData = {};
        apiWeatherData.date = newDate;
        apiWeatherData.temperature = allData.main.temp;
        apiWeatherData.feelings = document.getElementById('feelings').value;
        console.log(`weather data is: ${apiWeatherData.temperature}`);
        console.log('returned date from get will be:' , apiWeatherData);
        // check ??
        // return allData;
        return apiWeatherData;
    } catch(error) {
        console.log("Error", error)
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

  /**
   * 
   */
  // const zipCode =  'zip=' + document.getElementById('zip').value + ',us&';
  const zipCode =  'zip=' + '94040' + ',us&';
  console.log(`zip code is: ${zipCode}`);
  const urlString = baseUrl + zipCode + units + apiKey;
  console.log(`URL is: ${urlString}`);
  
  getWeatherData(urlString);

  displayWeather(1);
  fetechData = {date: "07.09.2021", temperature: 17, feelings: "cold" };
  updateWeatherData('/updateWeather', fetechData );