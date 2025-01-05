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
   sudo apt update -y
   sudo apt install docker.io -y
   sudo apt install docker-compose -y
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
   - User Service: `http://<ec2-public-ip>/users`
   - Blog Service: `http://<ec2-public-ip>/blogs`
   - Comment Service: `http://<ec2-public-ip>/comments`

---

### **DigitalOcean Deployment**

1. **Create a Droplet**:

   - Launch a Droplet.

2. **Create a Managed Database**:

   - Launch a Managed Database and choose Postgres.

3. **Create a ssh key**:

   - Create an SSH key and add it to the Droplet.

4. **SSH into the Droplet**:

   ```bash
   ssh root@<droplet-public-ip>
   ```

**_Now, Repeat steps 4 to 9 from the AWS Deployment section_**.

**Note: I have used the same services but on DigitalOcean because while running docker on AWS EC2 free tier, it was not able to run all the services due to memory constraints(out of memory error).**

### **Live Demo**

- **User Service**: http://143.244.143.187/users
- **Blog Service**: http://143.244.143.187/blogs
- **Comment Service**: http://143.244.143.187/comments

  **_Note: I could not apply SSL certificate to the services as I needed a domain for that, and freenom is not providing free domain registration at the moment, will update the links once I get a domain._**

### **Test Credentials**

- **User Service**:
  - Email: `admin@gmail.com`
  - Password: `anuj1234`

## **Trade-offs**

1. **Database Schema**:

   - I have used a single database with separate schemas for each service rather than using separate databases for each service. This is because we can't establish clear relationship between entities if we use separate databases for each service.

2. **Service Communication**:

   - I have used REST API for service communication instead of gRPc mainly because of the simplicity of REST API for this use case.

## **API Documentation**

For API documentation, refer to the [DOCUMENTATION.md](DOCUMENTATION.md) file.
