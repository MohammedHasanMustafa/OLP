import React, { useState, useContext } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import { UserContext } from '../../../App';
import axiosInstance from '../../common/AxiosInstance';

const AddCourse = () => {
   const user = useContext(UserContext);
   const [addCourse, setAddCourse] = useState({
      userId: user.userData._id,
      C_educator: '',
      C_title: '',
      C_categories: '',
      C_price: '',
      C_description: '',
      sections: [],
   });
   const [errors, setErrors] = useState({});

   const validateForm = () => {
      const newErrors = {};
      if (!addCourse.C_title) newErrors.C_title = 'Course title is required';
      if (!addCourse.C_price) newErrors.C_price = 'Course price is required';
      if (!addCourse.C_description) newErrors.C_description = 'Course description is required';
      if (!addCourse.C_categories) newErrors.C_categories = 'Course category is required';
      
      addCourse.sections.forEach((section, index) => {
         if (!section.S_title) newErrors[`S_title_${index}`] = 'Section title is required';
         if (!section.S_description) newErrors[`S_description_${index}`] = 'Section description is required';
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setAddCourse({ ...addCourse, [name]: value });
   };

   const handleCourseTypeChange = (e) => {
      setAddCourse({ ...addCourse, C_categories: e.target.value });
   };

   const addInputGroup = () => {
      setAddCourse({
         ...addCourse,
         sections: [
            ...addCourse.sections,
            {
               S_title: '',
               S_description: '',
               S_content: null, // You can handle this by making it optional
            },
         ],
      });
   };

   const handleChangeSection = (index, e) => {
      const updatedSections = [...addCourse.sections];
      const sectionToUpdate = updatedSections[index];

      if (e.target.name.endsWith('S_content')) {
         const file = e.target.files[0];
         if (file && (file.type === 'video/mp4' || file.type === 'image/jpeg')) {
            sectionToUpdate.S_content = file;
         } else {
            alert('Invalid file type. Only video and image files are allowed.');
         }
      } else {
         sectionToUpdate[e.target.name] = e.target.value;
      }

      setAddCourse({ ...addCourse, sections: updatedSections });
   };

   const removeInputGroup = (index) => {
      const updatedSections = [...addCourse.sections];
      updatedSections.splice(index, 1);
      setAddCourse({
         ...addCourse,
         sections: updatedSections,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      const formData = new FormData();
      Object.keys(addCourse).forEach((key) => {
         if (key === 'sections') {
            addCourse[key].forEach((section, index) => {
               if (section.S_content instanceof File) {
                  formData.append(`sections[${index}][S_content]`, section.S_content);
               }
               formData.append(`sections[${index}][S_title]`, section.S_title);
               formData.append(`sections[${index}][S_description]`, section.S_description);
            });
         } else {
            formData.append(key, addCourse[key]);
         }
      });

      try {
         const res = await axiosInstance.post('/api/user/addcourse', formData, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
               'Content-Type': 'multipart/form-data',
            },
         });

         if (res.status === 201 && res.data.success) {
            alert(res.data.message);
         } else {
            alert('Failed to create course');
         }
      } catch (error) {
         console.error('Error:', error);
         alert('An error occurred while creating the course');
      }
   };

   return (
      <div>
         <Form className="mb-3" onSubmit={handleSubmit}>
            <Row className="mb-3">
               <Form.Group as={Col} controlId="formGridJobType">
                  <Form.Label>Course Type</Form.Label>
                  <Form.Select
                     value={addCourse.C_categories}
                     onChange={handleCourseTypeChange}
                    >
                     <option>Select categories</option>
                     <option>IT & Software</option>
                     <option>Finance & Accounting</option>
                     <option>Personal Development</option>
                  </Form.Select>
                  {errors.C_categories && <span className="text-danger">{errors.C_categories}</span>}
               </Form.Group>
               <Form.Group as={Col} controlId="formGridTitle">
                  <Form.Label>Course Title</Form.Label>
                  <Form.Control
                     name="C_title"
                     value={addCourse.C_title}
                     onChange={handleChange}
                     type="text"
                     placeholder="Enter Course Title"
                     required
                  />
                  {errors.C_title && <span className="text-danger">{errors.C_title}</span>}
               </Form.Group>
            </Row>

            <Row className="mb-3">
               <Form.Group as={Col} controlId="formGridEducator">
                  <Form.Label>Course Educator</Form.Label>
                  <Form.Control
                     name="C_educator"
                     value={addCourse.C_educator}
                     onChange={handleChange}
                     type="text"
                     placeholder="Enter Course Educator"
                     required
                  />
               </Form.Group>
               <Form.Group as={Col} controlId="formGridPrice">
                  <Form.Label>Course Price(Rs.)</Form.Label>
                  <Form.Control
                     name="C_price"
                     value={addCourse.C_price}
                     onChange={handleChange}
                     type="text"
                     placeholder="for free course, enter 0"
                     required
                  />
                  {errors.C_price && <span className="text-danger">{errors.C_price}</span>}
               </Form.Group>
               <Form.Group as={Col} className="mb-3" controlId="formGridDescription">
                  <Form.Label>Course Description</Form.Label>
                  <Form.Control
                     name="C_description"
                     value={addCourse.C_description}
                     onChange={handleChange}
                     required
                     as="textarea"
                     placeholder="Enter Course description"
                  />
                  {errors.C_description && <span className="text-danger">{errors.C_description}</span>}
               </Form.Group>
            </Row>

            <hr />

            {addCourse.sections.map((section, index) => (
               <div
                  key={index}
                  className="d-flex flex-column mb-4 border rounded-3 border-3 p-3 position-relative"
               >
                  <Col xs={24} md={12} lg={8}>
                     <span
                        style={{ cursor: 'pointer' }}
                        className="position-absolute top-0 end-0 p-1"
                        onClick={() => removeInputGroup(index)}
                     >
                        ❌
                     </span>
                  </Col>
                  <Row className="mb-3">
                     <Form.Group as={Col} controlId="formGridSectionTitle">
                        <Form.Label>Section Title</Form.Label>
                        <Form.Control
                           name={`S_title`}
                           value={section.S_title}
                           onChange={(e) => handleChangeSection(index, e)}
                           type="text"
                           placeholder="Enter Section Title"
                           required
                        />
                        {errors[`S_title_${index}`] && (
                           <span className="text-danger">{errors[`S_title_${index}`]}</span>
                        )}
                     </Form.Group>
                     <Form.Group as={Col} controlId="formGridContent">
                        <Form.Label>Section Content (Video or Image)</Form.Label>
                        <Form.Control
                           name={`S_content`}
                           onChange={(e) => handleChangeSection(index, e)}
                           type="file"
                           accept="video/*,image/*"
                        />
                     </Form.Group>

                     <Form.Group className="mb-3" controlId="formGridSectionDescription">
                        <Form.Label>Section Description</Form.Label>
                        <Form.Control
                           name={`S_description`}
                           value={section.S_description}
                           onChange={(e) => handleChangeSection(index, e)}
                           required
                           as="textarea"
                           placeholder="Enter Section description"
                        />
                        {errors[`S_description_${index}`] && (
                           <span className="text-danger">{errors[`S_description_${index}`]}</span>
                        )}
                     </Form.Group>
                  </Row>
               </div>
            ))}

            <Row className="mb-3">
               <Col xs={24} md={12} lg={8}>
                  <Button size="sm" variant="outline-secondary" onClick={addInputGroup}>
                     ➕Add Section
                  </Button>
               </Col>
            </Row>

            <Button variant="primary" type="submit">
               Submit
            </Button>
         </Form>
      </div>
   );
};

export default AddCourse;
