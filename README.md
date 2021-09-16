# Weather-Journal App

## Extras
If you are interested in testing your code as you go, you can use `tests.js` as a template for writing and running some basic tests for your code.


## Table of Contents

* [Overview](#overview)
* [Technical Description](#desc)
* [Instruction](#instruction)
* [Architucture and Features](#architucture)
* [Areas for improvement](#improvement)
* [Thanks](#thanks)

## Overview {#overview}
Weather-Journal App is a simple app to fetch weather data from Open Weather Map API. Users can retrieve timely detailed weather data as well as viewing a statistical history of the past seven days with the maximum and minimum temperature degrees during that week. 
<br>
<br>
[(Back to top)](#title)

## Technical Description {#desc}

Weather-Journal App is an asynchronous one-page web application that uses Open Weather Map's Web API so that users can request timely weather in their locations by providing a ZIP code. Users are also able to provide their daily feelings and associate them with the weather data. Both types of Data; weather data and users' feelings are used to dynamically update the UI.<br>
<br>
The application uses Express, Body-Parser, and CORS modules in order to implement the main functionality of fetching weather data from Open Weather Map's Web API, storing data in local data structures, and to update UI with retrieved data from those local structures. these functionality have been fulfilled using standard GET and POST methods and Fetch function.<br>
Git and GitHub were used for version controlling while developing the application.<br>
<br>
Promises chain technique is implemented for the integiry of fetching data, storing data, and to update UI with that data.<br>
<br>
Accordings to the recommendation from Open Weather Map, the application updates weather data from the Web API with minimum 10 minutes interval between any successive request for the SAME location (ZIP code), beacause Open Weather Map updates its data upon that interval. So, for the sake of better performance while maintaing the same level of user experience, when a user request, for example, a second request using the same ZIP code, last retrieved data from web API is used instead of get the same data again from API, however it is combined with the new feelings from that users, and UI is updated using that final combination.<br>
If the user uses a different ZIP code in his second request, the application acts normally and gets the data from the web API.<br>
<br>
As the application uses local data structure only with no database, an assumed requiremnt is applied while implementing the "History" feature, so that only one entry per day is saved in the history.<br>
<br>
As well as validating the input from the end user, errors come from Open Weather Map's web API due to using incorrect ZIP codes is also handlled and a feedback is displayed to the user with a quick help to ZIP guide.
<br>
The application was developed in two sprints. The first sprint included the setup of server side development, updating HTML structure and styles to facilitate the development techniques, implementing GET and POST methods to retrieve and store data, and fetching weather data from Open Weather Map's Web API.<br>
The second sprint included the development of input validation, different errors handling either from users or from the web API, implementing the history functionality.and the documentation.<br>
<br>
The Design, styles and features are usable across modern desktop, tablet, and phone browsers<br>
<br>
<br>
[(Back to top)](#title)

## Instructions {#instruction} 

- Download and install Node.js from the following location https://nodejs.org/en/download .
- Install Express, Body-parser and Cors packages using npm utility.  $ npm install \<package_name\> .
- The application's server side listen to port 8099, so make sure it is available on your local machine.
- clone the code from GitHub from the following address https://github.com/bsafwat/weather-journal-app .
- From  within your shell/command window, start the application's server by executing the following command  $ node server.js
- Start your favorite browser and type in the following address http://localhost:8099
- Type in a valid ZIP code (5-digit long) as well as your todays's feelings and then click on "Generate" button to dispaly the current weather details in the area of that ZIP code.
- click on "History" button to dispaly the max and min temperature measured degrees during last week.
<br>
<br>
[(Back to top)](#title)


## Architucture and Features {#architucture}

- ### Architectural overview

- Asynchronous one-page web application with both client and server sides.
- Promises chain technique is implemented for the integiry of fetching data, storing data, and to update UI with that data.
- The concept of micro services is applied for clearer architecture and efficient code.  
- The design of functions aimed to let them re-usable easily to implement different features. 
- Minimum Event Listener have been added to have a cleaner code and better performance, e.g. one listener is added for both Generate and History buttons clicks.
- The performance is taken into consideration while fetching data from the web API.
- Clean code is used. comments is used for extra explanation of the code where the code itself is self-explanatory.

- ### Features

- Implementation using Express, Body-parser as a middleware, and Cors for cross origin allowance.
- Retrieving and storing weather data using standard GET and POST methodes.
- Fetch function to retrieve data from data sources.
- Fetch interval control.
- Displaying of current weather as well as a statistical history of last seven days.
- Input validation and errors handling.
<br>
<br>
[(Back to top)](#title)


## Known bugs {#bugs}

- In one scenario the displayed error due to missing feelings is put under the buttons.
<br>
<br>
[(Back to top)](#title)


## Thanks {#thanks}

Leave a star in GitHub.<br>
<br>
<br>
[(Back to top)](#title)