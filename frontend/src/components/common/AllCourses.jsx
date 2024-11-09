import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../common/AxiosInstance'; // Adjusted import path to common directory
import "../../AllCourses.css";  // Adjusted CSS path, assuming it is still under common

const AllCourses = () => {
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);
  const [cardDetails, setCardDetails] = useState({
    cardholdername: '',
    cardnumber: '',
    expmonthyear: '',
    cvvcode: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all courses for the logged-in user
  const getAllCoursesUser = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('api/user/getallcourses', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setAllCourses(res.data.data);
      } else {
        setError('Failed to load courses. Please try again later.');
      }
    } catch (error) {
      setError('An error occurred while loading courses.');
      console.log('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle submitting card details for enrollment
  const validateCardDetails = () => {
    if (
      !cardDetails.cardholdername ||
      !cardDetails.cardnumber ||
      !cardDetails.expmonthyear ||
      !cardDetails.cvvcode
    ) {
      setError('Please fill in all the required fields.');
      return false;
    }
    if (cardDetails.cardnumber.length !== 16) {
      setError('Please enter a valid 16-digit card number.');
      return false;
    }
    if (cardDetails.cvvcode.length !== 3) {
      setError('Please enter a valid CVV code.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (courseId) => {
    if (!validateCardDetails()) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        `api/user/enrolledcourse/${courseId}`,
        cardDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        alert(res.data.message);
        navigate(`/courseSection/${res.data.course.id}/${res.data.course.Title}`);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      setError('An error occurred during payment. Please try again.');
      console.log('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  // Effect to get courses when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      getAllCoursesUser();
    }
  }, [navigate]);

  return (
    <div className="all-courses-container">
      {loading && <div className="spinner">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      <div className="courses-grid">
        {allCourses.map((course) => (
          <div className="course-card" key={course.id}>
            <img src={course.image} alt={course.title} className="course-image" />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <button
              className="start-course-btn"
              onClick={() => handleSubmit(course.id)}
            >
              Start Course
            </button>
          </div>
        ))}
      </div>
      {/* Card Details Form */}
      <div className="card-form">
        <input
          type="text"
          placeholder="Cardholder Name"
          value={cardDetails.cardholdername}
          onChange={(e) =>
            setCardDetails({ ...cardDetails, cardholdername: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Card Number"
          value={cardDetails.cardnumber}
          onChange={(e) =>
            setCardDetails({ ...cardDetails, cardnumber: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="MM/YY Expiry"
          value={cardDetails.expmonthyear}
          onChange={(e) =>
            setCardDetails({ ...cardDetails, expmonthyear: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="CVV"
          value={cardDetails.cvvcode}
          onChange={(e) =>
            setCardDetails({ ...cardDetails, cvvcode: e.target.value })
          }
        />
        <button className="submit-btn" onClick={() => handleSubmit()}>
          Submit Payment
        </button>
      </div>
    </div>
  );
};

export default AllCourses;
