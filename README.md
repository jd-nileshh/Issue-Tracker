# Issue Tracker API

## Project Description

Issue Tracker API is a backend REST API built with Node.js, Express, and MongoDB for managing projects, issues, comments, labels, and team collaboration. It provides authentication, authorization, rate limiting, logging, validation, and production-ready backend architecture.


---

User Flow

    1.User Registration / Login
        - A new user registers an account using their email and password.
        - Existing users log in with valid credentials.
        - Upon successful login, the API generates and returns a JWT token.

    2.Authentication
        - The user includes the JWT token in subsequent requests.
        - Protected routes verify the token before allowing access.

    3.Project Management
        - Users can create new projects.
        - Users can view projects they have access to.
        - Project owners or authorized members can update project details.
        - Projects can be deleted when no longer needed.

    4.Team Collaboration
        - Project owners can invite or add team members.
        - Team members can access assigned projects and contribute to issue management.

    5.Issue Management
        - Users create issues within a project.
        - Issues can include titles, descriptions, priorities, statuses, and labels.
        - Users can update issue details as work progresses.
        - Issues can be assigned to team members.
        - Completed or invalid issues can be closed or deleted.

    6.Labels and Categorization
        - Users create and manage labels.
        - Labels help categorize and organize issues for easier tracking.

    7.Comments and Activity Tracking
        - Team members can add comments to issues.
        - The system records activity logs for important actions such as issue creation, updates, assignments, and status changes.

    8.Search, Filtering, and Pagination
        - Users can search issues and projects.
        - Filtering options help narrow results by status, priority, assignee, or labels.
        - Pagination improves performance when viewing large datasets.

    9.Monitoring and Security
        - Requests are validated before processing.
        - Rate limiting protects the API from abuse.
        - Logging captures application events and errors for monitoring.

    10.Logout
        - The user logs out by removing the stored JWT token on the client side.
        - Any future requests without a valid token will be denied access to protected resources.

---

The API supports:

* User authentication with JWT
* Project management
* Issue tracking
* Comments and activity logs
* Labels and issue categorization
* Pagination and filtering
* Secure middleware and validation
* Graceful shutdown handling
* Logging and monitoring

---

# Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Winston Logger
* Express Rate Limit
* Helmet
* CORS
* bcryptjs

---

# Prerequisites

Before running the project, make sure you have installed:

* Node.js (v18 or higher recommended)
* npm
* MongoDB Atlas account or local MongoDB server
* Git

---

# Setup Instructions

## 1. Clone the Repository

```bash
git clone <https://github.com/jd-nileshh/Issue-Tracker.git>
```

---

## 2. Navigate to Project Folder

```bash
cd issue-tracker
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Create Environment File

Create a `.env` file using `.env.example`.

```bash
cp .env.example .env
```

---

## 5. Fill Environment Variables

Update the `.env` file with your actual values.

Example:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secure_secret_key_at_least_32_characters
```

---

## 6. Seed the Database

```bash
npm run seed
```

---

## 7. Start Development Server

```bash
npm run dev
```

---

# Environment Variables

| Variable    | Purpose                                          | Required |
| ----------- | ------------------------------------------------ | -------- |
| PORT        | Port number for the server                       | Yes      |
| NODE_ENV    | Application environment (development/production) | Yes      |
| MONGODB_URI | MongoDB database connection string               | Yes      |
| JWT_SECRET  | Secret key used for JWT authentication           | Yes      |

---

# API Endpoints

## Authentication Routes

| Method | Endpoint                | Auth Required | Description                            |
| ------ | ----------------------- | ------------- | -------------------------------------- |
| POST   | `/api/v1/auth/register` | No            | Register a new user account            |
| POST   | `/api/v1/auth/login`    | No            | Authenticate user and return JWT token |
| GET    | `/api/v1/auth/me`       | Yes           | Get currently logged-in user profile   |
| POST   | `/api/v1/auth/logout`   | Yes           | Logout the current user                |

---

## User Routes

| Method | Endpoint            | Auth Required | Description                              |
| ------ | ------------------- | ------------- | ---------------------------------------- |
| GET    | `/api/v1/users`     | Yes           | Get all users with pagination and search |
| GET    | `/api/v1/users/:id` | Yes           | Get a single user by ID                  |
| PATCH  | `/api/v1/users/:id` | Yes           | Update user profile details              |
| DELETE | `/api/v1/users/:id` | Yes           | Delete a user account                    |

