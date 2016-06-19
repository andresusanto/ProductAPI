# `DELETE /product/:productId`
This resource deletes product that is specified by `:productId`.

#### Resource Information
| Name | Description |
| --- | --- |
| HTTP Method | DELETE |
| Resource URL | /product/`:productId` |
| Format (input and output) | JSON |
| Authentication | Yes, API-KEY Token |

#### Parameters
(None)

#### Example Request
```http
DELETE /product/576675997b30e35010ebd6d9 HTTP/1.1
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
  "details": {
    "ok": 1,
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
