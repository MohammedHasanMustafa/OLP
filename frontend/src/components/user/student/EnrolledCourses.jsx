import React, { useEffect, useState } from 'react';
import axiosInstance from '../../common/AxiosInstance';  // Adjust path
import { Link } from 'react-router-dom';
import { Button, styled, TableRow, TableHead, TableContainer, Paper, Table, TableBody, TableCell, tableCellClasses } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';  // For showing error messages

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

const EnrolledCourses = () => {
   const [allEnrolledCourses, setAllEnrolledCourses] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);
   const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar

   const allCourses = async () => {
      try {
         const res = await axiosInstance.get('api/user/getallcoursesuser', {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
         });
         if (res.data.success) {
            setAllEnrolledCourses(res.data.data);
         } else {
            setError(res.data.message);
            setOpenSnackbar(true);  // Trigger error notification
         }
      } catch (error) {
         console.log(error);
         setError('Failed to load enrolled courses.');
         setOpenSnackbar(true);  // Trigger error notification
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      allCourses();
   }, []);

   return (
      <>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
               <TableHead>
                  <TableRow>
                     <StyledTableCell>Course ID</StyledTableCell>
                     <StyledTableCell align="left">Course Name</StyledTableCell>
                     <StyledTableCell align="left">Course Educator</StyledTableCell>
                     <StyledTableCell align="left">Course Category</StyledTableCell>
                     <StyledTableCell align="left">Action</StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {isLoading ? (
                     <TableRow>
                        <TableCell colSpan={5} align="center">Loading...</TableCell>
                     </TableRow>
                  ) : error ? (
                     <TableRow>
                        <TableCell colSpan={5} align="center">{error}</TableCell>
                     </TableRow>
                  ) : allEnrolledCourses.length > 0 ? (
                     allEnrolledCourses.map((course) => (
                        <StyledTableRow key={course._id}>
                           <StyledTableCell component="th" scope="row">{course._id}</StyledTableCell>
                           <StyledTableCell component="th" scope="row">{course.C_title}</StyledTableCell>
                           <StyledTableCell component="th" scope="row">{course.C_educator}</StyledTableCell>
                           <StyledTableCell component="th" scope="row">{course.C_categories}</StyledTableCell>
                           <StyledTableCell component="th" scope="row">
                              <Link to={`/courseSection/${course._id}/${course.C_title}`}>
                                 <Button size='small' variant="contained" color="success">Go To</Button>
                              </Link>
                           </StyledTableCell>
                        </StyledTableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell colSpan={5} align="center">No courses enrolled yet.</TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </TableContainer>

         {/* Snackbar for error handling */}
         <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            message={error}
            onClose={() => setOpenSnackbar(false)}
         />
      </>
   );
};

export default EnrolledCourses;
