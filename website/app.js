/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = 'f530a6ab60a4482d226486e2da8867a4&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

// Async GET request
const getWeather = async (baseURL, zip, key) => {
    const res = await fetch(`${baseURL}${zip}&appid=${key}`);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

// Async POST request
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// Callback function for generate button
function performActionOnGenerateButtonClick(event) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(baseURL, zip, apiKey)
        .then(data => {
            // Add data to POST request
            postData('/add', { temperature: data.main.temp, date: newDate, userResponse: feelings })
                .then(() => {
                    // Update UI
                    retrieveData();
                });
        });
}

// Call postData function when generate button is clicked
// Event listener for generate button
document.getElementById('generate').addEventListener('click', () => {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeather(baseURL, zip, apiKey)
        .then(data => {
            postData('/add', {
                temperature: data.main.temp,
                date: newDate,
                userResponse: feelings
            });
        })
        .then(retrieveData);
});

//Reference: https://review.udacity.com/#!/rubrics/4671/view (Dynamically Update UI section)
//Function to GET Project Data
const retrieveData = async () => {
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        //console.log(allData)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = `Temperature: ${Math.round(allData.temperature)} &#8457`;
        document.getElementById('content').innerHTML = `Feeling: ${allData.userResponse}`;
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    }
    catch (error) {
        console.log('error', error);
        // Display error message to user
        const errorDiv = document.createElement('div');
        errorDiv.id = 'error';
        errorDiv.innerHTML = 'An error occurred. Please try again.';
        document.getElementById('app').appendChild(errorDiv);
    }
}
