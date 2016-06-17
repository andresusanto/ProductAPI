/**
 * Product API
 * ------------
 * routes.js - This file contains routing configuration for Product API.
 */

'use strict';

var express = require('express');
var router = express.Router();

var productController = require('./controllers/product-controller');
var categoryController = require('./controllers/category-controller');


// routes of products
router.get('/products', productController.getProducts);

// routes of categories
router.get('/categories', categoryController.getCategories);

module.exports = router;