# **API Documentation**

## **User Service**

#### **POST /users/register**

- **Description**: Register a new user.
- **Request**:
  ```json
  {
    "username": "johndoe",
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "User registered successfully",
    "token": "random_dummy_token"
  }
  ```

#### **POST /users/login**

- **Description**: Login an existing user.
- **Request**:

  ```json
  {
    "email": "johndoe@example.com",
    "message": "User logged in successfully",
    "password": "securepassword"
  }
  ```

- **Response**:
  ```json
  {
    "status": "success",
    "token": "random_dummy_token"
  }
  ```

#### **GET /users/:id** (Protected)

- **Description**: Get user profile by ID.
- **Request** (**Headers**):
  ```http
  Authorization: Bearer <token>
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "username": "johndoe",
      "email": "johndoe",
      "role": "user",
      "createdAt": "2021-09-01T00:00:00.000Z"
    }
  }
  ```

#### **PUT /users/:id** (Protected)

- **Description**: Update user profile by ID.
- **Request**:
  ```json
  {
    "username": "janedoe",
    "email": "newEmail@gmail.com"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "User updated successfully",
    "data": {
      "id": 1,
      "username": "janedoe",
      "email": "newEmail@gmail.com",
      "role": "user",
      "createdAt": "2021-09-01T00:00:00.000Z"
    }
  }
  ```

#### **DELETE /users/:id** (Protected)

- **Description**: Delete user profile by ID.
- **Request** (**Headers**):
  ```http
  Authorization: Bearer <token>
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "User deleted successfully"
  }
  ```

### **Blog Service**

#### **GET /blogs?page=1&&limit=10**

- **Description**: Get paginated blog posts.
- **Request** (**Headers**):

  ```http
  Authorization: Bearer <token>
  ```

- **Response**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "title": "Hello World",
        "content": "This is a sample blog post",
        "authorId": 2,
        "createdAt": "2021-09-01T00:00:00.000Z"
      }
      ...
    ],
    "meta": {
      "totalBlogs": 30,
      "currentPage": 1,
      "totalPages": 3
    }
  }
  ```

#### **POST /blogs** (Protected)

- **Description**: Create a new blog post.
- **Request**:
  ```json
  {
    "title": "Hello World",
    "content": "This is a sample blog post"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Blog created successfully"
  }
  ```

#### **PUT /blogs/:id** (Protected)

- **Description**: Update blog post by ID.
- **Request**:

  ```json
  {
    "content": "This is an updated blog post"
  }
  ```

- **Response**:
  ```json
  {
    "status": "success",
    "message": "Blog updated successfully"
  }
  ```

#### **DELETE /blogs/:id** (Protected)

- **Description**: Delete blog post by ID.
- **Request** (**Headers**):
  ```http
  Authorization: Bearer <token>
  ```
- **Response**:

  ```json
  {
    "status": "success",
    "message": "Blog deleted successfully"
  }
  ```

  #### **GET /blogs/:id**

- **Description**: Get blog post by ID.
- **Request** (**Headers**):
  ```http
  Authorization: Bearer <token>
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "title": "Hello World",
      "content": "This is a sample blog post",
      "authorId": 2,
      "createdAt": "2021-09-01T00:00:00.000Z"
    }
  }
  ```

### **Comment Service**

#### **POST /comments** (Protected)

- **Description**: Create a new comment.
- **Request**:
  ```json
  {
    "content": "This is a sample comment",
    "blogId": 1
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Comment created successfully"
  }
  ```

#### **GET /comments/:postId** (Protected)

- **Description**: Get comments by blog post ID.
- **Request**:
- **Response**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "content": "This is a sample comment",
        "blogId": 1,
        "createdAt": "2021-09-01T00:00:00.000Z"
      }
    ]
  }
  ```
