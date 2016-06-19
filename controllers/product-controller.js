/**
 * Product API
 * ------------
 * product-controller.js - This file handles all requests that are related to products.
 */

'use strict';

var Product = require('../models/product');

var tools = require('../utils/tools');
const codes = require('../constants/codes');
const messages = require('../constants/messages');

module.exports = {

    // this will clean all categories in databases. no validation is performed.
    cleanUp : function(req, res){
        Product.remove({}, function(err){
            if (err){
                res.send({code: codes.OPERATION_ERROR, message: messages.OPERATION_ERROR, errors: err});
            }else{
                res.send({code: codes.OPERATION_SUCCESS, message: messages.OPERATION_SUCCESS});
            }
        });
    },

    findProducts : function (req, res){

        // query handling for size, color, and category
        var size_query = tools.aggregateQuery('$in', req.body.sizes);
        var color_query = tools.aggregateQuery('$in', req.body.colors);
        var category_query = tools.aggregateQuery('$in', req.body.categories);

        // query handling for price range
        var price_query = undefined;
        if (req.body.price && (req.body.price.min || req.body.price.max)){
            price_query = {};

            if (req.body.price.min) price_query.$gt = req.body.price.min; // minimum price specified
            if (req.body.price.max) price_query.$lt = req.body.price.max; // maximum price specified

        }

        // join all queries, also ensure that undefined variable did not attached to query
        var query = {};
        if (size_query) query.size = size_query;
        if (color_query) query.color = color_query;
        if (category_query) query.categories = category_query;
        if (price_query) query.price = price_query;


        Product.find(query, function(err, products){
            if (err){
                res.status(500).send({code: codes.OPERATION_ERROR, message: messages.OPERATION_ERROR, errors: err});
            }else{
                res.send({code: codes.OPERATION_SUCCESS, message: messages.OPERATION_SUCCESS, products: products});
            }
        });
    },

    getProductById: function(req, res){
        Product.findOne({_id: req.params.productId}, function(err, product){
            if (err) {
                res.status(500).send({code: codes.OPERATION_ERROR, message: messages.OPERATION_ERROR, errors: err});
            } else if (product){
                res.send({code: codes.OPERATION_SUCCESS, message: messages.OPERATION_SUCCESS, product: product});
            }else{
                // reference error as we can't find the requested product
                res.status(400).send({code: codes.REFERENCE_ERROR, message: messages.REFERENCE_ERROR});
            }
        })
    },

    createProduct: function(req, res){
        var product = new Product(req.body);
        product.save(function(error){
            if (error){
                res.status(400).send({code: codes.VALIDATION_ERROR, message: messages.VALIDATION_ERROR, errors: error.errors});
            }else{
                res.send({code: codes.OPERATION_SUCCESS, message: messages.OPERATION_SUCCESS, product: product});
            }
        });
    },

    updateProduct: function(req, res){
        Product.update({_id: req.params.productId}, req.body, {runValidators: true}, function(err, response){
            if (err){
                res.status(400).send({code: codes.VALIDATION_ERROR, message: messages.VALIDATION_ERROR, errors: err.errors});
            }else if (response.n == 0){
                // reference error as we can't find the requested product
                res.status(400).send({code: codes.REFERENCE_ERROR, message: messages.REFERENCE_ERROR});
            }else{
                res.send({code: codes.OPERATION_SUCCESS, message: messages.OPERATION_SUCCESS, details: response});
            }
        });
    },

    deleteProduct: function (req, res){
        Product.remove({_id: req.params.productId}, function (err, result){
            if (err) {
                res.status(400).send({code: codes.VALIDATION_ERROR, message: messages.VALIDATION_ERROR, errors: err});
            } else if (result.result.n == 0 ){
                // reference error as we can't find the requested product
                res.status(400).send({code: codes.REFERENCE_ERROR, message: messages.REFERENCE_ERROR});
            } else {
                res.send({code: codes.OPERATION_SUCCESS, message: messages.OPERATION_SUCCESS, details: result});
            }
        });
    }
};