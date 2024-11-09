// Profile.jsx
import React, { useContext } from 'react';
import { UserContext } from '../../App';  // Import the context

const Profile = () => {
  const { userData } = useContext(UserContext);  // Get user data from context

  // Fallback if userData is not available
  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h1>Welcome, {userData.name}!</h1>
      <div className="profile-details">
        <h3>User Details:</h3>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Username:</strong> {userData.username}</p>
        {/* Add any other fields you want to display */}
      </div>
    </div>
  );
};

export default Profile;
