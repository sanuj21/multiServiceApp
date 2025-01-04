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

2. **Navigate to the project directory**:

   ```bash
   cd multiServiceApp
   ```

3. **Set up environment variables**:

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

4. **Start the services**:

   ```bash
    docker-compose --env-file .env.local up --build
   ```

5. **Access the services**:

   - User Service: `http://localhost:3000`
   - Blog Service: `http://localhost:3001`
   - Comment Service: `http://localhost:3002`

---

### **AWS Deployment**

1. **Create an EC2 instance**:

   - Launch an EC2 instance.

2. **Create a RDS instance**:

   - Launch a PostgreSQL RDS instance and attach it to the EC2 created.

3. **SSH into the EC2 instance**:

   ```bash
   ssh -i <key.pem> ec2-user@<ec2-public-ip>
   ```

4. **Install Docker and Docker Compose**:

   ```bash
   sudo yum update -y
   sudo amazon-linux-extras install docker
   sudo service docker start
   sudo usermod -a -G docker ec2-user
   sudo yum install -y git
   sudo yum install -y docker-compose
   ```

5. **Clone the repository**:

   ```bash
   git clone https://github.com/sanuj21/multiServiceApp.git
   ```

6. **Navigate to the project directory**:

   ```bash
   cd multiServiceApp
   ```

7. **Set up environment variables**:

   - Create a `.env.production` file in the root directory.

     ```bash
     USER_SERVICE_PORT=3000
     BLOG_SERVICE_PORT=3001
     COMMENT_SERVICE_PORT=3002

     DATABASE_URL=postgresql://user:password@host:port/db_name
     DATABASE_NAME=db_name
     ENVIRONMENT=production
     # JWT
     JWT_SECRET=secret
     JWT_COOKIE_EXPIRES_IN=30
     TOKEN_VALIDITY=30d
     ```

8. **Start the services**:

   ```bash
    docker-compose -f docker-compose.prod.yml --env-file .env.production up --build
   ```

9. **Access the services**:
   - User Service: `http://<ec2-public-ip>:3000`
   - Blog Service: `http://<ec2-public-ip>:3001`
   - Comment Service: `http://<ec2-public-ip>:3002`

---

## **API Documentation**

For API documentation, refer to the [DOCUMENTATION.md](DOCUMENTATION.md) file.
