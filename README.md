# **Multi-Service Blog Platform**

A deployable multi-service blog platform built using Docker and AWS. This project demonstrates containerization, service orchestration, backend development, and cloud deployment.

---

## **Features**

1. **User Service**:

   - Handles user authentication and profile management.
   - JWT-based authentication with secure password storage using bcrypt.

2. **Blog Service**:

   - Manages blog posts with pagination support.

3. **Comment Service**:

   - Supports flat comments initially with an option to extend to nested comments.

4. **Database**:
   - PostgreSQL is used for data storage with separate schemas for each service.

---

## **Tech Stack**

- **Backend**: Node.js, Express, Prisma
- **Database**: PostgreSQL
- **Containerization**: Docker
- **Cloud Deployment**: AWS (EC2)

---

## **Setup Instructions**

### **Local Setup**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/sanuj21/multiServiceApp.git
   ```

2. **Set up environment variables**:

   - Create a `.env.local` file in the root directory.

     ```bash
     USER_SERVICE_PORT=3000
     BLOG_SERVICE_PORT=3001
     COMMENT_SERVICE_PORT=3002

     DATABASE_USER=user
     DATABASE_PASSWORD=password
     DATABASE_PORT=5432
     DATABASE_URL=postgresql://user:password@host:port/db_name
     DATABASE_NAME=db_name
     ENVIRONMENT=local
     # JWT
     JWT_SECRET=secret
     JWT_COOKIE_EXPIRES_IN=30
     TOKEN_VALIDITY=30d
     ```

3. **Navigate to the project directory**:

   ```bash
   cd multi-service-blog-platform
   ```

4. **Start the services**:

   ```bash
    docker-compose --env-file .env.local up --build
   ```

5. **Access the services**:

   - User Service: `http://localhost:3000`
   - Blog Service: `http://localhost:3001`
   - Comment Service: `http://localhost:3002`

### **AWS Deployment**

---

## **API Documentation**

For API documentation, refer to the [DOCUMENTATION.md](DOCUMENTATION.md) file.
