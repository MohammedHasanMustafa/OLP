import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

import "./App.css";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import Dashboard from "./components/common/Dashboard";
import CourseContent from "./components/user/student/CourseContent";
import Profile from "./components/common/Profile";  // Import the Profile component

export const UserContext = createContext();

function App() {
  const date = new Date().getFullYear();
  const [userData, setUserData] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const getData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUserData(user);
        setUserLoggedIn(true);
      } else {
        setUserData(null);
        setUserLoggedIn(false);
      }
    } catch (error) {
      console.error(error);
      setUserData(null);
      setUserLoggedIn(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <div className="App">
        <Router>
          <div className="content">
            <Routes>
              {/* Public Routes */}
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={userLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes for Logged-in Users */}
              {userLoggedIn && (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/courseSection/:courseId/:courseTitle" element={<CourseContent />} />
                  <Route path="/profile" element={<Profile />} /> {/* Profile Route */}
                </>
              )}

              {/* Redirect to Login if not logged in */}
              {!userLoggedIn && (
                <Route path="/dashboard" element={<Navigate to="/login" />} />
              )}
            </Routes>
          </div>
          <footer className="bg-light text-center text-lg-start">
            <div className="text-center p-3">
              © {date} Copyright: Study App
            </div>
          </footer>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
