/**
 * Product API
 * ------------
 * content-required.js - This file ensures that controller will get data if they need them.
 */

'use strict';

const messages = require('../constants/messages');
const codes = require('../constants/codes');


module.exports = function (error, req, res, next) {
    if (req.method == 'GET' || (!error && req.body != undefined))
        next(); // allow user to proceed
    else 
        res.status(400).json({code: codes.CONTENT_REQUIRED, message: messages.CONTENT_REQUIRED});
};