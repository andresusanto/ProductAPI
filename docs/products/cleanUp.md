# `GET /products/cleanup`
This resource would clean all products in database.

#### Resource Information
| Name | Description |
| --- | --- |
| HTTP Method | GET |
| Resource URL | /products/cleanup |
| Format (input and output) | JSON |
| Authentication | Yes, API-KEY Token |

#### Parameters
(None)

#### Example Request
```http
GET /products/cleanup HTTP/1.1
Host: backend.someserver.com:3000
API-KEY: sAmPlEA=piK3Y
Content-Type: application/json
Cache-Control: no-cache
```


#### Example Result

```json
{
  "code": 0,
  "message": "The requested operation executed successfully."
}
```
