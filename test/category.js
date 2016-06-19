/**
 * Product API UNIT TESTING
 * ------------------------
 * category.js - This test will check whether category endpoint is working as expected
 */

var should = require('should');
var request = require('supertest');
var config = require('./test-config');
const codes = require('../constants/codes');


describe('Category Endpoints', function() {

    var test_categories = []; // contains IDs of root categories (would be used in other tests)
    var test_product_id = undefined; // contains test product id that is used in test
    

    // Test endpoint that creates categories
    describe('PUT /category', function() {

        // #1 Test with invalid data requests
        describe('Requests with Invalid Data', function() {

            it('should not create category without name', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/category')
                    .send({})
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.should.have.property('name');
                        res.body.errors.should.not.have.property('parent');

                        return done();
                    });
            });

            it('should not create category with invalid parent id', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/category')
                    .send({
                        name: 'Pakaian Casual',
                        description: 'Koleksi pakaian kasual',
                        parent: '555555c55a777b1111a99999' // this is an invalid parent id
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.should.not.have.property('name');
                        res.body.errors.should.have.property('parent');

                        return done();
                    });
            });

            it('should not create category with empty name', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/category')
                    .send({
                        name: '', // empty name (string with length of 0)
                        description: 'Ini adalah deskripsi aja...'
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.should.have.property('name');
                        res.body.errors.should.not.have.property('parent');

                        return done();
                    });
            });

            it('should not create category with invalid name and invalid parent id', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/category')
                    .send({
                        name: '', // string with length of 0
                        description: 'Koleksi pakaian kasual',
                        parent: '555555c55a777b1111a99999' // this is an invalid parent id
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.should.have.property('name');
                        res.body.errors.should.have.property('parent');

                        return done();
                    });
            });

        });

        // 2# Root Category Creation
        describe('Root Category Creation (categories without parent)', function() {

            it('should create category with name and description', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/category')
                    .send({
                        name: 'Celana',
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
                        return done();
                    });
            });

            it('should create category with name but without description', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/category')
                    .send({
                        name: 'Pakaian'
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

        describe('Child Category Creation (level 1, 2, etc ...)', function() {

            it('should create category with valid parent #1 [Level 1]', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/category')
                    .send({
                        name: 'Celana Jeans',
                        description: 'Koleksi celana jeans paling lengkap dan update',
                        parent: test_categories[0]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);
                        res.body.should.not.have.property('errors');

                        res.body.category.description.should.equal('Koleksi celana jeans paling lengkap dan update');
                        res.body.category.name.should.equal('Celana Jeans');
                        res.body.category.parent.should.equal(test_categories[0]);

                        test_categories.push(res.body.category._id);
                        return done();
                    });
            });

            it('should create category with valid parent #2 [Level 1]', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/category')
                    .send({
                        name: 'Kaos',
                        description: 'Koleksi macam-macam kaos',
                        parent: test_categories[1]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);
                        res.body.should.not.have.property('errors');

                        res.body.category.description.should.equal('Koleksi macam-macam kaos');
                        res.body.category.name.should.equal('Kaos');
                        res.body.category.parent.should.equal(test_categories[1]);

                        test_categories.push(res.body.category._id);
                        return done();
                    });
            });

            it('should create category with valid parent #1-1 [Level 2]', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/category')
                    .send({
                        name: 'Jeans Levis',
                        description: 'Koleksi jeans merek levis',
                        parent: test_categories[2]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);
                        res.body.should.not.have.property('errors');

                        res.body.category.description.should.equal('Koleksi jeans merek levis');
                        res.body.category.name.should.equal('Jeans Levis');
                        res.body.category.parent.should.equal(test_categories[2]);

                        test_categories.push(res.body.category._id);
                        return done();
                    });
            });

            it('should create category with valid parent #1-1-1 [Level 3]', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/category')
                    .send({
                        name: 'Jeans Levis USA',
                        description: 'Koleksi jeans merek levis yang dibuat di USA',
                        parent: test_categories[4]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);
                        res.body.should.not.have.property('errors');

                        res.body.category.description.should.equal('Koleksi jeans merek levis yang dibuat di USA');
                        res.body.category.name.should.equal('Jeans Levis USA');
                        res.body.category.parent.should.equal(test_categories[4]);

                        test_categories.push(res.body.category._id);
                        return done();
                    });
            });

        });

    });



    // Test endpoint that retreive categories
    describe('GET /category/:categoryId', function() {

        it('should retreive category with a child, a grand children and a grand grand children', function(done) {
            request(config.HTTP_ADDRESS)
                .get('/category/' + test_categories[0]) // the first root category we've created before
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    res.body.code.should.equal(codes.OPERATION_SUCCESS);
                    res.body.should.not.have.property('errors');

                    res.body.category.description.should.equal('Koleksi celana paling lengkap dan update');
                    res.body.category.name.should.equal('Celana');
                    res.body.category.should.not.have.property('parent');

                    res.body.category.children[0]._id.should.equal(test_categories[2]); // children
                    res.body.category.children[0].children[0]._id.should.equal(test_categories[4]); // grand children
                    res.body.category.children[0].children[0].children[0]._id.should.equal(test_categories[5]); // grand grand children

                    return done();
                });
        });

        it('should retreive category with no children', function(done) {
            request(config.HTTP_ADDRESS)
                .get('/category/' + test_categories[5])
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    res.body.code.should.equal(codes.OPERATION_SUCCESS);
                    res.body.should.not.have.property('errors');

                    res.body.category.description.should.equal('Koleksi jeans merek levis yang dibuat di USA');
                    res.body.category.name.should.equal('Jeans Levis USA');
                    res.body.category.parent.should.equal(test_categories[4]);

                    res.body.category.should.have.property('children').with.lengthOf(0);

                    return done();
                });
        });

        it('should not retreive category with invalid ID', function(done) {
            request(config.HTTP_ADDRESS)
                .get('/category/57641c53dc6bb4e011231771') // the first root category we've created before
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(400)
                .end(function (err, res) {
                    if (err) return done(err);

                    res.body.code.should.equal(codes.REFERENCE_ERROR);
                    return done();
                });
        });

        it('should get error on invalid ID Format', function(done) {
            request(config.HTTP_ADDRESS)
                .get('/category/123') // the first root category we've created before
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(500)
                .end(function (err, res) {
                    if (err) return done(err);

                    res.body.code.should.equal(codes.OPERATION_ERROR);
                    res.body.errors.name.should.equal('CastError');
                    return done();
                });
        });
    });


    // Test endpoint that updates categories
    describe('POST /category/:categoryId', function() {

        // #1 Test with invalid data requests
        describe('Requests with Invalid Data', function() {

            it('should not update category with invalid name', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/category/' + test_categories[5])
                    .send({
                        name: ''
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.name.name.should.equal('ValidatorError');
                        return done();
                    });
            });

            it('should not update category with invalid parent', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/category/' + test_categories[5])
                    .send({
                        parent: '5555e8888a66a2222f2d2222'
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.parent.name.should.equal('ValidatorError');
                        return done();
                    });
            });

            it('should not update category with invalid name and parent', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/category/' + test_categories[5])
                    .send({
                        name: '',
                        parent: '5555e8888a66a2222f2d2222'
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.name.name.should.equal('ValidatorError');
                        res.body.errors.parent.name.should.equal('ValidatorError');
                        return done();
                    });
            });

        });


        // #2 Test with valid data requests
        describe('Requests with Valid Data', function() {

            it('should update category with valid parent', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/category/' + test_categories[5])
                    .send({
                        parent: test_categories[2]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);
                        res.body.details.nModified.should.equal(1);
                        return done();
                    });
            });

            it('should update category with valid name', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/category/' + test_categories[5])
                    .send({
                        name: 'Pakaian Oke'
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);
                        res.body.details.nModified.should.equal(1);
                        return done();
                    });
            });

            it('should update category with valid description', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/category/' + test_categories[5])
                    .send({
                        description: 'Pakaian Oke dan Keren'
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);
                        res.body.details.nModified.should.equal(1);
                        return done();
                    });
            });

            it('should update category with valid name and description', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/category/' + test_categories[5])
                    .send({
                        name: 'Pakaian Oke Banget',
                        description: 'Pakaian Oke dan Keren Banget'
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);
                        res.body.details.nModified.should.equal(1);
                        return done();
                    });
            });

            it('should update category with valid parent and description', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/category/' + test_categories[5])
                    .send({
                        parent: test_categories[4],
                        description: 'Pakaian Oke dan Keren Bangets'
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);
                        res.body.details.nModified.should.equal(1);
                        return done();
                    });
            });

            it('should update category with valid name, parent, and description', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/category/' + test_categories[5])
                    .send({
                        name: 'Pakaian TerOKE',
                        parent: test_categories[2],
                        description: 'Pakaian Oke dan Keren Banget'
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);
                        res.body.details.nModified.should.equal(1);
                        return done();
                    });
            });

        });

    });

    // Test endpoint that get products in categories
    describe('GET /category/:categoryId/products', function() {
        before(function(done) {
            // we need to create some products in the category to test deletion constraint
            request(config.HTTP_ADDRESS)
                .put('/product')
                .send({
                    "name": "Levi's Jaket Hitam",
                    "color": "black",
                    "size": "M",
                    "price": 500000,
                    "description": "123",
                    "categories": [test_categories[5], test_categories[4]]
                })
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.code.should.equal(codes.OPERATION_SUCCESS);

                    test_product_id = res.body.product._id;
                    request(config.HTTP_ADDRESS)
                        .put('/product')
                        .send({
                            "name": "Levi's Jaket Cokelat",
                            "color": "brown",
                            "size": "L",
                            "price": 500000,
                            "description": "Haha hihi",
                            "categories": [test_categories[2]]
                        })
                        .set('API-KEY', config.TEST_VALID_API_KEY)
                        .expect(200)
                        .end(function (err, res) {
                            if (err) return done(err);
                            res.body.code.should.equal(codes.OPERATION_SUCCESS);
                            return done();
                        });
                });
        });

        it('should get zero products from empty category', function(done) {
            request(config.HTTP_ADDRESS)
                .get('/category/' + test_categories[3] + '/products')
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    res.body.code.should.equal(codes.OPERATION_SUCCESS);
                    res.body.should.have.property('products').with.lengthOf(0);
                    return done();
                });
        });

        it('should get one products from category that contains one product', function(done) {
            request(config.HTTP_ADDRESS)
                .get('/category/' + test_categories[4] + '/products')
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    res.body.code.should.equal(codes.OPERATION_SUCCESS);
                    res.body.should.have.property('products').with.lengthOf(1);
                    return done();
                });
        });

        it('should get one products from category that contains one product', function(done) {
            request(config.HTTP_ADDRESS)
                .get('/category/' + test_categories[5] + '/products')
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    res.body.code.should.equal(codes.OPERATION_SUCCESS);
                    res.body.should.have.property('products').with.lengthOf(1);
                    return done();
                });
        });

        it('should get one products from category that contains one product', function(done) {
            request(config.HTTP_ADDRESS)
                .get('/category/' + test_categories[2] + '/products')
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    res.body.code.should.equal(codes.OPERATION_SUCCESS);
                    res.body.should.have.property('products').with.lengthOf(1);
                    return done();
                });
        });


    });


    // Test endpoint that deletes categories
    describe('DELETE /category/:categoryId', function() {

        describe('Request with Invalid Data', function() {

            it('should get reference error on missing input id reference', function(done) {
                request(config.HTTP_ADDRESS)
                    .delete('/category/555555c55a777b1111a99999')
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.REFERENCE_ERROR);
                        return done();
                    });
            });

            it('should get cast error on invalid id format', function(done) {
                request(config.HTTP_ADDRESS)
                    .delete('/category/123')
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(500)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_ERROR);
                        res.body.errors.name.should.equal('CastError');
                        return done();
                    });
            });

        });

        describe('Prevent Delete because Data Integrity Violation', function() {

            it('should not delete category that has sub category', function(done) {
                request(config.HTTP_ADDRESS)
                    .delete('/category/' + test_categories[2])
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.DEPENDENCY_ERROR_CHILD);
                        return done();
                    });
            });

            it('should not delete category that has product', function(done) {
                request(config.HTTP_ADDRESS)
                    .delete('/category/' + test_categories[5])
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.DEPENDENCY_ERROR_PRODUCT);
                        return done();
                    });
            });

        });

        describe('Delete Empty Category', function() {

            before(function(done) {
                request(config.HTTP_ADDRESS)
                    .delete('/product/' + test_product_id)
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);
                        return done();
                    });
            });

            it('should delete category that has no child and product #1', function(done) {
                request(config.HTTP_ADDRESS)
                    .delete('/category/' + test_categories[5])
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);
                        return done();
                    });
            });

            it('should delete category that has no child and product #2', function(done) {
                request(config.HTTP_ADDRESS)
                    .delete('/category/' + test_categories[4])
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);
                        return done();
                    });
            });

        });

    });

});