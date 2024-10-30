import defaultPic from "../Assets/defaultPic.png";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsRequest } from "../redux/friendsSlice";
import NotificationManager from "../Components/Notifications/NotificationManager";
const text = { fontSize: "32", fontWeight: "700", color: "black" };

// const notifications = [
//   {
//     name: "Salma Hazem",
//     picture: defaultPic,
//     request: true,
//   },

//   {
//     name: "Rahma Ali",
//     picture: defaultPic,
//     request: false,
//   },

//   {
//     name: "Moaz Adly",
//     picture: defaultPic,
//     request: true,
//   },

//   {
//     name: "Omar Hussien",
//     picture: defaultPic,
//     request: false,
//   },
// ];

function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.friends.notifications);

  // const [notification, setNotifications] = useState(notifications);
  // const [successMessage, setSuccessMessage] = useState("");

  // const deleteNotification = (user) => {
  //   const modifiedNotifications = notification.filter(
  //     (notif) => notif.name !== user.name
  //   );
  //   setNotifications(modifiedNotifications);
  // };
  // const acceptRequest = (user) => {
  //   deleteNotification(user);
  //   setSuccessMessage(`You've added ${user.name}`);
  //   setTimeout(() => setSuccessMessage(""), 3000);
  //   //back end code to add that new friend
  // };

  // const viewMessage = (user) => {
  //   deleteNotification(user);
  //   navigate("/ChatPage "); //navigate to the chat
  // };

  // const rejectRequest = (user) => {
  //   deleteNotification(user);
  //   //backend code so that he can add again
  // };

  return (
    <div className="container">
      <p style={{ fontWeight: "bold", paddingTop: "60px", fontSize: "30px" }}>
        Notifications
      </p>

      {/* {successMessage && (
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
      )} */}

      <div>
        {notifications?.map((user, index) => (
          <NotificationManager
            key={index}
            name={user.sender.firstName + " " + user.sender.lastName}
            picture={user.sender.profilePic}
            id={user.sender._id}
            notificationId={user._id}
            request={user.type}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}

export default Notifications;
