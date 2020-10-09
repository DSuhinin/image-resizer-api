# Image Resizer API

# Topics
* [Overview](#overview)
* [Configuration](#configuration)
    * [Technology Stack](#technology-stack)
    * [ENV Variables](#env-variables)
* [Endpoints](#endpoints) 
    * [POST /store/images](#post-storeimages)
    * [GET /store/images](#get-storeimages)
    * [GET /store/images/:id](#get-imagesid)
    * [GET /store/images/:id/:type/download](#get-storeimagesiddownload)
    * [DELETE /store/images/:id](#delete-storeimagesid)
    * [GET /api/docs](#get-apidocs)
* [Appendix A. Response codes](#appendix-a-response-codes)
* [Appendix B. Request headers](#appendix-b-request-headers)

# Overview
Image Resizer API provides simple service to upload, resize and download images.

# Configuration
## Technology Stack
- NodeJS
- ExpressJS
- MySQL
- RabbitMQ
- Swagger

## ENV Variables
| Variable	            | Value                     |   Description	        |
|---	                |---	                    |---	                |
|PORT   	            | 8080 	                    |   HTTP Server Port	|
|DEBUG   	            | express:*   	            |   Log level	        |
|DATABASE_HOST   	    | localhost  	            |   database host	    |
|DATABASE_PORT   	    | 3306  	                |   database port	    |
|DATABASE_NAME   	    | store_database  	        |   database name	    |
|DATABASE_USER   	    | root  	                |   database user	    |
|DATABASE_PASS   	    | root  	                |   database password	|
|AMQP_HOST   	        | amqp://localhost:32771   	|   AMQP host	        |
|AWS_REGION   	        | us-east-1  	            |   AWS region	        |
|AWS_ACCESS_KEY_ID   	| key  	                    |   AWS Key ID	        |
|AWS_SECRET_ACCESS_KEY  | secret   	                |   AWS Access Key	    |

# Endpoints
## POST /store/images
The endpoint to upload image for further processing(resizing). Content Type of request body should be "multipart/form-data".
 
**Response body**
```
{
  "id": 1,
  "original": "9dab0bef178be7a369d0a9c33c94d209.jpg",
  "thumb": "",
  "type": "image/jpeg",
  "size": 775340,
  "status": 1,
  "updatedAt": "2020-10-09T22:52:25.270Z",
  "createdAt": "2020-10-09T22:52:25.270Z"
}
```

## GET /store/images
The endpoint to get the available list of images.

**Response body**
```
[
  {
    "id": 11,
    "original": "14afdfa41e4e03bb2c56d6d05f462b6d.jpg",
    "thumb": "14afdfa41e4e03bb2c56d6d05f462b6d_thumb.jpg",
    "size": "775340",
    "type": "image/jpeg",
    "status": 3,
    "createdAt": "2020-10-09T22:30:16.000Z",
    "updatedAt": "2020-10-09T22:30:19.000Z",
    "deletedAt": null
  },
  {
    "id": 12,
    "original": "9dab0bef178be7a369d0a9c33c94d209.jpg",
    "thumb": "9dab0bef178be7a369d0a9c33c94d209_thumb.jpg",
    "size": "775340",
    "type": "image/jpeg",
    "status": 3,
    "createdAt": "2020-10-09T22:52:25.000Z",
    "updatedAt": "2020-10-09T22:52:26.000Z",
    "deletedAt": null
  }
]
```

## GET /store/images/:id
The endpoint to get information about particular image.

**Response body**
```
{
  "id": 11,
  "original": "14afdfa41e4e03bb2c56d6d05f462b6d.jpg",
  "thumb": "14afdfa41e4e03bb2c56d6d05f462b6d_thumb.jpg",
  "size": "775340",
  "type": "image/jpeg",
  "status": 3,
  "createdAt": "2020-10-09T22:30:16.000Z",
  "updatedAt": "2020-10-09T22:30:19.000Z",
  "deletedAt": null
}
```

## GET /store/images/:id/:type/download
The endpoint to download original or thumbnail image.

## DELETE /store/images/:id
The endpoint to delete particular image.

**Response body**
```
```

## GET /api/docs
The endpoint to return swagger API documentation.

**Response body**
```
```

# Appendix A. Response codes

### HTTP error codes

Application uses standard HTTP response codes:
```
200 - Success
201 - Created
400 - Request error
404 - Not Found
500 - Internal Server Error
```

Additional information about the error returned as JSON-object like:
```
{
    "code": "{error-code}",
    "message": "{error-message}"
}
```
