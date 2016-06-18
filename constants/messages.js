/**
 * Product API
 * ------------
 * apisecurity.js - This file implements simple security method to secure Product API.
 */

module.exports = {
    // negative/error messages
    INVALID_API_KEY : 'The provided API Key is not valid',
    VALIDATION_ERROR : 'The requested operation did not pass validation process. Please check request parameters.',
    REFERENCE_ERROR: 'The reference (ID) that is broken/missing.',
    CONTENT_REQUIRED: 'The request operation did not contains required content.',
    OPERATION_ERROR: 'Unknown error occured during operation.',
    DEPENDENCY_ERROR_CHILD: 'The requested still has child(ren).',
    DEPENDENCY_ERROR_PRODUCT: 'The requested still has product(s).',

    // positive/success messages
    OPERATION_SUCCESS : 'The requested operation executed successfully.',
};