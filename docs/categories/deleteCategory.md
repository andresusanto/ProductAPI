# `DELETE /category/:categoryId`
This resource deletes a category. It would check datas for integrity violation, so category that has child categories or products can not be deleted.

#### Resource Information
| Name | Description |
| --- | --- |
| HTTP Method | DELETE |
| Resource URL | /category/`:categoryId` |
| Format (input and output) | JSON |
| Authentication | Yes, API-KEY Token |

#### Parameters
(None)

#### Example Request
```http
DELETE /category/576415c19a072b7911a15312 HTTP/1.1
Host: backend.someserver.com:3000
API-KEY: sAmPlEA=piK3Y
Content-Type: application/json
Cache-Control: no-cache
```


#### Example Result
**Successful Deletion:**

```json
{
  "code": 0,
  "message": "The requested operation executed successfully."
}
```

**Invalid Deletion:**

```json
{
  "code": 94,
  "message": "The requested still has child(ren)."
}
```
