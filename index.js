const express = require('express');
const app = express();
const path = require('path');
let flags = require('flags');
let data = require('./data/bookings.json'); // mock db data

flags.defineBoolean('dev');
flags.parse();
let dev = !!flags.get('dev') ? true : false;

app.get('/api/bookings', ( req, res, next) => {
    res.send(data);
});

if (!dev) {
    console.log("Starting Production Mode");
    app.use('', express.static(path.join(__dirname, 'public/dist')));
}

app.listen(3000, () => {
    console.log('Testing app listen on http://localhost:3000/');
});