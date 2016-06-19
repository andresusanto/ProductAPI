# `PUT /category`
This resource creates a new category. It would return the created category as well as its ID.

#### Resource Information
| Name | Description |
| --- | --- |
| HTTP Method | PUT |
| Resource URL | /category |
| Format (input and output) | JSON |
| Authentication | Yes, API-KEY Token |

#### Parameters
| Name | Type | Description
| --- | --- | --- |
| `name` | String, **required** | Name of the created category |
| `description` | String, *optional* | Optional description of the category |
| `parent` | ObjectID, *optional* | Parent ID of the category. If not specified, will create a root category |

#### Example Request
```http
PUT /category HTTP/1.1
Host: backend.someserver.com:3000
API-KEY: sAmPlEA=piK3Y
Content-Type: application/json
Cache-Control: no-cache

{
    "name": "Pakaian Casual",
    "description": "Koleksi pakaian kasual",
    "parent": "576415c19a072b7911a15312"
}
```


#### Example Result
**Successful Creation:**

```json
{
  "code": 0,
  "message": "The requested operation executed successfully.",
  "category": {
    "__v": 0,
    "name": "Pakaian Casual",
    "description": "Koleksi pakaian kasual",
    "_id": "57667f3a7b30e35010ebd6e9"
  }
}
```

**Invalid Creation:**
```json
{
  "code": 98,
  "message": "The requested operation did not pass validation process. Please check request parameters.",
  "errors": {
    "parent": {
      "message": "576415c19a072b7911a15312 is not a valid parent!",
      "name": "ValidatorError",
      "properties": {
        "type": "user defined",
        "message": "{VALUE} is not a valid parent!",
        "path": "parent",
        "value": "576415c19a072b7911a15312"
      },
      "kind": "user defined",
      "path": "parent",
      "value": "576415c19a072b7911a15312"
    }
  }
}
```
