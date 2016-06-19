# `POST /category/:categoryId`
This resource updates a category that is specified in `:categoryId`. It would return the created category as well as its ID.

#### Resource Information
| Name | Description |
| --- | --- |
| HTTP Method | POST |
| Resource URL | /category/`:categoryId` |
| Format (input and output) | JSON |
| Authentication | Yes, API-KEY Token |

#### Parameters
| Name | Type | Description
| --- | --- | --- |
| `name` | String, *optional* | Name of the category |
| `description` | String, *optional* | Description of the category |
| `parent` | ObjectID, *optional* | Parent ID of the category. If not specified, would make the category a root category |

#### Example Request
```http
POST /category/57667f3a7b30e35010ebd6e9 HTTP/1.1
Host: backend.someserver.com:3000
API-KEY: sAmPlEA=piK3Y
Content-Type: application/json
Cache-Control: no-cache

{
    "name": "Pakaian Keren",
    "description": "Koleksi pakaian keren",
    "parent": "576415c19a072b7911a15312"
}
```


#### Example Result
**Successful Update:**

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

**Invalid Update (user specify zero length name):**
```json
{
  "code": 98,
  "message": "The requested operation did not pass validation process. Please check request parameters.",
  "errors": {
    "name": {
      "message": "Path `name` is required.",
      "name": "ValidatorError",
      "properties": {
        "type": "required",
        "message": "Path `{PATH}` is required.",
        "path": "name",
        "value": ""
      },
      "kind": "required",
      "path": "name",
      "value": ""
    }
  }
}
```
