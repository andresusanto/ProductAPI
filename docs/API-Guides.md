# API Documentation
This doc contains API Documentation for Product API.

## API Security
You must provide `API-KEY` token and place it in the request header in order to access Product API. The correct value of `API-KEY` is defined in the `.env` configuration file.

## Common API Codes
This API provides common codes (int) to indicate more detailed request status. The followings are the codes:

| Code | Name | Description |
| --- | --- | --- |
| 99 | UNAUTHORIZED | Unauthorized access to API. This is caused by invalid `API-KEY` token |
| 98 | VALIDATION ERROR | User input did not pass validation process. This is caused by invalid request data (did not meet constraint) |


## Categories
All resources related to categories.

### GET /categories
This resource returns all categories along with their children (also their children) in a tree format.

#### Resource Information
| Name | Description |
| --- | --- |
| HTTP Method | GET |
| Resource URL | /categories |
| Format (input and output) | JSON |
| Authentication | Yes, API-KEY Token |

#### Parameters
(None)

#### Example Request


#### Example Result

```json
{
  "code": 0,
  "message": "The requested operation executed successfully.",
  "categories": [
    {
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
    },
    {
      "children": [
        {
          "children": [],
          "_id": "576675997b30e35010ebd6d5",
          "name": "Kaos",
          "description": "Koleksi macam-macam kaos",
          "parent": "576675997b30e35010ebd6d3",
          "__v": 0
        }
      ],
      "_id": "576675997b30e35010ebd6d3",
      "name": "Pakaian",
      "__v": 0
    },
    {
      "children": [
        {
          "children": [],
          "_id": "576675997b30e35010ebd6db",
          "name": "Pakaian Keren",
          "parent": "576675997b30e35010ebd6da",
          "__v": 0
        }
      ],
      "_id": "576675997b30e35010ebd6da",
      "name": "Pakaian",
      "description": "Koleksi celana paling lengkap dan update",
      "__v": 0
    }
  ]
}
```
