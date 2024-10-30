import React, { useState, useRef } from 'react';
import ProfilePicture from '../../Assets/defaultPic.png'; 

const ProfilePictureUploader = () => {
    const [selectedImage, setSelectedImage] = useState(ProfilePicture);
    const fileInputRef = useRef(null); 

    const handleImageChange = (event) => {
        const file = event.target.files[0]; 
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result); 
            };
            reader.readAsDataURL(file); 
        }
    };

  
    const handleButtonClick = () => {
        fileInputRef.current.click(); 
    };

    return (
        <div className="col-12 col-md-6 d-flex flex-column align-items-center">
       
        <img
          src={selectedImage}
          style={{
            borderRadius: "50%",
            display: "block",
            width: "100%", 
            maxWidth: "200px", 
            height: "auto", 
            paddingTop: "20px", 
          }}
          alt="Profile"
        />
      
      
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      
       
        <button
          type="button"
          className="btn btn-outline-secondary mt-3"
          style={{
            fontSize: "1.2rem", 
            padding: "10px 20px", 
            marginTop: "15px",
          }}
          onClick={handleButtonClick}
        >
          Change Profile Picture
        </button>
      </div>
    );      
};

export default ProfilePictureUploader;
