/**
 * Product API UNIT TESTING
 * ------------------------
 * test-config.js - Configuration that is used for testing purpose
 */

module.exports = {
    HTTP_ADDRESS : 'http://localhost:3000',
    TEST_VALID_API_KEY : 'YW5kcmUgc3VzYW50byBnYW50ZW5nIGJhbmdldA==',
    TEST_INVALID_API_KEYS_NUM : 2, // numbers of invalid keys that would be generated to test the api
    TEST_ENDPOINTS: [ // we should check all endpoints for invalid api keys
        {method: 'POST', endpoint: '/products'},
        {method: 'PUT', endpoint: '/product'},
        {method: 'POST', endpoint: '/product/YW5kcmUgc3VzYW'},
        {method: 'DELETE', endpoint: '/product/YW5kcmUgc3VzYW'},
        {method: 'GET', endpoint: '/product/YW5kcmUgc3VzYW'},
        {method: 'GET', endpoint: '/categories'},
        {method: 'PUT', endpoint: '/category'},
        {method: 'POST', endpoint: '/category/YW5kcmUgc3VzYW'},
        {method: 'DELETE', endpoint: '/category/YW5kcmUgc3VzYW'},
        {method: 'GET', endpoint: '/category/YW5kcmUgc3VzYW'},
        {method: 'GET', endpoint: '/category/YW5kcmUgc3VzYW/products'},
    ]
};