/**
 * Product API
 * -----------
 * Main program
 */

'use strict';

require('dotenv').config();

var express = require('express');
var app = express();
var mongoose = require('mongoose');

var routes = require('./routes');
var apisecurity = require('./middlewares/apisecurity');


app.use(apisecurity);
app.use(routes);

// start the server
mongoose.connect(process.env.DBURL, {user: process.env.DBUSER, pass: process.env.DBPASS});
app.listen(3000, function () {
    console.log('ProductAPI server started ...');
});
