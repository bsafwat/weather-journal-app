/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

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

  displayWeather(1);