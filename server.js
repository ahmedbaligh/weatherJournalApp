// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
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
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Server Setup
const port = process.env.PORT || 8000;
const server = app.listen(port, () => console.log(`server is listening on port ${port}...`));

// Callback function to complete GET '/all'
app.get('/all', (req, res, next) => {
    res.status(200).send(projectData);
});

// Post Route
app.post('/all', (req, res, next) => {

    projectData = {
        time: req.body.time,
        date: req.body.date,
        temp: req.body.temperature,
        userFeelings: req.body.userFeelings
    };

    console.log(projectData);

    res.status(200).send({
        sucess: true,
        message: "Data saved successfully",
        data: projectData
    });
});
  