# `POST /products`
This resource returns products that is specified by search criterion or **all products** if none suplied.

#### Resource Information
| Name | Description |
| --- | --- |
| HTTP Method | POST |
| Resource URL | /products |
| Format (input and output) | JSON |
| Authentication | Yes, API-KEY Token |

#### Parameters
| Name | Type | Description
| --- | --- | --- |
| `sizes` | Array of String enum, valid values are ('XS', 'S', 'M', 'L', 'XL', 'XXL'). **Optional** | Sizes of the product (support multiple value search) |
| `colors` | Array of String. **Optional** | Colors of the products (support multiple value search |
| `categories` | Array of ObjectID. **Optional** | Categories of the products (support multiple value search |
| `price.min` | Numeric. **Optional** | Minimum price of the product. |
| `price.max` | Numeric. **Optional** | Maximum price of the product. |

**Note:** if none supplied (empty string or `{}`), it would yield all products.

#### Example Request
```http
POST /products HTTP/1.1
Host: backend.someserver.com:3000
API-KEY: sAmPlEA=piK3Y
Content-Type: application/json
Cache-Control: no-cache

{
    "sizes": ["XL", "XXL"],
    "colors": ["black", "brown"],
    "categories": ["5763f50c92b942ba0f1a7f5a"],
    "price": {
        "min": 100000,
        "max": 150000
    }
}
```


#### Example Result

```json
{
  "code": 0,
  "message": "The requested operation executed successfully.",
  "products": [
    {
      "_id": "576675997b30e35010ebd6d9",
      "name": "Levi's Jaket Cokelat",
      "color": "brown",
      "size": "XL",
      "price": 120000,
      "description": "Haha hihi",
      "__v": 0,
      "categories": [
        "5763f50c92b942ba0f1a7f5a"
      ]
    }
  ]
}
```
