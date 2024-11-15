
---

# Online Learning Platform (MERN Stack Application)

This is a full-featured Online Learning Platform  built using the MERN stack (MongoDB, Express.js, React, Node.js). It enables students to enroll in courses, view content, and track progress, while teachers can manage their courses and administrators handle overall platform operations, including user and course management.

## Table of Contents

- [Introduction](#introduction)
- [Purpose](#purpose)
- [Scope](#scope)
- [Scenario-Based Case Study](#scenario-based-case-study)
- [Technical Architecture](#technical-architecture)
- [System Requirements](#system-requirements)
  - [Hardware Requirements](#hardware-requirements)
  - [Software Requirements](#software-requirements)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Features](#features)
  - [User Features](#user-features)
  - [Teacher Features](#teacher-features)
  - [Admin Features](#admin-features)
- [Tech Stack](#tech-stack)
- [Application Flow](#application-flow)
- [Project Implementation](#project-implementation)
- [Project Demo](#project-demo)
- [Additional Resources](#additional-resources)
   - [Project Report](#project-report)
- [Conclusion](#conclusion)
     

---

## Introduction

The **Online Learning Platform (OLP)** is a web-based LMS designed to facilitate online education. Built with the MERN stack, OLP provides a user-friendly experience for students to enroll, learn, and track course progress, while enabling teachers to create, manage, and update courses and their content. Administrators oversee all users and manage platform-wide settings.

## Purpose

The purpose of OLP is to bridge the gap in accessible, quality online education by providing a platform where educators and learners can connect seamlessly. It supports a structured approach to course creation, enrollment, and progress tracking, making it suitable for educational institutions and independent online educators.

## Scope

OLP supports a wide range of educational scenarios, allowing students to enroll in various courses, teachers to manage course content, and administrators to oversee the entire platform. The system is scalable, supporting additional features like certificate generation, paid courses, and customizable categories.

## Scenario-Based Case Study

### Teacher:
- Teachers can add courses, manage their content, and remove courses if needed.
- They can upload course sections and additional resources.

### Student:
- Students can enroll in multiple courses, resume courses from where they left off, and obtain certificates upon completion.
- For paid courses, they can purchase and access content afterward.
- Courses can be filtered by categories and search keywords.

### Admin:
- Admins manage all platform content, view all users and enrolled students, and ensure the platform runs smoothly.

## Technical Architecture

OLP is built using the following architecture:
- **Frontend**: React for UI with components structured for user roles (student, teacher, admin).
- **Backend**: Node.js and Express for server logic and API handling.
- **Database**: MongoDB for managing data persistence with Mongoose schemas.
- **Authentication**: JSON Web Token (JWT) for secure user authentication.

## System Requirements

### Hardware Requirements
- **Operating System**: Windows 8 or higher
- **RAM**: 4 GB minimum (8 GB recommended for smooth development)
- **Network Bandwidth**: 30 Mbps or higher for seamless operations

### Software Requirements
- **Node.js**: LTS version for back-end and front-end development
- **MongoDB**: Local instance or MongoDB Atlas for cloud database management
- **React.js**: Frontend framework
- **Express.js**: Backend framework
- **Git**: For version control
- **Code Editor**: Visual Studio Code (recommended)
- **Web Browsers**: Chrome and Firefox for compatibility testing

## Project Structure

The project is organized into two main folders:
- **`frontend/`** - Contains the front-end React code for the LMS application.
  - `src/assets/Images` - Stores images used in the frontend.
  - `src/components/admin` - Components for admin functionalities.
  - `src/components/common` - Common components like login, dashboard, and navbar.
  - `src/components/user/student` - Student-specific components.
  - `src/components/user/teacher` - Teacher-specific components.

- **`backend/`** - Contains the back-end Node.js and Express code.
  - `config/` - Database configuration.
  - `controllers/` - Controllers for admin and user operations.
  - `middlewares/` - Authentication middleware.
  - `routers/` - Route definitions for admin and user routes.
  - `schemas/` - Mongoose schemas for database models.
  - `uploads/` - Stores uploaded files (e.g., course materials).

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/MohammedHasanMustafa/OLP
cd OLP
```

### 2. Install Dependencies

#### Server
```bash
cd backend
npm install
```

#### Client
```bash
cd frontend
npm install
```

## Environment Variables

Create a `.env` file in the `backend` folder with the following variables:

```plaintext
MONGO_DB=mongodb://localhost:27017/elearning
PORT=5000
JWT_KEY=my_super_secret_key_123456
```
or

```plaintext
MONGO_DB=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
```

Replace each placeholder as follows:

- `<username>`: Your MongoDB Atlas database username.
- `<password>`: The password for the above username. Make sure to URL-encode it if it contains special characters (e.g., `@`, `&`, `$`).
- `<cluster-url>`: The cluster URL provided by MongoDB Atlas.
- `<database>`: The name of your database. You can specify a new database name here; MongoDB will create it if it doesn’t exist.


> **Important**: Never hard-code sensitive information in your source code. Keep the `.env` file out of version control by adding it to your `.gitignore` file.
- `MONGO_DB`: MongoDB connection string.
- `PORT`: Server port (default: 5000).
- `JWT_KEY`: Secret key for JSON Web Token (JWT) authentication.

## Usage

### Running the Server
Run the backend server on port 5000:
```bash
cd backend
node index.js
```

### Running the Client
Start the client on port 3000:
```bash
cd frontend
npm start
```

## Features

### User Features (Students)
- **Course Enrollment**: Enroll in courses and view course content.
- **Track Progress**: Resume courses from the last completed section.
- **Certificate Download**: Obtain certificates after course completion.

### Teacher Features
- **Course Management**: Add, update, and delete courses.
- **Content Upload**: Upload and manage course materials and sections.

### Admin Features
- **User Management**: Manage registered users on the platform.
- **Course Management**: Manage all courses and banners for promotions.

## Tech Stack

- **Frontend**: React, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Token (JWT)

## Application Flow

The project has three user roles—Student, Teacher, and Admin:
- **Student**: Enrolls in and completes courses, resumes from last section.
- **Teacher**: Manages course creation and content upload.
- **Admin**: Oversees user and course management across the platform.

## Project Implementation

The following dependencies are used:
- **Frontend**: React, Material UI, Bootstrap, Axios, Antd, MDB-react-ui-kit
- **Backend**: Cors, bcryptjs, multer, dotenv, Express, mongoose, nodemon, jsonwebtoken

For frontend and backend installation steps, see the [Installation](#installation) section.

## Project Demo

Watch a quick demo showcasing the features and functionalities of the Online Learning Platform, demonstrating the user, teacher, and admin views.

[![Demo video]](https://drive.google.com/file/d/1zY4wrwpZlP6ZMtZzznQ4sxPWOQmunUZu/view?usp=drive_link)
You can add the links to your **Project Report** and **Screenshots of Installation** in the README file under a new section. Here’s how it might look:

---

## Additional Resources
### Project Report 
- **[Project Report](https://github.com/MohammedHasanMustafa/OLP/blob/main/NM.pdf)**: Detailed documentation of the Online Learning Platform project.

---

## Conclusion

The **Online Learning Platform** provides an accessible, scalable, and feature-rich solution for online education. Through a structured approach, students, teachers, and administrators can interact effectively, creating an enriched learning environment. This MERN-based platform is designed to support educational growth, scalability, and easy maintenance, making it suitable for a wide range of users and institutions.

