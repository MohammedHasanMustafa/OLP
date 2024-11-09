import React, { useState, useEffect } from 'react';
import { Button, styled, TableRow, TableHead, TableContainer, Paper, Table, TableBody, TableCell, tableCellClasses, CircularProgress, Snackbar, Alert } from '@mui/material';
import axiosInstance from '../common/AxiosInstance';

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

const AllCourses = () => {
   const [allCourses, setAllCourses] = useState([]);
   const [loading, setLoading] = useState(false);
   const [errorMessage, setErrorMessage] = useState(null);
   const [successMessage, setSuccessMessage] = useState(null);
   const [deleteLoadingForCourse, setDeleteLoadingForCourse] = useState({}); // Track delete loading state per course

   const allCoursesList = async () => {
      setLoading(true);
      try {
         const res = await axiosInstance.get('api/admin/getallcourses', {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
         });
         setLoading(false);
         if (res.data.success) {
            setAllCourses(res.data.data);
         } else {
            setErrorMessage(res.data.message);
         }
      } catch (error) {
         setLoading(false);
         setErrorMessage('An error occurred while fetching the courses.');
      }
   };

   useEffect(() => {
      allCoursesList();
   }, []);

   const deleteCourse = async (courseId) => {
      const confirmation = window.confirm('Are you sure you want to delete this course?');
      if (!confirmation) return;

      setDeleteLoadingForCourse(prevState => ({ ...prevState, [courseId]: true })); // Start loading for specific course
      try {
         const res = await axiosInstance.delete(`api/admin/deletecourse/${courseId}`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });
         setDeleteLoadingForCourse(prevState => ({ ...prevState, [courseId]: false })); // End loading for specific course
         if (res.data.success) {
            setSuccessMessage(res.data.message);
            allCoursesList();
         } else {
            setErrorMessage("Failed to delete the course.");
         }
      } catch (error) {
         setDeleteLoadingForCourse(prevState => ({ ...prevState, [courseId]: false })); // End loading for specific course
         setErrorMessage("An error occurred while deleting the course.");
      }
   };

   return (
      <>
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
               <TableHead>
                  <TableRow>
                     <StyledTableCell>Course ID</StyledTableCell>
                     <StyledTableCell align="center">Course Name</StyledTableCell>
                     <StyledTableCell align="left">Course Educator</StyledTableCell>
                     <StyledTableCell align="center">Course Category</StyledTableCell>
                     <StyledTableCell align="left">Course Price</StyledTableCell>
                     <StyledTableCell align="center">Course Sections</StyledTableCell>
                     <StyledTableCell align="center">Enrolled Students</StyledTableCell>
                     <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {loading ? (
                     <StyledTableRow>
                        <StyledTableCell colSpan={8} align="center">
                           <CircularProgress />
                        </StyledTableCell>
                     </StyledTableRow>
                  ) : allCourses.length > 0 ? (
                     allCourses.map((Course) => (
                        <StyledTableRow key={Course._id}>
                           <StyledTableCell>{Course._id}</StyledTableCell>
                           <StyledTableCell align="center">{Course.C_title}</StyledTableCell>
                           <StyledTableCell>{Course.C_educator}</StyledTableCell>
                           <StyledTableCell align="center">{Course.C_categories}</StyledTableCell>
                           <StyledTableCell>{Course.C_price}</StyledTableCell>
                           <StyledTableCell align="center">{Course.sections.length}</StyledTableCell>
                           <StyledTableCell align="center">{Course.enrolled}</StyledTableCell>
                           <StyledTableCell align="center">
                              <Button
                                 onClick={() => deleteCourse(Course._id)}
                                 size="small"
                                 color="error"
                                 disabled={deleteLoadingForCourse[Course._id]} // Disable button for specific course during delete
                              >
                                 {deleteLoadingForCourse[Course._id] ? <CircularProgress size={24} /> : 'Delete'}
                              </Button>
                           </StyledTableCell>
                        </StyledTableRow>
                     ))
                  ) : (
                     <StyledTableRow>
                        <StyledTableCell colSpan={8} align="center">
                           No courses found
                        </StyledTableCell>
                     </StyledTableRow>
                  )}
               </TableBody>
            </Table>
         </TableContainer>

         {successMessage && (
            <Snackbar open={true} autoHideDuration={6000} onClose={() => setSuccessMessage(null)}>
               <Alert onClose={() => setSuccessMessage(null)} severity="success" sx={{ width: '100%' }}>
                  {successMessage}
               </Alert>
            </Snackbar>
         )}
         {errorMessage && (
            <Snackbar open={true} autoHideDuration={6000} onClose={() => setErrorMessage(null)}>
               <Alert onClose={() => setErrorMessage(null)} severity="error" sx={{ width: '100%' }}>
                  {errorMessage}
               </Alert>
            </Snackbar>
         )}
      </>
   );
};

export default AllCourses;
