# API Documentation
This doc contains API Documentation for Product API.

## API Security
You must provide `API-KEY` token and place it in the request header in order to access Product API. The correct value of `API-KEY` is defined in the `.env` configuration file.

## Common API Codes
This API provides common codes (int) to indicate more detailed request status. The followings are the codes:

| Code | Name | Description |
| --- | --- | --- |
| 99 | UNAUTHORIZED | Unauthorized access to API. This is caused by invalid `API-KEY` token |
| 98 | VALIDATION ERROR | User input did not pass validation process. This is caused by invalid input request data (did not meet constraint). |
| 97 | REFERENCE ERROR | Reference (ID) that is supplied in request is missing (can't be found in database). |
| 96 | CONTENT REQUIRED | Invalid body request (usually caused by broken json). |
| 95 | OPERATION ERROR | Error that is thrown while operating request. Usually because of errors in data casting or internal server errors |
| 94 | DEPENDENCY ERROR CHILD | Requested operation (delete) is rejected as it would cause data integrity violation as the category still has child(ren). |
| 93 | DEPENDENCY ERROR PRODUCT | Requested operation (delete) is rejected as it would cause data integrity violation as the category still has product(s). |


## Categories
All resources related to categories.

1. [GET /categories](categories/findCategories.md) - Get all categories as well as their children in a tree format.
2. [PUT /category](categories/createCategory.md) - Create a new category
3. [GET /category/:categoryId](categories/getCategoryById.md) - Get a category (as well as their children) that is specified by category id.
4. [POST /category/:categoryId](categories/updateCategory.md) - Update a category that is specified by category id.
5. [DELETE /category/:categoryId](categories/deleteCategory.md) - Delete a category
6. [GET /category/:categoryId/products](categories/getCategoryProducts.md) - Get products inside a category
7. [GET /categories/cleanup](categories/cleanUp.md) - **Clean all categories in database**

## Products
All resources related to categories.

1. [POST /products](products/findProducts.md) - Get products that match criterion or all products.
2. [PUT /product](products/createProduct.md) - Create a new product
3. [GET /product/:productId](products/getProductById.md) - Get a product that is specified by product id.
4. [POST /product/:productId](products/updateProduct.md) - Update a product that is specified by product id.
5. [DELETE /product/:productId](products/deleteProduct.md) - Delete a product
6. [GET /products/cleanup](products/cleanUp.md) - **Clean all products in database**

