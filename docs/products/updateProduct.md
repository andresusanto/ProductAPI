# `POST /product/:productId`
This resource updates product that is specified by `:productId`.

#### Resource Information
| Name | Description |
| --- | --- |
| HTTP Method | POST |
| Resource URL | /product/`:productId` |
| Format (input and output) | JSON |
| Authentication | Yes, API-KEY Token |

#### Parameters
| Name | Type | Description
| --- | --- | --- |
| `name` | String. **Optional** | Name of the product |
| `color` | String.**Optional** | Colors of the product |
| `size` | String enum, valid values are ('XS', 'S', 'M', 'L', 'XL', 'XXL'). **Optional** | Sizes of the product |
| `price` | Numeric. **Optional** | Price of the product |
| `description` | String. **Optional** | Description of the product |
| `categories` | Array of ObjectID. **Optional** | Categories of the products (min 1) |


#### Example Request
```http
POST /product/57643513fe20f22d136203bd HTTP/1.1
Host: backend.someserver.com:3000
API-KEY: sAmPlEA=piK3Y
Content-Type: application/json
Cache-Control: no-cache

{
    "name": "DC Cardigan",
    "color": "blue",
    "size": "XXL",
    "price": 500000,
    "description": "Cardigan terbaru yang keren dan unik",
    "categories": ["576675997b30e35010ebd6d4", "576675997b30e35010ebd6d2"]
}
```


#### Example Result
**Successful Request:**
```json
{
  "code": 0,
  "message": "The requested operation executed successfully.",
  "details": {
    "ok": 1,
    "nModified": 1,
    "n": 1
  }
}
```

**Invalid Request:**
```json
{
  "code": 97,
  "message": "The reference (ID) that is broken/missing."
}
```
