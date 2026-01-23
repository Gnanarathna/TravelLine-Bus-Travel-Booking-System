# NovaFlow - Project Management System

![NovaFlow](https://img.shields.io/badge/NovaFlow-PMS-blue)
![Status](https://img.shields.io/badge/Status-Production--Ready-green)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Docker Deployment](#-docker-deployment)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Configuration](#️-configuration)
- [Development](#-development)
- [Testing](#-testing)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Troubleshooting](#-troubleshooting)
- [Team & Contributors](#-team--contributors)

## 🎯 Overview

**NovaFlow** is a comprehensive, full-stack Project Management System designed to streamline project workflows, team collaboration, and task management. Built with modern technologies, it provides an intuitive interface for managing projects, tracking progress, and facilitating team communication.

This project was developed as part of the PUSL3120 Assessment and demonstrates professional-grade software engineering practices including containerization, microservices architecture, and responsive UI design.

## ✨ Features

### Core Functionality
- 📊 **Project Management** - Create, update, and manage multiple projects
- 👥 **Team Collaboration** - Assign tasks, manage team members, and track contributions
- ✅ **Task Management** - Create tasks, set priorities, track status, and deadlines
- 📈 **Progress Tracking** - Real-time project progress visualization and reporting
- 🔔 **Notifications** - Real-time updates and notifications for project activities
- 🔐 **Authentication & Authorization** - Secure user authentication with JWT tokens
- 📱 **Responsive Design** - Optimized for desktop and mobile devices
- 🎨 **Modern UI/UX** - Intuitive and user-friendly interface

### Advanced Features
- 🔄 **Real-time Updates** - Live data synchronization
- 📊 **Analytics Dashboard** - Comprehensive project insights and metrics
- 🔍 **Search & Filter** - Advanced filtering and search capabilities
- 📅 **Calendar Integration** - Schedule management and deadline tracking

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (v7)
- **Authentication:** JWT (JSON Web Tokens)
- **ODM:** Mongoose
- **Environment:** Node.js 14+

### Frontend
- **Framework:** React (Vite)
- **Build Tool:** Vite
- **Styling:** CSS3 / Tailwind CSS / Material-UI
- **State Management:** Redux/Context API
- **HTTP Client:** Axios
- **Package Manager:** npm/yarn

### DevOps & Deployment
- **Containerization:** Docker
- **Orchestration:** Docker Compose
- **Version Control:** Git
- **CI/CD:** Ready for integration

## 🏗 Architecture

```
NovaFlow (Root)
├── backend/                 # Express.js API server
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth, validation, etc.
│   ├── .env                # Environment variables
│   └── server.js           # Entry point
├── frontend/               # React + Vite application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API integration
│   │   └── App.jsx         # Main app component
│   └── vite.config.js      # Vite configuration
├── docker-compose.yml      # Multi-container orchestration
└── README.md               # This file
```

### Service Architecture
- **MongoDB:** Data persistence layer (Port 27017)
- **Backend API:** RESTful API server (Port 4000)
- **Frontend:** React web application (Port 5173)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker** (v20.10+) and **Docker Compose** (v1.29+)
- **Node.js** (v14.0+) and **npm** (v6.0+) - for local development
- **Git** - for version control
- **MongoDB Client** (optional) - for database inspection

## 🚀 Installation & Setup

### Quick Start with Docker (Recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/coursework-group-21-1.git
   cd coursework-group-21-1
   ```

2. **Build and start all services:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8800`
   - MongoDB: `mongodb://localhost:27017`

4. **Stop services:**
   ```bash
   docker-compose down
   ```

### Local Development Setup

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env

# Update .env with your configuration
npm start
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🐳 Docker Deployment

### Configuration

The `docker-compose.yml` includes:
- **MongoDB 7** - Containerized database with persistent volume
- **Backend** - Express.js API running on port 4000 (exposed as 8800)
- **Frontend** - React application running on port 5173

### Environment Variables

**Backend (.env)**
```
PORT=4000
MONGO_URI=mongodb://mongo:27017/pms_db
JWT_SECRET=supersecretkey
NODE_ENV=production
```

### Volume Management

```bash
# View volumes
docker volume ls

# Remove volumes (WARNING: deletes data)
docker-compose down -v

# Backup database
docker exec coursework-21-mongo mongodump --out /data/backup
```

### Container Commands

```bash
# View logs
docker-compose logs -f

# Access backend shell
docker exec -it coursework-21-backend sh

# Access MongoDB shell
docker exec -it coursework-21-mongo mongosh

# Restart services
docker-compose restart
```

## 📂 Project Structure

```
coursework-group-21-1/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Task.js
│   │   └── ...
│   ├── routes/
│   │   ├── auth.js
│   │   ├── projects.js
│   │   ├── tasks.js
│   │   └── ...
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── App.jsx
│   ├── public/
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 📚 API Documentation

### Base URL
```
http://localhost:8800/api
```

### Authentication Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/refresh` - Refresh JWT token

### Project Endpoints
- `GET /projects` - List all projects
- `POST /projects` - Create new project
- `GET /projects/:id` - Get project details
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Task Endpoints
- `GET /tasks` - List all tasks
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `GET /tasks/project/:projectId` - Get tasks by project

### User Endpoints
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users` - List all users (admin)

## ⚙️ Configuration

### Backend Configuration Files

Create a `.env` file in the backend directory:

```env
# Server
PORT=4000
NODE_ENV=development

# Database
MONGO_URI=mongodb://mongo:27017/pms_db

# Authentication
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=7d

# CORS
CORS_ORIGIN=http://localhost:5173

# Email (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Frontend Configuration

Update `vite.config.js`:
```javascript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8800',
        changeOrigin: true,
      }
    }
  }
})
```

## 🔧 Development

### Running in Development Mode

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: MongoDB (if not using Docker)
mongod
```

### Hot Reload
- Backend: Uses Nodemon for automatic restart
- Frontend: Vite provides instant HMR (Hot Module Replacement)

### Code Standards
- Follow ESLint configuration
- Use Prettier for code formatting
- Maintain consistent naming conventions
- Write meaningful commit messages

## 🧪 Testing

### Test Structure

```
backend/
├── tests/
│   ├── unit/           # Unit tests
│   ├── integration/    # Integration tests
│   └── e2e/           # End-to-end tests

frontend/
├── src/
│   ├── __tests__/     # Component tests
│   └── components/
│       └── __tests__/ # Component-specific tests
```

### Backend Testing

**Technologies Used:**
- **Jest** - Testing framework
- **Supertest** - HTTP assertions
- **MongoDB Memory Server** - In-memory database for testing

**Run Backend Tests:**
```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- auth.test.js
```

**Example Test Structure:**
```javascript
// backend/tests/unit/auth.test.js
describe('Authentication', () => {
  test('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({ username: 'test', email: 'test@example.com', password: '123456' });
    expect(response.status).toBe(201);
  });
});```

### Frontend Testing

**Technologies Used:**
- **Vitest** - Fast unit test framework
- **React Testing Library** - Component testing
- **Jest DOM** - Custom matchers

**Run Frontend Tests:**
```bash
cd frontend

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm test -- --ui

# Generate coverage report
npm test -- --coverage
```

**Example Component Test:**
```javascript
// frontend/src/components/__tests__/Login.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';

test('renders login form', () => {
  render(<Login />);
  expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});
```

### Integration Testing

**Run Integration Tests:**
```bash
# Start test environment
docker-compose -f docker-compose.test.yml up -d

# Run integration tests
npm run test:integration

# Stop test environment
docker-compose -f docker-compose.test.yml down
```

### End-to-End Testing

**Technologies Used:**
- **Cypress** or **Playwright** - E2E testing

**Run E2E Tests:**
```bash
# Open Cypress Test Runner
npm run cypress:open

# Run Cypress tests headless
npm run cypress:run

# Run specific test suite
npm run cypress:run -- --spec "cypress/e2e/auth.cy.js"
```

### Test Coverage Requirements

- **Unit Tests:** > 80% coverage
- **Integration Tests:** All critical API endpoints
- **E2E Tests:** Main user workflows
- **Component Tests:** All major UI components

### Testing Best Practices

- Write tests before fixing bugs
- Keep tests isolated and independent
- Use descriptive test names
- Mock external dependencies
- Test edge cases and error scenarios
- Maintain test data fixtures

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow

The project uses GitHub Actions for continuous integration and deployment.

**Workflow File:** `.github/workflows/ci-cd.yml`

### CI Pipeline

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main`
- Manual workflow dispatch

**Pipeline Stages:**
```yaml
- name: Lint Code
  run: |
    cd backend && npm run lint
    cd frontend && npm run lint
```

2. **Backend Tests**
```yaml
- name: Run Backend Tests
  run: |
    cd backend
    npm install
    npm test -- --coverage
```

3. **Frontend Tests**
```yaml
- name: Run Frontend Tests
  run: |
    cd frontend
    npm install
    npm test -- --coverage
```

4. **Build Docker Images**
```yaml
- name: Build Images
  run: docker-compose build
```

5. **Integration Tests**
```yaml
- name: Run Integration Tests
  run: |
    docker-compose up -d
    sleep 10
    npm run test:integration
    docker-compose down
```

### CD Pipeline (Deployment)

**Deployment Environments:**
- **Development:** Auto-deploy on push to `develop`
- **Staging:** Auto-deploy on push to `staging`
- **Production:** Manual approval required

**Deployment Steps:**

1. **Build & Push Docker Images**
```yaml
- name: Build and Push
  run: |
    docker build -t novaflow-backend:${{ github.sha }} ./backend
    docker build -t novaflow-frontend:${{ github.sha }} ./frontend
    docker push novaflow-backend:${{ github.sha }}
    docker push novaflow-frontend:${{ github.sha }}
```

2. **Deploy to Server**
```yaml
- name: Deploy to Production
  run: |
    ssh user@server 'cd /app && docker-compose pull && docker-compose up -d'
```

3. **Health Check**
```yaml
- name: Verify Deployment
  run: |
    curl -f http://your-server/health || exit 1
```

### Environment Variables (CI/CD)

Set these secrets in GitHub repository settings:

```
DOCKER_USERNAME=<docker-hub-username>
DOCKER_PASSWORD=<docker-hub-password>
SERVER_HOST=<deployment-server-ip>
SERVER_USER=<ssh-username>
SSH_PRIVATE_KEY=<ssh-private-key>
MONGO_URI_PROD=<production-mongodb-uri>
JWT_SECRET_PROD=<production-jwt-secret>
```

### Pipeline Configuration Example

Create `.github/workflows/ci-cd.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install Dependencies
        run: |
          cd backend && npm ci
          cd ../frontend && npm ci
      
      - name: Run Tests
        run: |
          cd backend && npm test -- --coverage
          cd ../frontend && npm test -- --coverage
      
      - name: Upload Coverage
        uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker Images
        run: docker-compose build
      
      - name: Run Integration Tests
        run: |
          docker-compose up -d
          sleep 10
          npm run test:integration
          docker-compose down

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Production
        run: |
          echo "Deploying to production..."
          # Add deployment commands
```

### Monitoring & Alerts

- **Build Status Badges:** Display in README
- **Test Coverage Reports:** Codecov/Coveralls integration
- **Slack/Discord Notifications:** On build failures
- **Email Alerts:** Critical deployment issues

### Deployment Commands

```bash
# Manual deployment
npm run deploy:staging
npm run deploy:production

# Rollback to previous version
npm run rollback

# View deployment logs
npm run logs:production
```

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill process on port
lsof -ti:8800 | xargs kill -9
lsof -ti:5173 | xargs kill -9
lsof -ti:27017 | xargs kill -9
```

**MongoDB Connection Error**
```bash
# Ensure MongoDB is running
docker ps | grep mongo

# Check MongoDB logs
docker-compose logs mongo
```

**Frontend Can't Connect to Backend**
- Verify backend is running on port 8800
- Check CORS configuration in backend
- Ensure API URL is correct in frontend `.env`

**Docker Permission Issues**
```bash
# Add user to docker group (Linux)
sudo usermod -aG docker $USER
```

**Clear Docker Cache**
```bash
docker system prune -a
docker-compose build --no-cache
```

## 👥 Team & Contributors

**Group 21**
- Member 1 - Login Authentication and Admin Panel
- Member 2 - Manage the Projects and Project Dashboard
- Member 3 - Manage Project Members
- Member 4 - Manage Task and Kanban Board
- Member 5 - Team Dashboard and Comment Section
- Member 6 - Real Time Chat System
- Member 7 - Notification System
- Member 8 - Manage Files and Testing the System

**Academic Information**
- Course: PUSL3120 Full-Stack Coursework
- Institution: University of Plymouth
- Submission Date: 23/01/2026

---

**Last Updated:** 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
