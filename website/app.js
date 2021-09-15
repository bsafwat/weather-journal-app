/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();



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

  displayWeather(1);
  fetechData = {date: "07.09.2021", temperature: 17, feelings: "cold" };
  updateWeatherData('/updateWeather', fetechData );