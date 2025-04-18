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
  "token": "YOUR_JWT_TOKEN_PLACEHOLDER"
}
```

---

### 2. /users/profile

#### Description
This endpoint retrieves the profile of the currently authenticated user. It requires a valid token provided via a cookie or the Authorization header.

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

---

## Captain Endpoints

### 1. /captain/register

#### Description
This endpoint is used to register a new captain. It validates the input data, creates the captain record, and generates a JWT token. The captain’s details are returned along with the token.

#### Endpoint
**POST /captain/register**

#### Required Data Format
```json
{
  "fullname": {
    "firstname": "string (min 3 characters)",
    "lastname": "string (min 3 characters)"
  },
  "email": "valid email address",
  "password": "string (min 6 characters)",
  "vechicle": {
    "color": "string (min 3 characters)",
    "plate": "string (min 3 characters)",
    "capacity": "number (minimum 1)",
    "vechicleType": "string (e.g., 'car', 'motorcycle', 'auto')"
  },
  "location": {
    "lat": "number",
    "long": "number"
  }
}
```

#### Example Response
```json
{
  "success": true,
  "message": "Captain registered successfully",
  "token": "YOUR_JWT_TOKEN_PLACEHOLDER",
  "captain": {
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "janedoe@example.com",
    "vechicle": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vechicleType": "car"
    },
    "location": {
      "lat": 40.7128,
      "long": -74.0060
    },
    "status": "inactive",
    "socketId": null
  }
}
```

---

### 2. /captain/login

#### Description
This endpoint logs in an existing captain by verifying their email and password. Upon successful authentication, a JWT token and the captain’s details are returned.

#### Endpoint
**POST /captain/login**

#### Required Data Format
```json
{
  "email": "valid email address",
  "password": "string (min 6 characters)"
}
```

#### Example Response
```json
{
  "success": true,
  "message": "Captain logged in successfully",
  "token": "YOUR_JWT_TOKEN_PLACEHOLDER",
  "captain": {
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "janedoe@example.com",
    "vechicle": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vechicleType": "car"
    },
    "status": "inactive",
    "socketId": null
  }
}
```

---

### 3. /captain/profile

#### Description
This endpoint retrieves the profile of the currently authenticated captain. It requires a valid token provided via a cookie or the Authorization header.

#### Endpoint
**GET /captain/profile**

#### Authentication
A valid JWT token must be provided in the Authorization header (as `Bearer token`) or as a cookie named `token`.

#### Example Response
```json
{
  "success": true,
  "message": "Captain profile fetched successfully",
  "captain": {
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "janedoe@example.com",
    "vechicle": {
      "color": "red",
      "plate": "XYZ123",
      "capacity": 4,
      "vechicleType": "car"
    },
    "status": "inactive",
    "socketId": null
  }
}
```

---

### 4. /captain/logout

#### Description
This endpoint logs out the captain by clearing the token cookie and blacklisting the provided token.

#### Endpoint
**GET /captain/logout**

#### Authentication
A valid JWT token must be provided in the Authorization header (as `Bearer token`) or as a cookie named `token`.

#### Example Response
```json
{
  "success": true,
  "message": "Captain logged out successfully"
}
```

---

## Security Considerations

- **Input Validation & Sanitization:**  
  All endpoints use [express-validator](https://express-validator.github.io/) for validating and sanitizing incoming data to help prevent injection attacks and malformed input.

- **JWT Security:**  
  JWT tokens are signed using secrets stored in environment variables. Ensure that `process.env.JWT_SECRET` is protected and that tokens are sent over HTTPS.

- **Error Handling:**  
  Responses avoid detailed error messages to prevent exposing sensitive system information.

- **HTTP Headers:**  
  It is recommended to use [Helmet](https://helmetjs.github.io/) middleware in Express to set secure HTTP headers.

- **Rate Limiting:**  
  Use middleware such as [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) to reduce the risk of brute force attacks.

- **Secure Transmission:**  
  Use HTTPS in production to protect data in transit.

- **Cookie Security:**  
  When using cookies for authentication, use secure and httpOnly flags to prevent client-side access and improve security.