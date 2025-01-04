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

### **Prerequisites**

- Node.js
- Docker
- AWS Account

### **Steps**

1. **Clone the repository**:

   ```bash
   git clone
   ```

2. **Set up environment variables**:

   - Create a `.env` file in the root directory of each service.
   - Add the following environment variables to the `.env` file:

     ```bash
     # User Service
     PORT=3000
     JWT_SECRET=your_secret_key

     # Blog Service
     PORT=3001

     # Comment Service
     PORT=3002

     # Database
     DATABASE_URL=postgresql://user:password@host:port/db_name
     ```

3. **Navigate to the project directory**:

   ```bash
   cd multi-service-blog-platform
   ```

4. **Start the services**:

   ```bash
    docker-compose up --build
   ```

5. **Access the services**:

   - User Service: `http://localhost:3000`
   - Blog Service: `http://localhost:3001`
   - Comment Service: `http://localhost:3002`

---
