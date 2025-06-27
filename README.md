Express MVC Starter
==================================
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.org/oguzhanoya/express-mvc-boilerplate.svg?branch=master)](https://travis-ci.org/oguzhanoya/express-mvc-boilerplate)

> A simple mvc boilerplate for express.js (gulp + expressjs + nodemon + browser-sync)

## Related modules

* express - web application framework for node
* pug - template engine
* stylus - pre-processor CSS
* mongoose - nodejs orm for mongodb
* bower - a package manager for the web
* gulp - automate workflow
* routes => api || web

## Prerequisites

* Node.js `http://nodejs.org`
* MongoDB `brew install mongodb`

## Project Structure
```sh
.
├── app/
│   └── controllers           # contains controller files
│   └── helpers               # contains helper files
│   └── models                # contains model files
│   └── views                 # contains express view (pug) files
├── config/
│   ├── index.js              # environment config file
│   └── db.js                 # db config
├── public/                   # contains static assets
│   ├── components            # bower components folder
│   │   └── ...
│   ├── favicon               # favicon folder
│   ├── fonts                 # contains font files
│   ├── css                   # all files will generate from gulp
│   ├── styl                  # contains style sheets (stylus)
│   ├── js                    # contains js files
│   └── img                   # contains image files
├── routes/
│   ├── web.js                # routes for web
│   └── api.js                # routes for api
├── test/
│   └── spec.js               # unit & func tests
├── .bowerrc                  # bower config
├── .env                      # .env config system
├── .bower.json               # bower dependencies
├── .Procfile                 # process file for heroku implementation
├── .gitignore                # specifies intentionally untracked files to ignore
├── .editorconfig.js          # editor config
├── .gulpfile.js              # gulp config
├── .eslintrc.yml             # eslint config
├── .eslintignore             # eslint ignore specific files and directories config file
├── .travis.yml               # travis ci config
├── app.js                    # app setup file
└── package.json              # build scripts and dependencies

```

## Getting Started

The easiest way to get started is to clone the repository:

```sh
# Get the latest snapshot
$ git clone https://github.com/alicompu/express-mvc-starter.git myproject
$ cd myproject

# Install dependencies
$ npm install
$ bower install

$ node app.js
```

## Development

    npm run start
    
Your app should now be running on [localhost:3000](http://localhost:3000/).


# 📘 User API Documentation

## 🧑‍💼 Create a New User

**Endpoint:**
`POST /user/create`

**Params:** `No` 

**Request Body:**

```json
{
  "name": "Numan Latif",
  "userName": "mnumanlatif",
  "email": "mnumanlatif@stdltd.com",
  "password": "myname123",
  "department": "Development",
  "age": 18
}
```

**Success Response:**

```json
{
  "message": "User created",
  "user": {
    "_id": "685e199b017a8334acf26629",
    "userId": "81a1ca1f-596f-47ec-aa43-4cd6f79e0807",
    "name": "Numan Latif",
    "userName": "mnumanlatif",
    "email": "mnumanlatif@stdltd.com",
    "password": "$2b$12$/CahA9L7iQo68cF81.RZVe//X1QrqRpeGZcM5Fs/K4EiDK7X5Mj6S",
    "department": "Development",
    "age": 18,
    "createdAt": "2025-06-27T04:10:03.127Z",
    "updatedAt": "2025-06-27T04:10:03.127Z",
    "__v": 0
  }
}
```

---

## ✏️ Update User Details

**Endpoint:**
`PUT /user/:id`

**Params:** `id`

**Request Body:**

```json
{
  "name": "Muhammad Numan",
  "department": "IT Support"
}
```

**Success Response:**

```json
{
  "message": "User Data updated",
  "user": {
    "_id": "685e199b017a8334acf26629",
    "userId": "81a1ca1f-596f-47ec-aa43-4cd6f79e0807",
    "name": "Muhammad Numan",
    "userName": "mnumanlatif",
    "email": "mnumanlatif@stdltd.com",
    "password": "$2b$12$/CahA9L7iQo68cF81.RZVe//X1QrqRpeGZcM5Fs/K4EiDK7X5Mj6S",
    "department": "IT Support",
    "age": 18,
    "createdAt": "2025-06-27T04:10:03.127Z",
    "updatedAt": "2025-06-27T04:18:17.967Z",
    "__v": 0
  }
}
```

---

## 📋 Get All Users

**Endpoint:**
`GET /user`

**Params**
`No`

**Request Body**
`No`

**Success Response:**

```json
[
  {
    "_id": "685e199b017a8334acf26629",
    "userId": "81a1ca1f-596f-47ec-aa43-4cd6f79e0807",
    "name": "Muhammad Numan",
    "userName": "mnumanlatif",
    "email": "mnumanlatif@stdltd.com",
    "password": "$2b$12$/CahA9L7iQo68cF81.RZVe//X1QrqRpeGZcM5Fs/K4EiDK7X5Mj6S",
    "department": "IT Support",
    "age": 18,
    "createdAt": "2025-06-27T04:10:03.127Z",
    "updatedAt": "2025-06-27T04:18:17.967Z",
    "__v": 0
  },
  {
    "_id": "685e1c99bacaaa0ff4e2eb72",
    "userId": "073a95e4-0009-441e-8edc-9e3a17109d70",
    "name": "Muhammad Usman",
    "userName": "usmanlatif",
    "email": "usmanlatif@stdltd.com",
    "password": "$2b$12$DP9DesBliXxug6EY.3IbgeaTNtfmQRyh3vLIDzdoO7SrET0YXw/m6",
    "department": "Development",
    "age": 28,
    "createdAt": "2025-06-27T04:22:49.957Z",
    "updatedAt": "2025-06-27T04:22:49.957Z",
    "__v": 0
  }
]
```

---

## ❌ Delete a User

**Endpoint:**
`DELETE /user/delete/:id`

**Params**
`id`

**Request Body**
`No`

**Success Response:**

```json
{
  "message": "User and related habits deleted successfully"
}
```
---

## ❌ Throws (Error Responses)

### 🔸 **Validation Error (Joi Schema)**

Occurs when required fields are missing or invalid during user creation or update.

**Example Response:**

```json
{
  "success": false,
  "message": "\"email\" must be a valid email"
}
```

```json
{
  "success": false,
  "message": "\"userName\" is required"
}
```

---

### 🔸 **Duplicate Email or Username**

Occurs when trying to create a user with an existing email or username (must be unique).

**Response:**

```json
{
  "success": false,
  "message": "User with this email or username already exists"
}
```

---

### 🔸 **Invalid User ID Format**

Occurs when the `:id` parameter is not a valid MongoDB ObjectId during update or delete.

**Response:**

```json
{
  "success": false,
  "message": "Invalid user ID format"
}
```

---

### 🔸 **User Not Found**

Occurs when trying to update or delete a non-existent user.

**Response:**

```json
{
  "success": false,
  "message": "User not found"
}
```

---
## 🔖 Notes

* `Passwords` are hashed using bcrypt before being stored.
* Use UUID (`userId`) for client-side operations if needed instead of Mongo `_id`.
* `createdAt` and `updatedAt` are automatically managed timestamps.
---

# 🌟 Habit API Documentation

## 🧑‍💼 Create a New Habit

**Endpoint:**
`POST /habbit/create`

**Params**
`No`

**Request Body:**

```json
{
  "userId": "685e1c99bacaaa0ff4e2eb72",
  "categoryId": "685bc110c3ae96326403d5b1",
  "description": "Jog for 30 minutes every morning.",
  "streak": 5,
  "priority": "high",
  "name": "Morning Jog",
  "frequency": "daily"
}
```

**Success Response:**

```json
{
  "message": "Habit created",
  "habit": {
    "_id": "685e1f93bacaaa0ff4e2eb79",
    "userId": "685e1c99bacaaa0ff4e2eb72",
    "categoryId": "685bc110c3ae96326403d5b1",
    "description": "Jog for 30 minutes every morning.",
    "streak": 5,
    "priority": "high",
    "name": "Morning Jog",
    "frequency": "daily",
    "createdAt": "2025-06-27T04:35:31.172Z",
    "updatedAt": "2025-06-27T04:35:31.172Z",
    "__v": 0
  }
}
```

---

## ✏️ Update Habit Details

**Endpoint:**
`PUT /habbit/:id`

**Params**
`id`

**Request Body:**

```json
{
  "description": "Jog for 50 minutes every morning.",
  "streak": 7,
  "priority": "high",
  "name": "Evening Jog",
  "frequency": "weekly"
}
```

**Success Response:**

```json
{
  "message": "Habit updated",
  "habit": {
    "_id": "685e1f93bacaaa0ff4e2eb79",
    "userId": "685e1c99bacaaa0ff4e2eb72",
    "categoryId": "685bc110c3ae96326403d5b1",
    "description": "Jog for 50 minutes every morning.",
    "streak": 7,
    "priority": "high",
    "name": "Evening Jog",
    "frequency": "weekly",
    "createdAt": "2025-06-27T04:35:31.172Z",
    "updatedAt": "2025-06-27T04:38:40.194Z",
    "__v": 0
  }
}
```

---

## 📋 Get All Habits

**Params**
`No`

**Request Body**
`No`

**Endpoint:**
`GET /habbit`

**Success Response:**

```json
[
  {
    "_id": "685e1f93bacaaa0ff4e2eb79",
    "userId": "685e1c99bacaaa0ff4e2eb72",
    "categoryId": "685bc110c3ae96326403d5b1",
    "description": "Jog for 50 minutes every morning.",
    "streak": 7,
    "priority": "high",
    "name": "Evening Jog",
    "frequency": "weekly",
    "createdAt": "2025-06-27T04:35:31.172Z",
    "updatedAt": "2025-06-27T04:39:48.566Z",
    "__v": 0
  },
  {
    "_id": "685e2106bacaaa0ff4e2eb7e",
    "userId": "685e1c99bacaaa0ff4e2eb72",
    "categoryId": "685bc110c3ae96326403d5b1",
    "description": "Eat Fast food once a week.",
    "streak": 0,
    "priority": "medium",
    "name": "Eating",
    "frequency": "weekly",
    "createdAt": "2025-06-27T04:41:42.360Z",
    "updatedAt": "2025-06-27T04:41:42.360Z",
    "__v": 0
  }
]
```

---


## ❌ Throws (Error Responses)

### 🔸 **Validation Error (Joi Schema)**

Occurs when required fields are missing, wrong type, or invalid format.

**Example Response:**

```json
{
  "success": false,
  "message": "\"name\" is required"
}
```

Or for invalid enum:

```json
{
  "success": false,
  "message": "\"priority\" must be one of [high, medium, low]"
}
```

---

### 🔸 **Invalid `userId` or `categoryId` (Not Found in DB)**

Occurs when foreign keys don't match existing user or category records.

**Response:**

```json
{
  "success": false,
  "message": "User not found"
}
```

or:

```json
{
  "success": false,
  "message": "Category not found"
}
```

---

### 🔸 **Invalid Habit ID Format (on Update)**

Occurs when the `:id` param in the URL is not a valid MongoDB ObjectId.

**Response:**

```json
{
  "success": false,
  "message": "Invalid habit ID format"
}
```

---

### 🔸 **Habit Not Found (on Update)**

Occurs when trying to update a non-existent habit.

**Response:**

```json
{
  "success": false,
  "message": "Habit not found"
}
```

---
## 🔖 Notes

* `userId` and `categoryId` are required foreign keys and should reference existing records.
* `streak` is an integer representing how consistently the habit is followed.
* `priority` can be values like `"high"`, `"medium"`, `"low"` (you may define your own enum).
* `frequency` might be `"daily"`, `"weekly"`, etc., depending on your business logic.


---

# 🌟 **Category API Documentation**

## 🧑‍💼 Create a New Category

**Endpoint:**
`POST /category/create`

**Params**
`No`

**Request Body:**

```json
{
  "categoryName": "Walking",
  "description": "Walking is good for health"
}
```

**Success Response:**

```json
{
  "message": "Category created",
  "category": {
    "_id": "685e26987f20f513ccc3e082",
    "categoryName": "Walking",
    "description": "Walking is good for health",
    "categoryId": "32cfacd9-8597-4114-b1d3-19d5bb6ba453",
    "createdAt": "2025-06-27T05:05:28.770Z",
    "__v": 0
  }
}
```

---

## ✏️ Update Category Details

**Endpoint:**
`PUT /category/:id`

**Params**
`id`

**Request Body:**

```json
{
  "categoryName": "Running",
  "description": "Running is more good for health"
}
```

**Success Response:**

```json
{
  "message": "Category Data updated",
  "category": {
    "_id": "685e26987f20f513ccc3e082",
    "categoryName": "Running",
    "description": "Running is more good for health",
    "categoryId": "32cfacd9-8597-4114-b1d3-19d5bb6ba453",
    "createdAt": "2025-06-27T05:05:28.770Z",
    "__v": 0
  }
}
```

---

## 📋 Get All Categories

**Endpoint:**
`GET /category`

**Params**
`No`

**Request Body**
`No`

**Success Response:**

```json
[
  {
    "_id": "685e23e3794ca16b34d3ad70",
    "categoryName": "Eating",
    "description": "Eating healthy food",
    "categoryId": "a1d484fc-f28a-477c-baec-e7a32bd168aa",
    "createdAt": "2025-06-27T04:53:55.966Z",
    "__v": 0
  },
  {
    "_id": "685e26987f20f513ccc3e082",
    "categoryName": "Running",
    "description": "Running is more good for health",
    "categoryId": "32cfacd9-8597-4114-b1d3-19d5bb6ba453",
    "createdAt": "2025-06-27T05:05:28.770Z",
    "__v": 0
  }
]
```

---

## ❌ Throws (Error Responses)

### 🔸 **Validation Error (Joi Schema)**

Occurs when required fields are missing or invalid.

**Response:**

```json
{
  "success": false,
  "message": "\"categoryName\" is required"
}
```

Or, for invalid type:

```json
{
  "success": false,
  "message": "\"description\" must be a string"
}
```

---

### 🔸 **Duplicate Category Name**

Occurs when trying to create a category with a `categoryName` that already exists.

**Response:**

```json
{
  "success": false,
  "message": "Category with this name already exists"
}
```

---

### 🔸 **Invalid Category ID (on update)**

Occurs when the provided `:id` param is not a valid MongoDB ObjectId.

**Response:**

```json
{
  "success": false,
  "message": "Invalid category ID format"
}
```

---

### 🔸 **Category Not Found**

Occurs when trying to update a category that does not exist.

**Response:**

```json
{
  "success": false,
  "message": "Category not found"
}
```

---


## 🔖 Notes

* **`categoryId`** is a UUID automatically generated on category creation.
* **`categoryName`** must be unique and non-null.
* **`description`** is required and should clearly describe the category’s purpose.
* Ensure your frontend input uses the correct keys: `categoryName` and `description`.

---



## Test

    npm test

## Lint

    npm run lint

## Docker Support

* Docker `https://docs.docker.com/engine/installation/`

```
# Build the project
docker-compose build  

# Start the application
docker-compose up
```

## Deploy

Make sure you have the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```
heroku create
git push heroku master
heroku open
```
## Contact
Site me for help you [Ali Najafi](http://alinajaficv.ir/)

## License

MIT
