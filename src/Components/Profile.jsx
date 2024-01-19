import "./Profile.css"; // Import your stylesheet
import profile2 from "../assets/profile.jpg";

const Profile = () => {
  return (
    <div className="profile-container">
      <div className="profile-img-container">
        <img className="profile-img" src={profile2} alt="Profile" />
      </div>
      <div className="profile-info">
        <h2 className="profile-name">Your Name</h2>
        <p className="profile-email">your.email@example.com</p>
      </div>
      <button className="view-profile-btn">View Profile</button>
    </div>
  );
};

export default Profile;
