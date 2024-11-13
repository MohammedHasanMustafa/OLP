# Online Learning Platform

## Overview
This is a comprehensive **Online Learning Platform** built using the **MERN Stack (MongoDB, Express, React, Node.js)**. The platform supports three user roles: **Admin**, **Teacher**, and **Student**. It offers functionalities like course creation, approval processes, live video conferencing, and secure payments.

The platform allows users to browse courses, purchase them, track their progress, and communicate with teachers. It also includes an admin panel for managing users and content.

## Features
- **User Authentication**:
  - Separate login routes for **Students**, **Teachers**, and **Admins**.
  - Secure JWT-based authentication for user login and session management.

- **Application Approval**:
  - Teachers and students can submit applications for account approval.
  - Admins can validate and approve applications.

- **Course Management**:
  - Teachers can create, update, and manage courses.
  - Admins can approve or reject courses.
  - Students can browse, purchase, and enroll in courses.

- **Live Video Conferencing**:
  - Integrated video conferencing tool for real-time interaction between teachers and students, using **WebRTC** or **Google Meet** links.

- **In-App Messaging**:
  - A messaging system for communication between students and teachers.

- **Payment Integration**:
  - Secure payment gateway integration (Stripe, PayPal, or Razorpay) for purchasing courses.

## Tech Stack
- **Frontend**:
  - **React** with **Vite** for fast and responsive UI development.
  - **Figma** and **Dribbble** for UI/UX design inspiration.

- **Backend**:
  - **Node.js** with **Express** for server-side logic and API routes.
  - **Mongoose** for interacting with **MongoDB**.

- **Database**:
  - **MongoDB** for storing user profiles, course data, and application records.

- **Authentication**:
  - **JWT (JSON Web Tokens)** for secure authentication and authorization.

