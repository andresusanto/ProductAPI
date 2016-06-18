/**
 * Product API
 * ------------
 * product.js - This file models Products
 */

'use strict';


var mongoose = require('mongoose');
var Category = require('./category');

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        required: true
    },
    color: {
        type: String,
        required: true
    },
    // support for multiple categories products
    categories: [{
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
            message: '{VALUE} is not a valid category!'
        }
    }]
});

module.exports = mongoose.model('Product', productSchema);