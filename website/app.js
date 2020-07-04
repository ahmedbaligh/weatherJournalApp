// OpenWeatherMap endpoints
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&';
const apiKey = 'd7736f0b7b294b5682b14666b9cc5d83';

// Selecting needed DOM elements' values
const zip = document.querySelector('#zip');
const feelings = document.querySelector('#feelings');
const form = document.querySelector('form');
const responseContainer = document.querySelector('.responseContainer');

// Adding an event to listen to a user's submit
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let zipCode = zip.value;
    responseContainer.innerHTML = '';

    // Get Request
    fetch(`${baseURL}zip=${zipCode}&appid=${apiKey}`)
    .then(response => response.json()) // parsing fetched data
    .then(getData)
    .then(postData)
    .then(updateUI)
    .catch(err => requestError(err, 'requesting')); 
});

//  Getting Needed Data from the API and also locally
async function getData(parsedData) {

    // Get current temperature
    let temp = parsedData.main.temp;

    // User Feelings input
    let userFeelings;

    // Check if the user entered their feelings
    if (feelings.value.length > 0) {
        userFeelings = `<p>You're feeling: ${feelings.value}</p>`;
    } else {
        userFeelings = '';
    };
    
    // Get current date and time
    let d = new Date();
    let timeNow = `${d.getHours()}:${d.getMinutes()}`;
    let dateNow = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;

    const data = {
        time: timeNow,
        date: dateNow,
        temperature: temp,
        userFeelings: userFeelings
    };

    return data;
}

// Post Request
async function postData(data) {
    await fetch('/all', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).catch(err => requestError(err, 'saving'))
    return data;
}

// Updating the UI Dynamically
function updateUI(data) {
    const htmlContent = `<p>Temperature: ${data.temperature} °C</p>
    <p>Time: ${data.time}</p>
    <p>Date: ${data.date}</p>
    ${data.userFeelings}`;

    responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
}
// Handling Error
function requestError(e, doing) {
    console.log(e);
    responseContainer.insertAdjacentHTML('beforeend', `<p class="net-warning">Oh no! An error happened, while ${doing} your data.</p>`);
}