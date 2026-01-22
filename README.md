# Project Management & Collaboration Platform

A comprehensive full-stack web application designed for team collaboration, project management, and real-time communication. Built with modern technologies, this platform supports role-based access control (Admin, Project Manager, Team Member) with features including task management, project chat, notifications, and activity tracking.

## 🎯 Features

- **Role-Based Access Control**: Three-tier user system with Admin, Project Manager, and Team Member roles
- **Project Management**: Create, manage, and track projects with task assignments
- **Real-Time Communication**: Live chat functionality for projects with Socket.io
- **Task Management**: Kanban board interface for visual task tracking and status updates
- **Notifications**: Real-time notifications for task updates, comments, and project changes
- **Activity Tracking**: Comprehensive activity logs and history
- **Team Collaboration**: Comments, @mentions, and collaborative features
- **Admin Dashboard**: System metrics, user management, and project oversight
- **Responsive UI**: Mobile-friendly design using React and Tailwind CSS

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Real-Time**: Socket.io
- **Authentication**: JWT-based auth with middleware
- **Testing**: ESLint for code quality

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS, PostCSS
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Icons**: React Icons (Font Awesome)
- **Build Tool**: Vite
- **Linting**: ESLint

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose

## 📁 Project Structure

```
├── backend/                    # Express API server
│   ├── src/
│   │   ├── app.js             # Express app setup
│   │   ├── server.js          # Server entry point
│   │   ├── config/            # Database configuration
│   │   ├── controllers/       # Route handlers
│   │   ├── models/            # MongoDB schemas
│   │   ├── middleware/        # Auth, error handling, role-based access
│   │   ├── routes/            # API endpoints
│   │   ├── socket/            # Real-time communication
│   │   └── utils/             # Helper functions
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── api/               # API service calls
│   │   ├── components/        # Reusable components (Admin, PM, TM, UI)
│   │   ├── layouts/           # Layout components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   └── socket.js          # Socket.io client setup
│   ├── Dockerfile
│   ├── vite.config.js
│   └── package.json
│
└── docker-compose.yml         # Container orchestration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- MongoDB (for local development without Docker)

### Installation & Setup

#### Option 1: Using Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coursework-group-21-1
   ```

2. **Build and run containers**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:4000`

#### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coursework-group-21-1
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the `backend/` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/project-management
   JWT_SECRET=your_jwt_secret_key
   PORT=4000
   NODE_ENV=development
   ```

4. **Start backend server**
   ```bash
   npm start
   ```

5. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

6. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:4000`

## 📋 Available Scripts

### Backend
```bash
npm start          # Start the server
npm run dev        # Development mode with hot reload
npm run lint       # Run ESLint
```

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. The `authMiddleware.js` verifies tokens, while `roleMiddleware.js` enforces role-based access control.

**Default User Roles:**
- **Admin**: Full system access, user management, metrics
- **Project Manager**: Create/manage projects, assign tasks, manage team members
- **Team Member**: View assigned tasks, submit updates, participate in chat

## 🔌 API Endpoints

The backend provides RESTful APIs for:
- **Auth**: Login, logout, user registration
- **Users**: User management and profiles
- **Projects**: CRUD operations for projects
- **Tasks**: Task creation, assignment, and updates
- **Chat**: Project chat and messaging
- **Comments**: Task and project comments
- **Notifications**: Notification management
- **Activities**: Activity history and logging
- **Dashboard**: Metrics and statistics

For detailed API documentation, refer to individual route files in `backend/src/routes/`.

## 🔄 Real-Time Features

Socket.io enables real-time updates for:
- Live chat messages
- Task updates and status changes
- Typing indicators
- Notification broadcasts
- Activity feeds

## 🐳 Docker Configuration

Each service has its own Dockerfile for containerization. Services are orchestrated via `docker-compose.yml`:

```bash
docker-compose up                # Start all services
docker-compose down              # Stop all services
docker-compose logs -f           # View logs
docker-compose ps                # View running containers
```

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI          # MongoDB connection string
JWT_SECRET           # Secret key for JWT signing
PORT                 # Server port (default: 4000)
NODE_ENV             # Environment (development/production)
```

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📄 License

This project is part of the PUSL3120 Assessment. All rights reserved.

## 👥 Team

Group 21 - PUSL3120 Assessment

---

**Last Updated**: January 2026
