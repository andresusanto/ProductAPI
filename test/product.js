/**
 * Product API UNIT TESTING
 * ------------------------
 * product.js - This test will check whether product endpoint is working as expected
 */

var should = require('should');
var request = require('supertest');
var config = require('./test-config');
const codes = require('../constants/codes');


describe('Product Endpoints', function() {
    var test_categories = [];
    var test_products = [];

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

                test_categories.push(res.body.category._id);

                request(config.HTTP_ADDRESS)
                    .put('/category')
                    .send({
                        name: 'Pakaian Keren',
                        parent: test_categories[0]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);
                        res.body.should.not.have.property('errors');

                        test_categories.push(res.body.category._id);
                        return done();
                    });

            });
    });

    // Test endpoint that creates products
    describe('PUT /product', function() {

        describe('Requests with Invalid Data', function() {

            it('should not create product without name', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/product')
                    .send({
                        color: 'black',
                        size: 'M',
                        price: 500000,
                        description: '123',
                        categories: [test_categories[0]]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.should.have.property('name');
                        res.body.errors.name.name.should.equal('ValidatorError');

                        return done();
                    });
            });

            it('should not create product without color', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/product')
                    .send({
                        name: 'Baju Anti Peluru',
                        size: 'M',
                        price: 500000,
                        description: '123',
                        categories: [test_categories[0]]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.should.have.property('color');
                        res.body.errors.color.name.should.equal('ValidatorError');

                        return done();
                    });
            });

            it('should not create product without sizes', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/product')
                    .send({
                        name: 'Baju Anti Peluru',
                        color: 'black',
                        price: 500000,
                        description: '123',
                        categories: [test_categories[0]]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.should.have.property('size');
                        res.body.errors.size.name.should.equal('ValidatorError');

                        return done();
                    });
            });

            it('should not create product without correct sizes [XS, S, M, L, XL, XXL]', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/product')
                    .send({
                        name: 'Baju Anti Peluru',
                        color: 'black',
                        size: 'B',
                        price: 500000,
                        description: '123',
                        categories: [test_categories[0]]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.should.have.property('size');
                        res.body.errors.size.name.should.equal('ValidatorError');

                        return done();
                    });
            });


            it('should not create product without price', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/product')
                    .send({
                        name: 'Baju Anti Peluru',
                        color: 'black',
                        size: 'M',
                        description: '123',
                        categories: [test_categories[0]]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.should.have.property('price');
                        res.body.errors.price.name.should.equal('ValidatorError');

                        return done();
                    });
            });

            it('should not create product without numeric price', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/product')
                    .send({
                        name: 'Baju Anti Peluru',
                        color: 'black',
                        size: 'L',
                        price: 'HARGA',
                        description: '123',
                        categories: [test_categories[0]]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.should.have.property('price');
                        res.body.errors.price.name.should.equal('CastError');

                        return done();
                    });
            });

            it('should not create product without a category', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/product')
                    .send({
                        name: 'Baju Anti Peluru',
                        color: 'black',
                        size: 'L',
                        price: 100000,
                        description: '123'
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.should.have.property('categories');
                        res.body.errors.categories.name.should.equal('ValidatorError');

                        return done();
                    });
            });

            it('should not create product if suplied reference did not exist', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/product')
                    .send({
                        name: 'Baju Anti Peluru',
                        color: 'black',
                        size: 'L',
                        price: 100000,
                        description: '123',
                        categories: ['555555c55a777b1111a99999'] //id not exist
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.should.have.property('categories');
                        res.body.errors.categories.name.should.equal('ValidatorError');

                        return done();
                    });
            });

            it('should not create product without a valid category id', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/product')
                    .send({
                        name: 'Baju Anti Peluru',
                        color: 'black',
                        size: 'L',
                        price: 100000,
                        description: '123',
                        categories: '123' //this is an invalid category id
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.should.have.property('categories');
                        res.body.errors.categories.name.should.equal('CastError');

                        return done();
                    });
            });

        });

        describe('Requests with Valid Data', function() {

            it('should create product "Baju Anti Api"', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/product')
                    .send({
                        name: 'Baju Anti Api',
                        color: 'black',
                        size: 'L',
                        price: 1000000,
                        description: 'Baju ini tidak akan terbakar',
                        categories: [test_categories[1]]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);

                        res.body.product.name.should.equal('Baju Anti Api');
                        res.body.product.color.should.equal('black');
                        res.body.product.size.should.equal('L');
                        res.body.product.price.should.equal(1000000);
                        res.body.product.description.should.equal('Baju ini tidak akan terbakar');
                        res.body.product.should.have.property('categories').with.lengthOf(1);
                        res.body.product.categories[0].should.equal(test_categories[1]);

                        test_products.push(res.body.product._id);
                        return done();
                    });
            });

            it('should create product "Baju Anti Peluru" with no description', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/product')
                    .send({
                        name: 'Baju Anti Peluru',
                        color: 'black',
                        size: 'L',
                        price: 1500000,
                        categories: [test_categories[1]]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);

                        res.body.product.name.should.equal('Baju Anti Peluru');
                        res.body.product.color.should.equal('black');
                        res.body.product.size.should.equal('L');
                        res.body.product.price.should.equal(1500000);
                        res.body.product.should.not.have.property('description');
                        res.body.product.should.have.property('categories').with.lengthOf(1);
                        res.body.product.categories[0].should.equal(test_categories[1]);

                        test_products.push(res.body.product._id);
                        return done();
                    });
            });

            it('should create product "Baju Anti Api dan Peluru" with 2 categories', function(done) {
                request(config.HTTP_ADDRESS)
                    .put('/product')
                    .send({
                        name: 'Baju Anti Api dan Peluru',
                        color: 'blue',
                        size: 'XL',
                        price: 2000000,
                        description: 'Baju ini tidak akan terbakar',
                        categories: [test_categories[1], test_categories[0]]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);

                        res.body.product.name.should.equal('Baju Anti Api dan Peluru');
                        res.body.product.color.should.equal('blue');
                        res.body.product.size.should.equal('XL');
                        res.body.product.price.should.equal(2000000);
                        res.body.product.description.should.equal('Baju ini tidak akan terbakar');
                        res.body.product.should.have.property('categories').with.lengthOf(2);
                        res.body.product.categories.should.containEql(test_categories[1]);
                        res.body.product.categories.should.containEql(test_categories[0]);

                        test_products.push(res.body.product._id);
                        return done();
                    });
            });

        });

    });



    // Test endpoint that retrieve products
    describe('GET /product/:productId', function() {

        describe('Requests with Invalid Data', function() {

            it('should get error on invalid id input format', function (done) {
                request(config.HTTP_ADDRESS)
                    .get('/product/123')
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(500)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_ERROR);
                        res.body.errors.name.should.equal('CastError');
                        return done();
                    });
            });

            it('should get reference error on non exist id input', function(done) {
                request(config.HTTP_ADDRESS)
                    .get('/product/555555c55a777b1111a99999')
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.REFERENCE_ERROR);
                        return done();
                    });
            });

        });

        describe('Requests with Valid Data', function() {

            it('should get "Baju Anti Api dan Peluru"', function (done) {
                request(config.HTTP_ADDRESS)
                    .get('/product/' + test_products[2])
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);

                        res.body.product.name.should.equal('Baju Anti Api dan Peluru');
                        res.body.product.color.should.equal('blue');
                        res.body.product.size.should.equal('XL');
                        res.body.product.price.should.equal(2000000);
                        res.body.product.description.should.equal('Baju ini tidak akan terbakar');
                        res.body.product.should.have.property('categories').with.lengthOf(2);
                        res.body.product.categories.should.containEql(test_categories[1]);
                        res.body.product.categories.should.containEql(test_categories[0]);

                        return done();
                    });
            });

            it('should get "Baju Anti Peluru"', function (done) {
                request(config.HTTP_ADDRESS)
                    .get('/product/' + test_products[1])
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);

                        res.body.product.name.should.equal('Baju Anti Peluru');
                        res.body.product.color.should.equal('black');
                        res.body.product.size.should.equal('L');
                        res.body.product.price.should.equal(1500000);
                        res.body.product.should.not.have.property('description');
                        res.body.product.should.have.property('categories').with.lengthOf(1);
                        res.body.product.categories[0].should.equal(test_categories[1]);

                        return done();
                    });
            });

            it('should get "Baju Anti Api"', function (done) {
                request(config.HTTP_ADDRESS)
                    .get('/product/' + test_products[0])
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);

                        res.body.product.name.should.equal('Baju Anti Api');
                        res.body.product.color.should.equal('black');
                        res.body.product.size.should.equal('L');
                        res.body.product.price.should.equal(1000000);
                        res.body.product.description.should.equal('Baju ini tidak akan terbakar');
                        res.body.product.should.have.property('categories').with.lengthOf(1);
                        res.body.product.categories[0].should.equal(test_categories[1]);

                        return done();
                    });
            });



        });

    });



    // Test endpoint that updates products
    describe('POST /product/:productId', function() {

        describe('Requests with Invalid Data', function() {

            it('should not update product with zero length name', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/product/' + test_products[0])
                    .send({
                        name: '',
                        color: 'black',
                        size: 'L',
                        price: 1000000,
                        description: 'Baju ini tidak akan terbakar',
                        categories: [test_categories[1]]
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

            it('should not update product with zero length color', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/product/' + test_products[0])
                    .send({
                        color: '',
                        size: 'L',
                        price: 1000000,
                        description: 'Baju ini tidak akan terbakar',
                        categories: [test_categories[1]]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.color.name.should.equal('ValidatorError');

                        return done();
                    });
            });

            it('should not update product with zero length size', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/product/' + test_products[0])
                    .send({
                        size: '',
                        price: 1000000,
                        description: 'Baju ini tidak akan terbakar',
                        categories: [test_categories[1]]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.size.name.should.equal('ValidatorError');

                        return done();
                    });
            });

            it('should not update product with zero length categories', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/product/' + test_products[0])
                    .send({
                        categories: []
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.categories.name.should.equal('ValidatorError');

                        return done();
                    });
            });


            it('should not update product with non numeric price', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/product/' + test_products[0])
                    .send({
                        price: 'asd',
                        description: 'Baju ini tidak akan terbakar',
                        categories: [test_categories[1]]
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);

                        return done();
                    });
            });

            it('should not update product with invalid category id', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/product/' + test_products[0])
                    .send({
                        categories: ['123']
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);

                        return done();
                    });
            });

            it('should not update product with missing category id reference', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/product/' + test_products[0])
                    .send({
                        categories: ['555555c55a777b1111a99999']
                    })
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.categories.name.should.equal('ValidatorError');

                        return done();
                    });
            });
        });

        describe('Requests with Valid Data', function() {

            it('should update product with zero length description', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/product/' + test_products[0])
                    .send({
                        description: ''
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

            it('should update product with valid size, name, and color', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/product/' + test_products[1])
                    .send({
                        categories: [test_categories[1]],
                        size: 'XL',
                        price: 2500000
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

            it('should update product with a valid category', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/product/' + test_products[1])
                    .send({
                        categories: [test_categories[0]]
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

            it('should update product with valid categories', function(done) {
                request(config.HTTP_ADDRESS)
                    .post('/product/' + test_products[1])
                    .send({
                        categories: [test_categories[1], test_categories[0]]
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

    // Test endpoint that queries/searches products
    describe('POST /products', function() {
        it('should return at least 1 result of products that has size of "XL"', function(done) {
            request(config.HTTP_ADDRESS)
                .post('/products')
                .send({
                    sizes: ['XL']
                })
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    res.body.code.should.equal(codes.OPERATION_SUCCESS);
                    res.body.products.length.should.be.above(0);

                    return done();
                });
        });

        it('should return at least 2 result of products that has size of "L"', function(done) {
            request(config.HTTP_ADDRESS)
                .post('/products')
                .send({
                    sizes: ['L']
                })
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    res.body.code.should.equal(codes.OPERATION_SUCCESS);
                    res.body.products.length.should.be.above(1);

                    return done();
                });
        });

        it('should return at least 3 result of products that has color of "black" and "blue"', function(done) {
            request(config.HTTP_ADDRESS)
                .post('/products')
                .send({
                    colors: ['black', 'blue']
                })
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    res.body.code.should.equal(codes.OPERATION_SUCCESS);
                    res.body.products.length.should.be.above(2);

                    return done();
                });
        });

        it('should return at least 3 result of products that has price at least 500000', function(done) {
            request(config.HTTP_ADDRESS)
                .post('/products')
                .send({
                    price: {"min": 500000}
                })
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    res.body.code.should.equal(codes.OPERATION_SUCCESS);
                    res.body.products.length.should.be.above(2);

                    return done();
                });
        });

        it('should return at least 1 result of products that has price at most 1250000', function(done) {
            request(config.HTTP_ADDRESS)
                .post('/products')
                .send({
                    price: {"max": 1250000}
                })
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    res.body.code.should.equal(codes.OPERATION_SUCCESS);
                    res.body.products.length.should.be.above(0);

                    return done();
                });
        });

        it('should return at least 2 result of products that has price at between 1250000 - 2650000', function(done) {
            request(config.HTTP_ADDRESS)
                .post('/products')
                .send({
                    price: {"min": 1250000, "max": 2650000}
                })
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    res.body.code.should.equal(codes.OPERATION_SUCCESS);
                    res.body.products.length.should.be.above(1);

                    return done();
                });
        });

        it('should return exactly 3 result of products that is in two category we created before', function(done) {
            request(config.HTTP_ADDRESS)
                .post('/products')
                .send({
                    categories: [test_categories[0], test_categories[1]]
                })
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    res.body.code.should.equal(codes.OPERATION_SUCCESS);
                    res.body.products.length.should.equal(3);

                    return done();
                });
        });

        it('should return exactly 2 result of products that is in first category', function(done) {
            request(config.HTTP_ADDRESS)
                .post('/products')
                .send({
                    categories: [test_categories[0]]
                })
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    res.body.code.should.equal(codes.OPERATION_SUCCESS);
                    res.body.products.length.should.equal(2);

                    return done();
                });
        });

        it('should return exactly 3 result of products that is in second category', function(done) {
            request(config.HTTP_ADDRESS)
                .post('/products')
                .send({
                    categories: [test_categories[1]]
                })
                .set('API-KEY', config.TEST_VALID_API_KEY)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);

                    res.body.code.should.equal(codes.OPERATION_SUCCESS);
                    res.body.products.length.should.equal(3);

                    return done();
                });
        });
    });

    // Test endpoint that deletes products
    describe('DELETE /product/:productId', function() {

        describe('Requests with Invalid Data', function() {
            it('should get reference error on missing id reference', function(done) {
                request(config.HTTP_ADDRESS)
                    .delete('/product/555555c55a777b1111a99999')
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.REFERENCE_ERROR);

                        return done();
                    });
            });

            it('should get validation error on invalid id format', function(done) {
                request(config.HTTP_ADDRESS)
                    .delete('/product/123')
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(400)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.VALIDATION_ERROR);
                        res.body.errors.name.should.equal('CastError');

                        return done();
                    });
            });
        });


        describe('Requests with Valid Data', function() {
            it('should delete the product #1', function(done) {
                request(config.HTTP_ADDRESS)
                    .delete('/product/' + test_products[0])
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);
                        res.body.details.n.should.equal(1);

                        return done();
                    });
            });

            it('should delete the product #2', function(done) {
                request(config.HTTP_ADDRESS)
                    .delete('/product/' + test_products[1])
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);
                        res.body.details.n.should.equal(1);

                        return done();
                    });
            });

            it('should delete the product #3', function(done) {
                request(config.HTTP_ADDRESS)
                    .delete('/product/' + test_products[2])
                    .set('API-KEY', config.TEST_VALID_API_KEY)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) return done(err);

                        res.body.code.should.equal(codes.OPERATION_SUCCESS);
                        res.body.details.n.should.equal(1);

                        return done();
                    });
            });
        });

    });

});