/**
 * Product API
 * ------------
 * apisecurity.js - This file implements simple security method to secure Product API.
 */

module.exports = {
    // negative status codes
    UNAUTHORIZED : 99,      // user unauthorized to access api
    VALIDATION_ERROR: 98,   // user's input did not pass validation process
    REFERENCE_ERROR: 97,    // user reference (object id) not found (caused by invalid id input)
    CONTENT_REQUIRED: 96,   // user input broken content (missing or broken json format)
    OPERATION_ERROR: 95,    // unknown error during operation
    DEPENDENCY_ERROR_CHILD: 94,
    DEPENDENCY_ERROR_PRODUCT: 93,

    // positive status codes
    OPERATION_SUCCESS: 0,   // operation successfully executed
};