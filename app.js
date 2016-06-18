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
var apiSecurity = require('./middlewares/api-security');


app.use(apiSecurity);
app.use(routes);

// connect to database
mongoose.connect(process.env.DBURL, {user: process.env.DBUSER, pass: process.env.DBPASS});

// start server
app.listen(3000, function () {
    console.log('ProductAPI server started ...');
});
