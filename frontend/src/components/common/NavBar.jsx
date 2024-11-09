import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

const MyNavbar = () => {
   const navigate = useNavigate();
   const user = JSON.parse(localStorage.getItem("user")) || {}; // Added fallback

   const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
   };

   return (
      <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
         <Container fluid>
            <Navbar.Brand>
               <h2>Study App</h2>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
               <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                  <Link to={'/'} className="nav-link">Home</Link>
                  {user ? (
                     <>
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        {user.userData?.type === 'Admin' && (
                           <Link to="/admin" className="nav-link">Admin Panel</Link>
                        )}
                        <Link to="/profile" className="nav-link">Profile</Link>
                        <Link to="#" className="nav-link" onClick={handleLogout}>Logout</Link>
                     </>
                  ) : (
                     <>
                        <Link to={'/login'} className="nav-link">Login</Link>
                        <Link to={'/register'} className="nav-link">Register</Link>
                     </>
                  )}
               </Nav>
               {user && (
                  <Avatar 
                     alt={user.userData?.name || 'User'} 
                     src={user.userData?.avatarUrl || "/static/images/avatar/1.jpg"} 
                  />
               )}
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default MyNavbar;
