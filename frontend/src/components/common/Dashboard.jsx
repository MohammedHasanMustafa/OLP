import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import TeacherDashboard from "../user/teacher/TeacherHome"; 
import AdminDashboard from '../admin/AdminHome';
import StudentDashboard from '../user/student/StudentHome';

const Dashboard = () => {
   const { userData } = useContext(UserContext);
   const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      if (!userData) {
         navigate('/login');  // Redirect to login if no user data exists
      } else {
         setLoading(false);  // If user data exists, stop loading
      }
   }, [userData, navigate]);

   if (loading) {
      return <div>Loading...</div>;  // Display a loading message until user data is available
   }

   let content;

   switch (userData.type) {
      case "Teacher":
         content = <TeacherDashboard />;
         break;
      case "Admin":
         content = <AdminDashboard />;
         break;
      case "Student":
         content = <StudentDashboard />;
         break;
      default:
         content = <div>Unauthorized Access</div>;  // Handle unknown user types
   }

   return (
      <Container>
         <Row className="my-4">
            <Col>
               <Card className="text-center">
                  <Card.Body>
                     <Card.Title>Welcome, {userData.name}</Card.Title>
                     <Card.Text>
                        You are logged in as a {userData.type}.
                     </Card.Text>
                     <Button variant="primary" onClick={() => navigate('/profile')}>View Profile</Button>
                  </Card.Body>
               </Card>
            </Col>
         </Row>
         <Row>
            <Col>
               {content}
            </Col>
         </Row>
      </Container>
   );
};

export default Dashboard;
