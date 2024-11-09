import React, { useEffect, useState } from 'react';
import AllCourses from '../../common/AllCourses';
import { Container, Spinner, Alert } from 'react-bootstrap';

const StudentHome = () => {
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      // Simulate loading or fetch call for course data
      setTimeout(() => {
         // Replace with your actual data fetching logic
         setIsLoading(false);
         // setError('Failed to load courses');
      }, 2000);
   }, []);

   return (
      <Container className="my-4">
         {isLoading ? (
            <Spinner animation="border" role="status">
               <span className="visually-hidden">Loading...</span>
            </Spinner>
         ) : error ? (
            <Alert variant="danger">
               {error}
            </Alert>
         ) : (
            <AllCourses />
         )}
      </Container>
   );
};

export default StudentHome;
