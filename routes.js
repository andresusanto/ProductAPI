/**
 * Product API
 * ------------
 * routes.js - This file contains routing configuration for Product API.
 */

'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var productController = require('./controllers/product-controller');
var categoryController = require('./controllers/category-controller');

var contentRequiredMiddleware = require('./middlewares/content-required');

// parse body for post requests and ensure they contains good request body
router.use(bodyParser.json());
router.use(contentRequiredMiddleware);

// routes of products
router.post('/products', productController.findProducts);
router.put('/product', productController.createProduct);
router.post('/product/:productId', productController.updateProduct);
router.delete('/product/:productId', productController.deleteProduct);
router.get('/product/:productId', productController.getProductById);
router.get('/products/cleanup', productController.cleanUp);


// routes of categories
router.get('/categories', categoryController.findCategories);
router.put('/category', categoryController.createCategory);
router.post('/category/:categoryId', categoryController.updateCategory);
router.delete('/category/:categoryId', categoryController.deleteCategory);
router.get('/category/:categoryId', categoryController.getCategoryById);
router.get('/category/:categoryId/products', categoryController.getCategoryProducts);
router.get('/categories/cleanup', categoryController.cleanUp);

module.exports = router;