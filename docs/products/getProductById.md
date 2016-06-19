# `GET /product/:productId`
This resource get product that is specified by `:productId`.

#### Resource Information
| Name | Description |
| --- | --- |
| HTTP Method | GET |
| Resource URL | /product/`:productId` |
| Format (input and output) | JSON |
| Authentication | Yes, API-KEY Token |

#### Parameters
(None)

#### Example Request
```http
GET /product/57668e617b30e35010ebd6eb HTTP/1.1
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
  "product": {
    "_id": "57668e617b30e35010ebd6eb",
    "name": "Levi's Jaket Hitam",
    "color": "black",
    "size": "M",
    "price": 100000,
    "description": "Jaket hitam terbaik koleksi kami",
    "__v": 0,
    "categories": [
      "576675997b30e35010ebd6d4"
    ]
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
