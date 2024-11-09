import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Grid, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import axiosInstance from "../common/AxiosInstance"; // relative path from Register.jsx to AxiosInstance.jsx

const Register = () => {
   const [data, setData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      type: "user", // Default value
   });
   const [loading, setLoading] = useState(false);
   const [openSnackbar, setOpenSnackbar] = useState(false);
   const [snackbarMessage, setSnackbarMessage] = useState("");
   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
   const navigate = useNavigate(); // Hook to programmatically navigate

   // Handle form field change
   const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
   };

   // Handle form submission
   const handleSubmit = (e) => {
      e.preventDefault();
      if (!data.name || !data.email || !data.password || !data.confirmPassword || !data.type) {
         setSnackbarMessage("Please fill in all fields");
         setSnackbarSeverity("error");
         setOpenSnackbar(true);
         return;
      }
      if (data.password !== data.confirmPassword) {
         setSnackbarMessage("Passwords do not match");
         setSnackbarSeverity("error");
         setOpenSnackbar(true);
         return;
      }

      setLoading(true);
      axiosInstance.post('/api/user/register', data)
         .then((res) => {
            if (res.data.success) {
               setSnackbarMessage(res.data.message);
               setSnackbarSeverity("success");
               setOpenSnackbar(true);
               // After successful signup, redirect to course content page
               navigate('/course-content'); // Redirect to the course content page
            } else {
               setSnackbarMessage(res.data.message);
               setSnackbarSeverity("error");
               setOpenSnackbar(true);
            }
         })
         .catch((err) => {
            console.error(err);
            setSnackbarMessage("An error occurred, please try again later.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
         })
         .finally(() => {
            setLoading(false);
         });
   };

   return (
      <Container component="main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <Avatar sx={{ bgcolor: 'secondary.main' }} />
            <Typography component="h1" variant="h5">Sign Up</Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>

               <TextField
                  margin="normal"
                  fullWidth
                  label="Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  autoComplete="name"
                  autoFocus
               />

               <TextField
                  margin="normal"
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  autoComplete="email"
               />

               <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={data.password}
                  onChange={handleChange}
                  autoComplete="new-password"
               />

               <TextField
                  margin="normal"
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
               />

               <TextField
                  margin="normal"
                  fullWidth
                  label="User Type"
                  name="type"
                  value={data.type}
                  onChange={handleChange}
                  select
                  >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
               </TextField>


               {/* Type dropdown */}
               <FormControl fullWidth margin="normal">
                  <InputLabel>Type</InputLabel>
                  <Select
                     name="type"
                     value={data.type}
                     onChange={handleChange}
                     label="Type"
                  >
                     <MenuItem value="user">User</MenuItem>
                     <MenuItem value="admin">Admin</MenuItem>
                  </Select>
               </FormControl>

               <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  fullWidth
                  disabled={loading}
               >
                  {loading ? 'Creating Account...' : 'Sign Up'}
               </Button>

               <Grid container justifyContent="flex-end">
                  <Grid item>
                     <Link to="/login">Already have an account? Log in</Link>
                  </Grid>
               </Grid>
            </Box>
         </Box>

         {/* Snackbar for feedback */}
         <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
            <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
               {snackbarMessage}
            </Alert>
         </Snackbar>
      </Container>
   );
};

export default Register;

