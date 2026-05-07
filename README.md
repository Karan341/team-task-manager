# 🚀 Team Task Manager (Full Stack Application)

A full-stack web application that allows teams to manage projects, assign tasks, and track progress with role-based access control (Admin / Member).

---

## 🔗 Live Demo

🌐 Frontend: https://team-task-managerr.netlify.app  
⚙️ Backend: https://team-task-manager-production-661a.up.railway.app  

---

## 📦 GitHub Repository

👉 https://github.com/Karan341/team-task-manager

---

## ✨ Features

### 🔐 Authentication
- User Signup and Login
- Secure authentication using JWT
- Role-based access (Admin / Member)

### 👥 Project & Team Management
- Create and manage projects
- Add members to a project

### 📝 Task Management
- Create tasks
- Assign tasks to specific users
- Update task status (Pending / Completed)
- Delete tasks

### 📊 Dashboard
- Admin: Can view all tasks
- Member: Can view only assigned tasks

Each task displays:
- Assigned user
- Created by
- Assigned date
- Due date
- Overdue indicator ⚠️

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication

### Deployment
- Frontend → Netlify
- Backend → Railway
- Database → MongoDB Atlas

---

## ⚙️ Local Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Karan341/team-task-manager.git
cd team-task-manager
```
## 2. Backend Setup

```bash
cd backend
npm install
npm start
```
Create a .env file inside the backend folder:
```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
## 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
## Future Improvements
 - User dropdown for task assignment
 - Project-based filtering
 - Notifications system
 - Improved UI/UX design
   ```
  ##Author
  Karan
   GitHub: https://github.com/Karan341
  
  
   




   

   
