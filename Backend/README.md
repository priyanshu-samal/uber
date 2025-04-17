# /users/register Endpoint

## Description
This endpoint is used to register a new user. It validates the input data and, upon success, creates the user and generates a JWT token.

## Endpoint
**POST /users/register**

## Required Data Format
```json
{
  "fullname": {
    "firstname": "string (min 3 characters)",
    "lastname": "string (min 3 characters)"
  },
  "email": "valid email address",
  "password": "string (min 6 characters)"
}
## Example Response
```json
{
  "success": true,
  "message": "User registered successfully.",
  "data": {
    "userId": "12345",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
