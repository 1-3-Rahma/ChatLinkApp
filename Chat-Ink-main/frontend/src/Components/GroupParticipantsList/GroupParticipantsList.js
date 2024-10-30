import React from "react";

const GroupParticipantsList = (props) => {
    const {name , profilePic , removeParticipant , participant } = props
  return (
    <div>
      <div id="participant" className="d-flex align-items-center justify-content-between mt-5 me-4 ms-5 mb-5">
        <div className="d-flex align-items-center">
          <img
            src={profilePic}
            width="100"
            height="100"
            className="me-3"
            alt="Profile"
          />
          <p className="h6 fw-bold mb-0" style={{ fontSize: "22px" }}>{name}</p>
        </div>

       
        <div className="d-flex justify-content-center mt-4 ms-4">
          <button onClick={() => removeParticipant(participant)} type="button" className="btn btn-sm fw-bold" style ={{  color: "white",backgroundColor: "#6FB1B6" }}>
            Remove Participant
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupParticipantsList;
