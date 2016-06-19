# `GET /category/:categoryId/products`
This resource returns all products inside a category that is specified by `:categoryId`.

#### Resource Information
| Name | Description |
| --- | --- |
| HTTP Method | GET |
| Resource URL | /category/`:categoryId`/products |
| Format (input and output) | JSON |
| Authentication | Yes, API-KEY Token |

#### Parameters
(None)

#### Example Request
```http
GET /category/576415c19a072b7911a15312/products HTTP/1.1
Host: backend.someserver.com:3000
API-KEY: sAmPlEA=piK3Y
Content-Type: application/json
Cache-Control: no-cache
```


#### Example Result
**Successful Request:**

```json
{
  "code": 0,
  "message": "The requested operation executed successfully.",
  "products": [
    {
      "_id": "576675997b30e35010ebd6d9",
      "name": "Levi's Jaket Cokelat",
      "color": "brown",
      "size": "L",
      "price": 500000,
      "description": "Haha hihi",
      "__v": 0,
      "categories": [
        "576675997b30e35010ebd6d4"
      ]
    }
  ]
}
```

**Invalid Request:**

```json
{
  "code": 95,
  "message": "Unknown error occured during operation.",
  "errors": {
    "message": "Cast to ObjectId failed for value \"576675997b30e\" at path \"_id\"",
    "name": "CastError",
    "kind": "ObjectId",
    "value": "576675997b30e",
    "path": "_id"
  }
}
```
