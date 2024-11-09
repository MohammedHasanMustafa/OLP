# Online Learning Platform (OLP) - MERN Stack

## Overview

This Online Learning Platform (OLP) is a full-stack web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) to offer an online course management system. It allows users to browse, enroll, and complete courses, with features like interactive discussion forums, certificates, and paid content.

## Features

- **User Authentication**: Secure registration, login, and role management (student, instructor, admin).
- **Course Management**: Instructors can upload, manage, and track courses.
- **Progress Tracking**: Students can track their course progress, interact with other learners, and access certificates.
- **Payment Integration**: Paid courses with a payment system.
- **Responsive UI**: Built with React.js using Material-UI and Bootstrap for a seamless user experience.

## Prerequisites

- **Node.js** (v16 or later)
- **npm** (Node Package Manager)
- **MongoDB** (Local or Cloud instance)

### Tools

- **Vite**: Fast build tool for React.js
- **MongoDB**: NoSQL database for data storage

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/online-learning-platform.git
cd online-learning-platform

### Step 2: Install Dependencies
Install the required dependencies for both the frontend and backend:

cd frontend
npm install
cd ../backend
npm install

Step 3: Set Up Environment Variables
Create a .env file in the backend directory and configure the necessary environment variables:

env
Copy code
MONGODB_URI=mongodb://localhost:27017/olp
JWT_SECRET=your_jwt_secret_key
PORT=5000
Step 4: Run the Application
Start the development servers for both the frontend and backend:

Backend:
bash
Copy code
cd backend
npm start
Frontend:
bash
Copy code
cd frontend
npm run dev
The app will be accessible at http://localhost:5172.


Backend
The backend is built using Node.js and Express.js, and it connects to a MongoDB database for storing user and course data.

Routes
POST /api/users/register: User registration
POST /api/users/login: User login
GET /api/courses: Get all courses
POST /api/courses: Create a new course (instructor only)
GET /api/courses/
: Get a specific course
PUT /api/courses/
: Update course details
Models
User: Stores user information (name, email, password, role)
Course: Stores course details (title, description, price, educator, sections)
Frontend
The frontend is built using React.js, providing a dynamic and interactive user interface. It uses Vite for fast development and Material-UI for components.

Components
CourseList: Displays all courses available for enrollment.
CourseDetail: Shows details of a selected course and allows users to enroll.
Login: User login form.
Register: User registration form.
Dashboard: Admin and instructor dashboards for managing courses.
Profile: User profile management.
MongoDB Setup
You can use a local MongoDB instance or a cloud solution like MongoDB Atlas. Ensure the database is up and running, and update the MONGODB_URI in the .env file accordingly.

Running the App
After setting up the environment and dependencies, run both the frontend and backend servers. The platform will be accessible at http://localhost:5172.

![12](https://github.com/user-attachments/assets/3a46c277-2a03-4f9e-bd1d-464cca2b9aee)
![11](https://github.com/user-attachments/assets/fc96c3df-04c4-4286-b3da-9309dbcc3921)
![13](https://github.com/user-attachments/assets/ff4b90da-2b47-4c5d-9d27-0e981c6021ac)

