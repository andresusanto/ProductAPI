// /**
//  * Product API UNIT TESTING
//  * ------------------------
//  * content-required.js - This test will check whether content required middleware successfully block missing content/broken format inputs
//  */
//
// var should = require('should');
// var request = require('supertest');
// var config = require('./test-config');
// const codes = require('../constants/codes');
//
//
// describe('Content-Required (middleware)', function() {
//
//     // this test would only check blocking/error that content-required middleware produce as the other test
//     // would determine if content-required middleware successfully pass requests if it is valid.
//
//     // #1 test to ensure that content-required would block request that contain broken (which was required) body request
//     describe('[Broken Request Body]', function() {
//         config.TEST_ENDPOINTS.forEach(function(endpoint){
//             it('should block user to access ' + endpoint.method + ' ' + endpoint.endpoint, function(done) {
//                 var req = request(config.HTTP_ADDRESS);
//
//                 if (endpoint.method == 'GET') return done(); // get request never contains request body
//                 else if (endpoint.method == 'POST') req = req.post(endpoint.endpoint);
//                 else if (endpoint.method == 'PUT') req = req.put(endpoint.endpoint);
//                 else if (endpoint.method == 'DELETE') return done(); // this api did not require content body for delete requests
//
//
//                 req.field('broken', 'request').set('API-KEY', config.TEST_VALID_API_KEY).expect(400)
//                 .end(function (err, res) {
//                     if (err) return done(err);
//                     res.body.code.should.equal(codes.CONTENT_REQUIRED);
//                     return done();
//                 });
//             });
//         });
//     });
// });