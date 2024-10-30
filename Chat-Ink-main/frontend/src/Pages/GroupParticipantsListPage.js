import React from "react";
import back from '../Components/icons/back.png'; 
import groupImg from '../Components/icons/group.png';
import profilePic from '../Components/icons/chat2.png';
import GroupParticipantsList from "../Components/GroupParticipantsList/GroupParticipantsList";
import  { useState } from "react";


const GroupParticipantsListPage = () => {


    const PARTICIPANTS = [
        {
            name :"Salma Hazem",
            profilePic :profilePic 
        },

        {
            name :"Malak Ahmed",
            profilePic : profilePic 
        },

        {
            name :"Lama metwally",
            profilePic : profilePic 
        }

    ]


    const [participants, setParticipants] = useState(PARTICIPANTS);
    const [successMessage, setSuccessMessage] = useState("");


    const removeParticipant = (participant) => {
        const modifiedParticipants = participants.filter(
            (part) => part.name !== participant.name
            );

        setParticipants(modifiedParticipants)
        setSuccessMessage(`You've removed ${participant.name} from the group`);
        setTimeout(() => setSuccessMessage(""), 3000);
    };
    

  return (
    <div className="chat-participants">

      <div className="chat-header ">
        <div className="d-flex align-items-center m-3">
          <img
            src={back}
            alt="Back"
            className="me-3"
            onClick={()=>  window.history.back()}
            style={{ cursor: "pointer" }}
            width="25"
            height="25"
           
          />
          <img
            id="profilePhoto"
            src={groupImg}
            alt="Group Photo"
            className="me-3"
            width="50"
            height="50"
          />
          <h2 id="chatName" className="h5">DEPI Group</h2>
        </div>
      </div>

      <div id="participants" className="mt-4 ms-3 ">
        <h2 className="h4 fw-bold py-2" style={{ fontSize: "25px" }}>Participants</h2>

        {successMessage && (
        <p
          style={{
            color: "red",
            fontWeight: "bold",
            fontSize: "20px",
            marginTop: "10px",
          }}
        >
          {successMessage}
        </p>
      )}

        {
                participants.map(user => (
                <GroupParticipantsList 
                    key={user.id} 
                    name={user.name} 
                    profilePic={user.profilePic} 
                    removeParticipant={removeParticipant}
                    participant= {user}
                />
            ))
        }

      </div>
      </div>
   
  );
}

export default GroupParticipantsListPage;
