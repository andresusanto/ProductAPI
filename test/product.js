/**
 * Product API UNIT TESTING
 * ------------------------
 * product.js - This test will check whether product endpoint is working as expected
 */

var should = require('should');
var request = require('supertest');
var config = require('./test-config');
const codes = require('../constants/codes');


describe('Category Endpoints', function() {
    var test_categories = [];

    // we need to create some category first
    before(function(done) {
        request(config.HTTP_ADDRESS)
            .put('/category')
            .send({
                name: 'Pakaian',
                description: 'Koleksi celana paling lengkap dan update',
            })
            .set('API-KEY', config.TEST_VALID_API_KEY)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);

                res.body.code.should.equal(codes.OPERATION_SUCCESS);
                res.body.should.not.have.property('errors');

                res.body.category.description.should.equal('Koleksi celana paling lengkap dan update');
                res.body.category.name.should.equal('Celana');

                test_categories.push(res.body.category._id);

                request(config.HTTP_ADDRESS)
                    .put('/category')
                    .send({
                        name: 'Pakaian Outdoor',
                        parent: test_categories[0]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);
                        res.body.should.not.have.property('errors');

                        res.body.category.should.not.have.property('description');
                        res.body.category.name.should.equal('Pakaian');

                        test_categories.push(res.body.category._id);
                        return done();
                    });

            });
    });
});