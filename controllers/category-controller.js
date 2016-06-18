/**
 * Product API
 * ------------
 * category-controller.js - This file handles all requests that are related to categories.
 */

'use strict';

var Category = require('../models/category');
var Product = require('../models/product');

const codes = require('../constants/codes');
const messages = require('../constants/messages');

module.exports = {

    findCategories : function (req, res){
        Category.find({}, function(err, result){
            res.send({code: codes.OPERATION_SUCCESS, message: messages.OPERATION_SUCCESS, categories: result});
        });
    },

    createCategory : function(req, res){
        var category = new Category(req.body);
        category.save(function(error){
            if (error){
                res.status(400).send({code: codes.VALIDATION_ERROR, message: messages.VALIDATION_ERROR, errors: error.errors});
            }else{
                res.send({code: codes.OPERATION_SUCCESS, message: messages.OPERATION_SUCCESS, category: category});
            }
        })
    },

    updateCategory: function (req, res){
        Category.update({_id: req.params.categoryId}, req.body, {runValidators: true}, function(err, response){
            if (err){
                res.status(400).send({code: codes.VALIDATION_ERROR, message: messages.VALIDATION_ERROR, errors: err.errors});
            }else if (response.n == 0){
                // reference error as we can't find the requested category
                res.status(400).send({code: codes.REFERENCE_ERROR, message: messages.REFERENCE_ERROR});
            }else{
                res.send({code: codes.OPERATION_SUCCESS, message: messages.OPERATION_SUCCESS, details: response});
            }
        });
    },

    deleteCategory: function(req, res){
        Category.findOne({_id: req.params.categoryId}, function(err, category){
            if (err) {
                res.status(500).send({code: codes.OPERATION_ERROR, message: messages.OPERATION_ERROR, errors: err});
            } else if (category){
                // use doc.remove() instead of Model.remove() so that pre hook can validate the deletion request.
                category.remove(function (remErr) {
                    if (remErr){
                        res.status(400).send({code: remErr.code, message: remErr.msg});
                    }else{
                        res.send({code: codes.OPERATION_SUCCESS, message: messages.OPERATION_SUCCESS});
                    }
                });
            }else{
                // reference error as we can't find the requested category
                res.status(400).send({code: codes.REFERENCE_ERROR, message: messages.REFERENCE_ERROR});
            }
        })
    },

    getCategoryById : function(req, res){
        Category.findOne({_id: req.params.categoryId}, function(err, category){
            if (err) {
                res.status(500).send({code: codes.OPERATION_ERROR, message: messages.OPERATION_ERROR, errors: err});
            } else if (category){
                res.send({code: codes.OPERATION_SUCCESS, message: messages.OPERATION_SUCCESS, category: category});
            }else{
                // reference error as we can't find the requested category
                res.status(400).send({code: codes.REFERENCE_ERROR, message: messages.REFERENCE_ERROR});
            }
        })
    },

    getCategoryProducts : function(req, res){
        Product.find({categories: req.params.categoryId}, function(err, products){
            if (err){
                res.status(500).send({code: codes.OPERATION_ERROR, message: messages.OPERATION_ERROR, errors: err});
            }else{
                res.send({code: codes.OPERATION_SUCCESS, message: messages.OPERATION_SUCCESS, products: products});
            }
        });
    }
};