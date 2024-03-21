# Donataz-Assignment
Role based authentication
# Authentication API Server Documentation

This documentation provides details on how to use the authentication API server for user registration, login, profile management, and other related functionalities.

## Base URL

The base URL for accessing the authentication API server is:

* `https://donataz.onrender.com`

## Endpoints

### Register a New User

#### Endpoint

* POST `/donatuz/register`

#### Request Body

- `name`: String (required) - User's name.
- `email`: String (required) - User's email address.
- `password`: String (required) - User's password.
- `otp`: String (optional) - One-time password (OTP) for account verification.

#### Response

- `user`: Object - Newly registered user details.
- `message`: String - Success message indicating successful registration.

### User Login

#### Endpoint

POST `/donatuz/login`

#### Request Body

- `email`: String (required) - User's email address.
- `password`: String (required) - User's password.

#### Response

- `token`: String - JWT token for authenticated user.
- `message`: String - Success message indicating successful login.

### Get User Profile

#### Endpoint

GET `/donatuz/profile`

#### Request Headers

- `token`: String (required) - JWT token obtained after successful login.

#### Response

- `token`: String - JWT token for authenticated user.
- `userpersent`: Object - User profile details.
- `message`: String - Success message indicating successful retrieval of user profile.

### Update User Profile Picture

#### Endpoint

PATCH `/donatuz/profileupdate`

#### Request Headers

- `token`: String (required) - JWT token obtained after successful login.

#### Request Body

- `avatar`: String (required) - URL of the new profile picture.

#### Response

- `status`: Boolean - Indicates whether the profile picture was updated successfully.
- `message`: String - Success message indicating successful profile picture update.
- `user`: Object - Updated user details.

### Get All Users

#### Endpoint

GET `/donatuz/userdata`

#### Request Headers

- `token`: String (required) - JWT token obtained after successful login.

#### Response

- `users`: Array - Array of user objects containing user details.

### Get OTP for Password Reset

#### Endpoint

POST `/donatuz/getotp`

#### Request Body

- `email`: String (required) - User's email address.

#### Response

- `message`: String - Success message indicating that the OTP has been sent to the user's email.

### Update User Password

#### Endpoint

PATCH `/donatuz/updatepassword`

#### Request Body

- `email`: String (required) - User's email address.
- `otp`: String (required) - One-time password (OTP) received by the user.
- `newPassword`: String (required) - User's new password.

#### Response

- `message`: String - Success message indicating successful password update.

### Update User Details

#### Endpoint

PUT `/donatuz/userupdate/:id`

#### Request Headers

- `token`: String (required) - JWT token obtained after successful login.

#### Request Params

- `id`: String (required) - User ID to update.

#### Request Body

- `name`: String - Updated user's name.
- `email`: String - Updated user's email address.
- `password`: String - Updated user's password.
- `avatar`: String - Updated user's profile picture URL.
- `role`: String - Updated user's role (admin or user).

#### Response

- `status`: Boolean - Indicates whether the user details were updated successfully.
- `message`: String - Success message indicating successful user update.

### Delete a User

#### Endpoint

DELETE `/donatuz/delete/:id`

#### Request Headers

- `token`: String (required) - JWT token obtained after successful login.

#### Request Params

- `id`: String (required) - User ID to delete.

#### Response

- `status`: Boolean - Indicates whether the user was deleted successfully.
- `message`: String - Success message indicating successful user deletion.

## Authentication Middleware

The API server uses JWT tokens for authentication. To access protected endpoints, clients must include a valid JWT token in the request headers.

Example:

{
`"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`
}


Ensure to obtain a JWT token by logging in before accessing protected endpoints.


