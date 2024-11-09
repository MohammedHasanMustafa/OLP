import { useParams, Link } from "react-router-dom";
import { Accordion, Modal } from "react-bootstrap";
import axiosInstance from "../../common/AxiosInstance";  // Corrected import path
import ReactPlayer from "react-player";
import { UserContext } from "../../../App";
import NavBar from '../../common/NavBar';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button, Snackbar } from '@mui/material';
import { useState, useEffect, useContext } from 'react';

const CourseContent = () => {
   const user = useContext(UserContext);

   const { courseId, courseTitle } = useParams(); // Extract courseId from URL
   const [courseContent, setCourseContent] = useState([]);
   const [currentVideo, setCurrentVideo] = useState(null);
   const [playingSectionIndex, setPlayingSectionIndex] = useState(-1);
   const [completedSections, setCompletedSections] = useState([]);
   const [completedModule, setCompletedModule] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [certificate, setCertificate] = useState(null);
   const [error, setError] = useState(null); // State for error handling
   const [openSnackbar, setOpenSnackbar] = useState(false); // For error notifications

   // Extract sectionIds from completedModule
   const completedModuleIds = completedModule.map((item) => item.sectionId);

   const downloadPdfDocument = (rootElementId) => {
      const input = document.getElementById(rootElementId);
      html2canvas(input).then((canvas) => {
         const imgData = canvas.toDataURL('image/png');
         const pdf = new jsPDF();
         pdf.addImage(imgData, 'JPEG', 0, 0);
         pdf.save('download-certificate.pdf');
      });
   };

   const getCourseContent = async () => {
      try {
         const res = await axiosInstance.get(`/api/user/coursecontent/${courseId}`, {
            headers: {
               "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
         });
         if (res.data.success) {
            setCourseContent(res.data.courseContent);
            setCompletedModule(res.data.completeModule);
            setCertificate(res.data.certficateData.updatedAt);
         }
      } catch (error) {
         console.log(error);
         setError('Failed to load course content.');
         setOpenSnackbar(true);  // Show the error notification
      }
   };

   useEffect(() => {
      getCourseContent();
   }, [courseId]);

   const playVideo = (videoPath, index) => {
      if (currentVideo === videoPath) {
         setCurrentVideo(null); // Stop video if clicked again
         setPlayingSectionIndex(-1);
      } else {
         setCurrentVideo(videoPath);
         setPlayingSectionIndex(index);
      }
   };

   const completeModule = async (sectionId) => {
      if (completedModule.length < courseContent.length) {
         // Mark the current section as completed
         if (playingSectionIndex !== -1 && !completedSections.includes(playingSectionIndex)) {
            setCompletedSections([...completedSections, playingSectionIndex]);

            // Send a request to the server to update the user's progress
            try {
               const res = await axiosInstance.post(`api/user/completemodule`, {
                  courseId,
                  sectionId: sectionId
               }, {
                  headers: {
                     Authorization: `Bearer ${localStorage.getItem('token')}`
                  }
               });
               if (res.data.success) {
                  alert(res.data.message);
                  getCourseContent(); // Refresh course content
               }
            } catch (error) {
               console.log(error);
               setError('Failed to update course progress.');
               setOpenSnackbar(true); // Show the error notification
            }
         }
      } else {
         // Show the modal
         setShowModal(true);
      }
   };

   return (
      <>
         <NavBar />
         <h1 className='my-3 text-center'>Welcome to the course: {courseTitle}</h1>

         {error && <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            message={error}
            onClose={() => setOpenSnackbar(false)}
         />}

         <div className='course-content'>
            <div className="course-section">
               <Accordion defaultActiveKey="0" flush>
                  {courseContent.map((section, index) => {
                     const sectionId = index;
                     const isSectionCompleted = !completedModuleIds.includes(sectionId);

                     return (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                           <Accordion.Header>{section.S_title}</Accordion.Header>
                           <Accordion.Body>
                              {section.S_description}
                              {section.S_content && (
                                 <>
                                    <Button color='success' className='mx-2' variant="text" size="small" onClick={() => playVideo(`http://localhost:8000${section.S_content.path}`, index)}>
                                       Play Video
                                    </Button>
                                    {isSectionCompleted && !completedSections.includes(index) && (
                                       <Button
                                          variant='success'
                                          size='sm'
                                          onClick={() => completeModule(sectionId)}
                                          disabled={playingSectionIndex !== index}
                                       >
                                          Completed
                                       </Button>
                                    )}
                                 </>
                              )}
                           </Accordion.Body>
                        </Accordion.Item>
                     );
                  })}
                  {completedModule.length === courseContent.length && (
                     <Button className='my-2' onClick={() => setShowModal(true)}>Download Certificate</Button>
                  )}
               </Accordion>
            </div>
            <div className="course-video w-50">
               {currentVideo && (
                  <ReactPlayer
                     url={currentVideo}
                     width='100%'
                     height='100%'
                     controls
                  />
               )}
            </div>
         </div>

         <Modal
            size="lg"
            show={showModal}
            onHide={() => setShowModal(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
         >
            <Modal.Header closeButton>
               <Modal.Title id="example-custom-modal-styling-title">
                  Completion Certificate
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               Congratulations! You have completed all sections. Here is your certificate
               <div id='certificate-download' className="certificate text-center">
                  <h1>Certificate of Completion</h1>
                  <div className="content">
                     <p>This is to certify that</p>
                     <h2>{user.userData.name}</h2>
                     <p>has successfully completed the course</p>
                     <h3>{courseTitle}</h3>
                     <p>on</p>
                     <p className="date">{new Date(certificate).toLocaleDateString()}</p>
                  </div>
               </div>
               <Button onClick={() => downloadPdfDocument('certificate-download')} style={{ float: 'right', marginTop: 3 }}>Download Certificate</Button>
            </Modal.Body>
         </Modal>
      </>
   );
};

export default CourseContent;
