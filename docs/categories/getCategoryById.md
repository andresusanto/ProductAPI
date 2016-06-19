# `GET /category/:categoryId`
This resource returns a category (as well as its children) specified by `:categoryId`.

#### Resource Information
| Name | Description |
| --- | --- |
| HTTP Method | GET |
| Resource URL | /category/`:categoryId` |
| Format (input and output) | JSON |
| Authentication | Yes, API-KEY Token |

#### Parameters
(None)

#### Example Request
```http
GET /category/576415c19a072b7911a15312 HTTP/1.1
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
  "category": {
    "children": [
      {
        "children": [],
        "_id": "576675997b30e35010ebd6d4",
        "name": "Celana Jeans",
        "description": "Koleksi celana jeans paling lengkap dan update",
        "parent": "576675997b30e35010ebd6d2",
        "__v": 0
      }
    ],
    "_id": "576675997b30e35010ebd6d2",
    "name": "Celana",
    "description": "Koleksi celana paling lengkap dan update",
    "__v": 0
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
