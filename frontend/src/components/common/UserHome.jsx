import React, { useContext, useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { UserContext } from '../../App';
import TeacherHome from '../user/teacher/TeacherHome';
import AdminHome from '../admin/AdminHome';
import StudentHome from '../user/student/StudentHome';

const UserHome = () => {
   const user = useContext(UserContext);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      if (user?.userData?.type) {
         setIsLoading(false);
      }
   }, [user]);

   let content;

   if (isLoading) {
      content = <Spinner animation="border" />;
   } else {
      switch (user?.userData?.type) {
         case "Teacher":
            content = <TeacherHome />;
            break;
         case "Admin":
            content = <AdminHome />;
            break;
         case "Student":
            content = <StudentHome />;
            break;
         default:
            content = <div>Unknown user type</div>;
            break;
      }
   }

   return (
      <Container>
         {content}
      </Container>
   );
};

export default UserHome;
