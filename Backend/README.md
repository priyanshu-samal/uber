# API Documentation

## Endpoints

### 1. /users/register

#### Description
This endpoint is used to register a new user. It validates the input data, creates the user, and generates a JWT token.

#### Endpoint
**POST /users/register**

#### Required Data Format
```json
{
  "fullname": {
    "firstname": "string (min 3 characters)",
    "lastname": "string (min 3 characters)"
  },
  "email": "valid email address",
  "password": "string (min 6 characters)"
}
```

#### Example Response
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2. /users/profile

#### Description
This endpoint retrieves the profile of the currently authenticated user. It requires a valid token (via cookie or Authorization header).

#### Endpoint
**GET /users/profile**

#### Authentication
A valid JWT token must be provided in the Authorization header (as `Bearer token`) or as a cookie named `token`.

#### Example Response
```json
{
  "success": true,
  "message": "User profile fetched successfully",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "johndoe@example.com",
    "socketId": null
  }
}
```

---

### 3. /users/logout

#### Description
This endpoint logs out the user by clearing the token cookie and blacklisting the provided token.

#### Endpoint
**GET /users/logout**

#### Authentication
A valid JWT token must be provided in the Authorization header (as `Bearer token`) or as a cookie named `token`.

#### Example Response
```json
{
  "success": true,
  "message": "User logged out successfully"
}
```