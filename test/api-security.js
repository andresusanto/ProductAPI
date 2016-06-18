/**
 * Product API UNIT TESTING
 * ------------------------
 * api-security.js - This test will check whether api is secured by api-security middleware
 */

var should = require('should');
var request = require('supertest');
var config = require('./test-config');

// random function that is used to generate random api key
function randomToken() {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = 23; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

describe('API-Security', function() {

    // #1 test to ensure that api-security would allow users that have valid api key
    describe('Valid Token]', function() {
        // it only checks one endpoint as the other endpoint would be derived from other tests.
        it('should allow user to access API', function(done) {
            request(config.HTTP_ADDRESS)
                .get('/')
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(404, done);
        });
    });

    // #2 test to ensure that api-security would block users that did not have valid api keys
    describe(config.TEST_INVALID_API_KEYS_NUM +  ' Invalid Token]', function() {
        for (var i = 1; i <= config.TEST_INVALID_API_KEYS_NUM; i++){

            // generate invalid token
            var token = '';
            do {
                token = randomToken();
            }while (token == config.TEST_VALID_API_KEY); // although possibility is small, need to ensure that generated key is not same with valid key

            describe('Using invalid token #' + i + '\t: ' + token, function() {
                // it would test all endpoints as this test would not be derived from other test
                config.TEST_ENDPOINTS.forEach(function(endpoint){

                    it('should disallow user to access ' + endpoint.method + ' ' + endpoint.endpoint, function(done) {
                        var req = request(config.HTTP_ADDRESS);

                        if (endpoint.method == 'GET') req = req.get(endpoint.endpoint);
                        else if (endpoint.method == 'POST') req = req.post(endpoint.endpoint);
                        else if (endpoint.method == 'PUT') req = req.put(endpoint.endpoint);
                        else if (endpoint.method == 'DELETE') req = req.delete(endpoint.endpoint);

                        req.set('API-KEY', token).expect(403, done);
                    });

                });
            });
        }
    });
});