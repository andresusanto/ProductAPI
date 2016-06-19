# `GET /categories/cleanup`
This resource would clean all category in database.

**WARNING:** Data integrity would not be checked before performing this operation. Data inconsistency may occurr if product cleanup did not performed as well.

#### Resource Information
| Name | Description |
| --- | --- |
| HTTP Method | GET |
| Resource URL | /categories/cleanup |
| Format (input and output) | JSON |
| Authentication | Yes, API-KEY Token |

#### Parameters
(None)

#### Example Request
```http
GET /categories/cleanup HTTP/1.1
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
