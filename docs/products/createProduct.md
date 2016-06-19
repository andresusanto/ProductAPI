# `PUT /product`
This resource creates a product by using specified parameters.

#### Resource Information
| Name | Description |
| --- | --- |
| HTTP Method | PUT |
| Resource URL | /product |
| Format (input and output) | JSON |
| Authentication | Yes, API-KEY Token |

#### Parameters
| Name | Type | Description
| --- | --- | --- |
| `name` | String. **Required** | Name of the product |
| `color` | String.**Required** | Colors of the product |
| `size` | String enum, valid values are ('XS', 'S', 'M', 'L', 'XL', 'XXL'). **Required** | Sizes of the product |
| `price` | Numeric. **Required** | Price of the product |
| `description` | String. **Optional** | Description of the product |
| `categories` | Array of ObjectID. **Required (min 1)** | Categories of the products |


**Note:** if none supplied (empty string or `{}`), it would yield all products.

#### Example Request
```http
PUT /product HTTP/1.1
Host: backend.someserver.com:3000
API-KEY: sAmPlEA=piK3Y
Content-Type: application/json
Cache-Control: no-cache

{
    "name": "Levi's Jaket Hitam",
    "color": "black",
    "size": "M",
    "price": 100000,
    "description": "Jaket hitam terbaik koleksi kami",
    "categories": ["576675997b30e35010ebd6d4"]
}
```


#### Example Result
**Successful Request:**
```json
{
  "code": 0,
  "message": "The requested operation executed successfully.",
  "product": {
    "__v": 0,
    "name": "Levi's Jaket Hitam",
    "color": "black",
    "size": "M",
    "price": 100000,
    "description": "Jaket hitam terbaik koleksi kami",
    "_id": "57668e617b30e35010ebd6eb",
    "categories": [
      "576675997b30e35010ebd6d4"
    ]
  }
}
```

**Invalid Request:**
```json
{
  "code": 98,
  "message": "The requested operation did not pass validation process. Please check request parameters.",
  "errors": {
    "price": {
      "message": "Path `price` is required.",
      "name": "ValidatorError",
      "properties": {
        "type": "required",
        "message": "Path `{PATH}` is required.",
        "path": "price"
      },
      "kind": "required",
      "path": "price"
    },
    "size": {
      "message": "`SM` is not a valid enum value for path `size`.",
      "name": "ValidatorError",
      "properties": {
        "enumValues": [
          "XS",
          "S",
          "M",
          "L",
          "XL",
          "XXL"
        ],
        "type": "enum",
        "message": "`{VALUE}` is not a valid enum value for path `{PATH}`.",
        "path": "size",
        "value": "SM"
      },
      "kind": "enum",
      "path": "size",
      "value": "SM"
    },
    "color": {
      "message": "Path `color` is required.",
      "name": "ValidatorError",
      "properties": {
        "type": "required",
        "message": "Path `{PATH}` is required.",
        "path": "color",
        "value": ""
      },
      "kind": "required",
      "path": "color",
      "value": ""
    }
  }
}
```
