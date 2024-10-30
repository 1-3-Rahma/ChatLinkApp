import React, { useState } from "react";
import styles from "./styles.module.css";
import icon from "../../../Assets/R (2) 1.png";
import { useNavigate } from "react-router-dom";
import { createGroup } from "../../../redux/groupSlice";

import { useDispatch, useSelector } from "react-redux";
export default function ThirdPage({ participant }) {
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5z4mLY5q13A48Q4hwWK4Zq6B29GQ748heAg&s"
  );
  const [groupName, setGroupName] = useState(""); // Ensure groupName state is defined
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [groupType, setGroupType] = useState("public");
  const dispatch = useDispatch();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let membersgroup = [];
    console.log(participant);
    participant.map((i) => {
      i.map((member) => {
        membersgroup.push(member._id);
      });
    });
    const data = {
      name: groupName,
      photoURL: image,
      members: membersgroup,
      visibility: groupType == "public",
    };
    dispatch(createGroup(data));
    navigate("/MainPage");
  };

  // const createGroup = () => {
  //   setSuccessMessage("You've successfully created the group");
  //   setTimeout(() => setSuccessMessage(""), 2000);
  //   setTimeout(() => navigate("/MainPage"), 3000);
  // };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="container d-flex flex-column mb-2"
        style={{ height: "80vh", justifyContent: "center", padding: "0" }}
      >
        <div className="row align-items-center mt-6">
          <div className="col mt-2">
            <label
              className="me-3 mt-n5 m-3"
              style={{ fontWeight: "bold", fontSize: "20px" }}
            >
              Group Picture
            </label>
          </div>
          <div className="d-flex align-items-center justify-content-center me-4 mb-5 mt-n1">
            <img
              src={image}
              alt="Group"
              style={{ width: "110px", height: "110px" }}
            />
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center me-4">
          <input
            type="file"
            id="file-input"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-input"
            className={`${styles.label} d-flex align-items-center ms-5`}
          >
            <img
              src={icon}
              alt="Camera Icon"
              style={{ width: "25px", height: "25px" }}
              className="me-2"
            />
            <span style={{ fontWeight: "bold" }}>Add photo</span>
          </label>
        </div>

        <div className="mt-4 m-3">
          <label style={{ fontWeight: "bold", fontSize: "20px" }}>
            Group Name
          </label>
          <input
            required
            type="text"
            placeholder="Group Name"
            className={`col-12 ${styles.input}`}
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)} // Update state on input change
          />
        </div>

        <div className="mt-3 m-3">
          <label style={{ fontWeight: "bold", fontSize: "20px" }}>
            Group Type
          </label>
          <select
            value={groupType}
            onChange={(e) => setGroupType(e.target.value)}
            className={`col-12 ${styles.input}`}
            required
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        <button type="submit" className={`${styles.btn} mt-3`}>
          Create Group
        </button>

        {successMessage && (
          <p
            style={{
              color: "green",
              fontWeight: "bold",
              fontSize: "20px",
              marginTop: "10px",
            }}
          >
            {successMessage}
          </p>
        )}
      </div>
    </form>
  );
}
