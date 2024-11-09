import React, { useState, useEffect } from 'react';
import { Button, styled, TableRow, TableHead, TableContainer, Paper, Table, TableBody, TableCell, tableCellClasses, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import axiosInstance from '../common/AxiosInstance'; // Adjusted path to relative import

const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
   },
   '&:last-child td, &:last-child th': {
      border: 0,
   },
}));

const AdminHome = () => {
   const [allUsers, setAllUsers] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState('');
   const [openDialog, setOpenDialog] = useState(false);
   const [selectedUserId, setSelectedUserId] = useState(null);
   const [snackbarOpen, setSnackbarOpen] = useState(false);
   const [snackbarMessage, setSnackbarMessage] = useState('');

   // Fetch all users
   const allUsersList = async () => {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      
      if (!token) {
         setError('No token found. Please log in again.');
         setLoading(false);
         return;
      }

      try {
         const res = await axiosInstance.get('api/admin/getallusers', {
            headers: {
               "Authorization": `Bearer ${token}`
            }
         });

         if (res.data.success) {
            setAllUsers(res.data.data);
         } else {
            setError('Failed to load users');
         }
      } catch (err) {
         setError('An error occurred while fetching users');
         console.error(err);
      } finally {
         setLoading(false);
      }
   };

   // Delete a user
   const deleteUser = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
         setSnackbarMessage('No token found. Please log in again.');
         setSnackbarOpen(true);
         setLoading(false);
         setOpenDialog(false);
         return;
      }

      try {
         const res = await axiosInstance.delete(`api/user/deleteuser/${selectedUserId}`, {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });

         if (res.data.success) {
            setSnackbarMessage('User deleted successfully');
            allUsersList(); // Refresh the list
         } else {
            setSnackbarMessage('Failed to delete user');
         }
         setSnackbarOpen(true);
      } catch (error) {
         console.error('An error occurred:', error);
         setSnackbarMessage('An error occurred while deleting the user');
         setSnackbarOpen(true);
      } finally {
         setLoading(false);
         setOpenDialog(false);
      }
   };

   const handleDeleteDialogOpen = (userId) => {
      setSelectedUserId(userId);
      setOpenDialog(true);
   };

   const handleDeleteDialogClose = () => {
      setSelectedUserId(null);
      setOpenDialog(false);
   };

   const handleSnackbarClose = () => {
      setSnackbarOpen(false);
   };

   useEffect(() => {
      allUsersList();
   }, []); // Runs once when component mounts

   return (
      <div>
         {/* Show loading spinner */}
         {loading && <CircularProgress size={50} />}

         {/* Show error message */}
         {error && <div className="error-message">{error}</div>}

         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
               <TableHead>
                  <TableRow>
                     <StyledTableCell>User ID</StyledTableCell>
                     <StyledTableCell align="left">User Name</StyledTableCell>
                     <StyledTableCell align="left">Email</StyledTableCell>
                     <StyledTableCell align="left">Type</StyledTableCell>
                     <StyledTableCell align="left">Action</StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {allUsers.length > 0 ? (
                     allUsers.map((user) => (
                        <StyledTableRow key={user._id}>
                           <StyledTableCell component="th" scope="row">
                              {user._id}
                           </StyledTableCell>
                           <StyledTableCell component="th" scope="row">
                              {user.name}
                           </StyledTableCell>
                           <StyledTableCell component="th" scope="row">
                              {user.email}
                           </StyledTableCell>
                           <StyledTableCell component="th" scope="row">
                              {user.type}
                           </StyledTableCell>
                           <StyledTableCell component="th" scope="row">
                              <Button
                                 onClick={() => handleDeleteDialogOpen(user._id)}
                                 size="small"
                                 color="error"
                              >
                                 Delete
                              </Button>
                           </StyledTableCell>
                        </StyledTableRow>
                     ))
                  ) : (
                     <StyledTableRow>
                        <StyledTableCell colSpan={5}>No users found</StyledTableCell>
                     </StyledTableRow>
                  )}
               </TableBody>
            </Table>
         </TableContainer>

         {/* Delete confirmation dialog */}
         <Dialog open={openDialog} onClose={handleDeleteDialogClose}>
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent>
               Are you sure you want to delete this user? This action cannot be undone.
            </DialogContent>
            <DialogActions>
               <Button onClick={handleDeleteDialogClose} color="primary">
                  Cancel
               </Button>
               <Button onClick={deleteUser} color="error">
                  Delete
               </Button>
            </DialogActions>
         </Dialog>

         {/* Snackbar for error/success messages */}
         <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
         />
      </div>
   );
};

export default AdminHome;
