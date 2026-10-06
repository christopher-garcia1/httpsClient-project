# httpsClient-project
A full-featured REST API built with TypeScript, Express, PostgreSQL, Drizzle ORM, and JWT authentication.

# Chirpy API

A RESTful backend API built with **TypeScript, Express, PostgreSQL, Drizzle ORM, and JWT authentication**. This project is based on the Chirpy backend project from Boot.dev.

The API supports user accounts, authentication, refresh tokens, chirps, user upgrades, and webhook handling.

## Tech Stack

* TypeScript
* Node.js
* Express
* PostgreSQL
* Drizzle ORM
* JWT
* Vitest

## Getting Started

### Clone the repository

```bash
git clone https://github.com/christopher-garcia1/httpsClient-project.git
cd httpsClient-project
```

### Install dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
PORT=8080
PLATFORM=dev
DB_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
POLKA_KEY=your_polka_key
```

Do not commit your `.env` file to GitHub.

### Start the Server

```bash
npm run dev
```

The API runs on:

```text
http://localhost:8080
```

---

# API Routes

## Health Check

### `GET /api/healthz`

Checks whether the API is running.

### Response

```text
OK
```

---

# Users

## Create User

### `POST /api/users`

Creates a new user account.

### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "id": "uuid",
  "createdAt": "2026-10-05T18:45:15.914Z",
  "updatedAt": "2026-10-05T18:45:15.914Z",
  "email": "user@example.com",
  "isChirpyRed": false
}
```

Passwords are hashed before being stored and are never returned in API responses.

---

## Update User

### `PUT /api/users`

Updates the authenticated user's email and/or password.

### Headers

```text
Authorization: Bearer YOUR_JWT
Content-Type: application/json
```

### Request Body

```json
{
  "email": "newemail@example.com",
  "password": "newpassword123"
}
```

---

# Authentication

## Login

### `POST /api/login`

Authenticates a user and returns an access token and refresh token.

### Request Body

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "id": "uuid",
  "createdAt": "2026-10-05T18:45:15.914Z",
  "updatedAt": "2026-10-05T18:45:15.914Z",
  "email": "user@example.com",
  "isChirpyRed": false,
  "token": "JWT_TOKEN",
  "refreshToken": "REFRESH_TOKEN"
}
```

---

## Refresh Access Token

### `POST /api/refresh`

Generates a new access token using a valid refresh token.

### Headers

```text
Authorization: Bearer YOUR_REFRESH_TOKEN
```

### Response

```json
{
  "token": "NEW_JWT_TOKEN"
}
```

---

## Revoke Refresh Token

### `POST /api/revoke`

Revokes the authenticated user's refresh token.

### Headers

```text
Authorization: Bearer YOUR_REFRESH_TOKEN
```

### Response

```text
204 No Content
```

---

# Chirps

## Create Chirp

### `POST /api/chirps`

Creates a new chirp for the authenticated user.

### Headers

```text
Authorization: Bearer YOUR_JWT
Content-Type: application/json
```

### Request Body

```json
{
  "body": "Hello from Chirpy!"
}
```

### Response

```json
{
  "id": "uuid",
  "createdAt": "2026-10-05T18:45:15.914Z",
  "updatedAt": "2026-10-05T18:45:15.914Z",
  "body": "Hello from Chirpy!",
  "userId": "uuid"
}
```

Chirps are limited to **140 characters**.

Certain words are automatically filtered.

---

## Get All Chirps

### `GET /api/chirps`

Returns all chirps, with the newest chirps returned first.

### Response

```json
[
  {
    "id": "uuid",
    "createdAt": "2026-10-05T18:45:15.914Z",
    "updatedAt": "2026-10-05T18:45:15.914Z",
    "body": "Hello from Chirpy!",
    "userId": "uuid"
  }
]
```

---

## Get Chirps by Author

### `GET /api/chirps?authorId=USER_ID`

Returns only chirps created by the specified user.

### Example

```text
GET /api/chirps?authorId=3311741c-680c-4546-99f3-fc9efac2036c
```

If `authorId` is not provided, all chirps are returned.

---

## Get Chirp by ID

### `GET /api/chirps/:chirpId`

Returns a single chirp by its ID.

### Example

```text
GET /api/chirps/7a5b8c5d-1234-5678-9012-abcdef123456
```

### Response

```json
{
  "id": "uuid",
  "createdAt": "2026-10-05T18:45:15.914Z",
  "updatedAt": "2026-10-05T18:45:15.914Z",
  "body": "Hello from Chirpy!",
  "userId": "uuid"
}
```

---

## Delete Chirp

### `DELETE /api/chirps/:chirpId`

Deletes a chirp.

Requires authentication, and the authenticated user must own the chirp.

### Headers

```text
Authorization: Bearer YOUR_JWT
```

### Response

```text
204 No Content
```

---

# Polka Webhooks

## User Upgrade Webhook

### `POST /api/polka/webhooks`

Handles webhook events from Polka and upgrades users to Chirpy Red.

### Headers

```text
Authorization: ApiKey YOUR_POLKA_KEY
Content-Type: application/json
```

### Request Body

```json
{
  "event": "user.upgraded",
  "data": {
    "userId": "3311741c-680c-4546-99f3-fc9efac2036c"
  }
}
```

### Response

```text
204 No Content
```

Unsupported webhook events are ignored with a `204` response.

---

# Admin Routes

## Metrics

### `GET /admin/metrics`

Returns server usage metrics.

---

## Reset

### `POST /admin/reset`

Resets application data used by the project.

This endpoint is intended for development and testing.

---

# Authentication

Protected endpoints use a Bearer token:

```text
Authorization: Bearer YOUR_TOKEN
```

Refresh-token endpoints use the refresh token in the same header format.

---

# Features

* User registration
* Secure password hashing
* JWT authentication
* Refresh token authentication
* Refresh token revocation
* Protected API routes
* Chirp creation
* Chirp retrieval
* Chirp filtering by author
* Chirp deletion
* Chirpy Red user upgrades
* Polka webhook integration
* PostgreSQL database
* Drizzle ORM
* TypeScript type safety
* HTTP error handling and middleware
* Automated testing with Vitest

## License

This project was created as part of my backend development studies with Boot.dev.
