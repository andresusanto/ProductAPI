/**
 * Product API
 * ------------
 * apisecurity.js - This file implements simple security method to secure Product API.
 */

'use strict';

require('dotenv').config();
const messages = require('../constants/messages');
const codes = require('../constants/codes');


module.exports = function (req, res, next) {
    // simple security method that checks whether user has api access key or not
    if (req.get('api-key') == process.env.API_KEY)
        next(); // allow user to proceed
    else
        res.status(403).json({code: codes.UNAUTHORIZED, message: messages.INVALID_API_KEY});
};