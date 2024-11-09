import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import axiosInstance from '../common/AxiosInstance'; // Ensure axios instance is set up correctly

const Login = () => {
   const navigate = useNavigate();
   const [data, setData] = useState({
      email: "",
      password: "",
   });
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(""); // State to store error messages

   useEffect(() => {
      // Check if user is already logged in
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
         navigate("/dashboard"); // Redirect to dashboard if already logged in
      }
   }, [navigate]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!data?.email || !data?.password) {
         return alert("Please fill all fields");
      } else {
         setLoading(true);
         setError(""); // Clear any previous error messages
         // Send login request to the server
         axiosInstance.post('/api/user/login', data)
            .then((res) => {
               if (res.data.success) {
                  alert(res.data.message);
                  // Store the token and user data in localStorage
                  localStorage.setItem("token", res.data.token);
                  localStorage.setItem("user", JSON.stringify(res.data.userData));
                  navigate('/dashboard');
                  setTimeout(() => {
                     window.location.reload();
                  }, 1000);
               } else {
                  alert(res.data.message);
               }
            })
            .catch((err) => {
               console.error(err);
               // Set a more descriptive error message
               const errorMessage = err.response?.data?.message || "An error occurred, please try again later.";
               setError(errorMessage);
            })
            .finally(() => {
               setLoading(false);
            });
      }
   };

   return (
      <>
         <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
               <Navbar.Brand><h2>Study App</h2></Navbar.Brand>
               <Navbar.Toggle aria-controls="navbarScroll" />
               <Navbar.Collapse id="navbarScroll">
                  <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                  </Nav>
                  <Nav>
                     <Link to={'/'} className="nav-link">Home</Link>
                     <Link to={'/login'} className="nav-link">Login</Link>
                     <Link to={'/register'} className="nav-link">Register</Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <div className="first-container">
            <Container component="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <Box
                  sx={{
                     marginTop: 8,
                     marginBottom: 4,
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     padding: '10px',
                     background: '#dddde8db',
                     border: '1px solid lightblue',
                     borderRadius: '5px'
                  }}
               >
                  <Avatar sx={{ bgcolor: 'secondary.main' }} />
                  <Typography component="h1" variant="h5">
                     Sign In
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} noValidate>
                     <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        autoComplete="email"
                        autoFocus
                     />
                     <TextField
                        margin="normal"
                        fullWidth
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                     />
                     {error && <Typography color="error" variant="body2">{error}</Typography>}
                     <Box mt={2}>
                        <Button
                           type="submit"
                           variant="contained"
                           sx={{ mt: 3, mb: 2 }}
                           style={{ width: '200px' }}
                           disabled={loading}
                        >
                           {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                        </Button>
                     </Box>
                     <Grid container>
                        <Grid item>Don't have an account?
                           <Link to="/register"> Sign Up</Link>
                        </Grid>
                     </Grid>
                  </Box>
               </Box>
            </Container>
         </div>
      </>
   );
};

export default Login;
