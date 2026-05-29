# Task Collaboration System

## Overview

Task Collaboration System is a full-stack web application designed to help teams and organizations manage tasks, collaborate efficiently, and track project progress. The platform provides secure authentication, team management, task assignment, administrative controls, and email-based account management.

---

## Features

### Authentication & Security

* User Sign Up and Login
* JWT Authentication (Access & Refresh Tokens)
* Password Hashing using Werkzeug Security
* Forgot Password Functionality
* Password Reset via Email
* Force Password Reset for New Users
* User Session Management

### User Management

* User Registration
* Profile Management
* Role-Based Access Control
* Active/Inactive User Status
* Admin User Creation
* User Deletion by Admin

### Team Management

* Create Teams
* Join Teams
* Leave Teams
* View Team Members
* Team Membership Management

### Task Management

* Create Tasks
* Update Tasks
* Delete Tasks
* Mark Tasks as Completed
* View Personal Tasks
* Task Ownership Tracking

### Admin Dashboard

* User Statistics
* Task Statistics
* Team Statistics
* User Management Panel
* Administrative Controls

### Email Notifications

* Welcome Emails
* Temporary Password Emails
* Password Reset Emails
* Security Alert Emails

---

## Technology Stack

### Frontend

* React
* React Router DOM
* Axios
* React Hot Toast
* React Icons
* Tailwind CSS
* Vite

### Backend

* Flask
* Flask SQLAlchemy
* Flask Migrate
* Flask JWT Extended
* Flask Mail
* Flask CORS

### Database

* PostgreSQL

---

## Project Structure

```text
task_collaboration_system/

├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── routes/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── extensions.py
│   │   └── config.py
│   ├── migrations/
│   ├── run.py
│   └── requirements.txt
│
├── README.md
└── .gitignore
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd task_collaboration_system
```

---

## Backend Setup

Navigate to server directory:

```bash
cd server
```

Create virtual environment:

```bash
python3 -m venv venv
```

Activate virtual environment:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret-key

DATABASE_URL=postgresql://localhost/task_collaboration_db

MAIL_SERVER=smtp.gmail.com
MAIL_PORT=465
MAIL_USE_TLS=False
MAIL_USE_SSL=True

MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_DEFAULT_SENDER=your-email@gmail.com

FRONTEND_URL=http://localhost:5173
```

Run database migrations:

```bash
flask db upgrade
```

Start backend server:

```bash
python3 run.py
```

---

## Frontend Setup

Navigate to client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint                         |
| ------ | -------------------------------- |
| POST   | /api/auth/register               |
| POST   | /api/auth/login                  |
| POST   | /api/auth/forgot-password        |
| POST   | /api/auth/reset-password/<token> |
| GET    | /api/auth/me                     |

### Tasks

| Method | Endpoint        |
| ------ | --------------- |
| GET    | /api/tasks      |
| POST   | /api/tasks      |
| PUT    | /api/tasks/<id> |
| DELETE | /api/tasks/<id> |

### Teams

| Method | Endpoint              |
| ------ | --------------------- |
| GET    | /api/teams            |
| POST   | /api/teams            |
| POST   | /api/teams/<id>/join  |
| POST   | /api/teams/<id>/leave |

### Admin

| Method | Endpoint              |
| ------ | --------------------- |
| GET    | /api/admin/users      |
| POST   | /api/admin/users      |
| DELETE | /api/admin/users/<id> |

---

## Default Admin Account

```text
Email: admin@taskcollab.com
Password: Admin@123
```

Note: Change the default password immediately after deployment.

---

## Future Improvements

* Real-time notifications
* Team chat functionality
* File uploads and attachments
* Task comments
* Task deadlines and reminders
* Activity logs
* Audit trails
* Mobile application
* Docker deployment
* CI/CD integration

---

## Author

Developed by Ebrahim Ogejo

---

## License

This project is intended for educational and portfolio purposes.