---

## Project Routes

| Method | Endpoint                               | Auth Required | Description                    |
| ------ | -------------------------------------- | ------------- | ------------------------------ |
| POST   | `/api/v1/projects`                     | Yes           | Create a new project           |
| GET    | `/api/v1/projects`                     | Yes           | Get all active projects        |
| GET    | `/api/v1/projects/:id`                 | Yes           | Get a single project by ID     |
| PATCH  | `/api/v1/projects/:id`                 | Yes           | Update project details         |
| DELETE | `/api/v1/projects/:id`                 | Yes           | Delete a project               |
| POST   | `/api/v1/projects/:id/members`         | Yes           | Add a member to a project      |
| DELETE | `/api/v1/projects/:id/members/:userId` | Yes           | Remove a member from a project |

---

## Issue Routes

| Method | Endpoint                      | Auth Required | Description                                   |
| ------ | ----------------------------- | ------------- | --------------------------------------------- |
| POST   | `/api/v1/issues`              | Yes           | Create a new issue                            |
| GET    | `/api/v1/issues`              | Yes           | Get all issues with filtering and pagination  |
| GET    | `/api/v1/issues/:id`          | Yes           | Get detailed information about a single issue |
| PATCH  | `/api/v1/issues/:id`          | Yes           | Update issue details                          |
| DELETE | `/api/v1/issues/:id`          | Yes           | Delete an issue                               |
| PATCH  | `/api/v1/issues/:id/status`   | Yes           | Update issue status                           |
| PATCH  | `/api/v1/issues/:id/assign`   | Yes           | Assign an issue to a user                     |
| GET    | `/api/v1/issues/:id/activity` | Yes           | Get activity history for an issue             |

---

## Comment Routes

| Method | Endpoint                               | Auth Required | Description                   |
| ------ | -------------------------------------- | ------------- | ----------------------------- |
| POST   | `/api/v1/issues/:issueId/comments`     | Yes           | Add a comment to an issue     |
| GET    | `/api/v1/issues/:issueId/comments`     | Yes           | Get all comments for an issue |
| PATCH  | `/api/v1/issues/:issueId/comments/:id` | Yes           | Update a comment              |
| DELETE | `/api/v1/issues/:issueId/comments/:id` | Yes           | Delete a comment              |

---

## Label Routes

| Method | Endpoint                                 | Auth Required | Description                  |
| ------ | ---------------------------------------- | ------------- | ---------------------------- |
| POST   | `/api/v1/projects/:projectId/labels`     | Yes           | Create a label for a project |
| GET    | `/api/v1/projects/:projectId/labels`     | Yes           | Get all labels for a project |
| PATCH  | `/api/v1/projects/:projectId/labels/:id` | Yes           | Update a label               |
| DELETE | `/api/v1/projects/:projectId/labels/:id` | Yes           | Delete a label               |

---

## Health Check

| Method | Endpoint      | Auth Required | Description                    |
| ------ | ------------- | ------------- | ------------------------------ |
| GET    | `/api/health` | No            | Check API server health status |

---


# Features

* JWT Authentication
* Secure Password Hashing
* RESTful API Architecture
* MongoDB Query Optimization
* Pagination Support
* Advanced Filtering
* Request Logging
* Error Handling Middleware
* Rate Limiting
* NoSQL Injection Protection
* Graceful Shutdown Handling
* Environment Validation

---

# Available Scripts

## Run Development Server

```bash
npm run dev
```

## Start Production Server

```bash
npm start
```

## Seed Database

```bash
npm run seed
```

---

# API Security Features

* Helmet Security Headers
* Rate Limiting
* MongoDB Sanitization
* Environment Validation
* Secure JWT Secrets
* Password Hashing with bcrypt

---

# Logging

The application uses Winston for logging.

* Console logs for development
* Error logs stored in:

```bash
logs/error.log
```

---

# Graceful Shutdown

The server handles:

* SIGINT
* SIGTERM

and safely closes:

* HTTP connections
* MongoDB connections

before shutting down.

---
