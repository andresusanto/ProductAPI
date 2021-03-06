/**
 * Product API
 * ------------
 * category.js - This file models Categories
 */

'use strict';

var async = require('async');
var mongoose = require('mongoose');
var messages = require('../constants/messages');
var codes = require('../constants/codes');

var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    children: {
        type: Object,
        ref: 'Category'
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        validate: {
            // this validator would validate whether reference is valid (existed).
            validator: function(v, cb) {
                Category.findOne(v, function(err, result){
                    if (result) cb(true);
                    else cb(false);
                })
            },
            message: '{VALUE} is not a valid parent!'
        }
    }
});

// Validate dependencies (parent-child link and product-category link) before deletion.
// This ensure database is consistent (no missing reference).
categorySchema.pre('remove', function(next){
    var categoryId = this._id;
    Category.findOne({parent: categoryId}, function(err, result){
        if (err)
            next(err);
        else if (result) {
            var remErr = new Error(messages.DEPENDENCY_ERROR_CHILD);
            remErr.code = codes.DEPENDENCY_ERROR_CHILD;
            remErr.msg = messages.DEPENDENCY_ERROR_CHILD;
            next(remErr);
        }else{
            var Product = require('./product'); // require it here, so it did not cause looping dependencies

            Product.findOne({categories: categoryId}, function(pErr, pResult){
                if (pErr)
                    next(pErr);
                else if (pResult){
                    var remErr = new Error(messages.DEPENDENCY_ERROR_PRODUCT);
                    remErr.code = codes.DEPENDENCY_ERROR_PRODUCT;
                    remErr.msg = messages.DEPENDENCY_ERROR_PRODUCT;
                    next(remErr);
                }else{
                    next();
                }
            });
        }

    });
});

// this method allow user to retreive category and its children at once (using recursive)
categorySchema.methods.getChildren = function(callback){

    Category.find({parent: this._id}, function(err, children){

        if (children.length == 0){ // base of recursive
            callback([]);
        }else{
            var childrenPromises = []; // promise for retrieving children

            children.forEach(function(child){ // for each children retrieve its children
                childrenPromises.push(function(cbChild){
                    child.getChildren(function(grandchildren){ // retrieve child using recursive
                        child.children = grandchildren;
                        cbChild(null, child);
                    });
                });
            });

            async.parallel(childrenPromises, function (err, result){ // wait to all promises to be done
                callback(children);
            });
        }

    });

};

var Category = mongoose.model('Category', categorySchema);
module.exports = Category;
