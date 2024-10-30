import defaultPic from "../../Assets/defaultPic.png";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  acceptFriendRequest,
  deleteNotification,
  getFriendsRequest,
} from "../../redux/friendsSlice";
const NotificationManager = ({
  name,
  picture,
  request,
  acceptRequest,
  viewMessage,
  rejectRequest,
  user,
  id,
  notificationId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends);
  const acceptFriend = async (id) => {
    let deleted;
    const acc = await dispatch(acceptFriendRequest(id));

    if (acc) {
      deleted = await dispatch(deleteNotification(notificationId));
    }
    if (deleted) {
      const notif = await dispatch(getFriendsRequest());
      if (notif) {
        navigate(`/MainPage`);
      }
    }
  };
  const rejectFriend = async (id) => {
    let deleted = await dispatch(deleteNotification(notificationId));
    if (deleted) {
      const notif = await dispatch(getFriendsRequest());
      if (notif) {
        navigate(`/MainPage`);
      }
    }
  };
  return (
    <div className="notification-wrapper">
      <div className="notification-container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <img
            src={picture}
            width={77}
            height={58}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "20px",
            }}
          />

          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "1.25rem", // Use relative font sizes
                margin: "0 0 5px 0",
              }}
            >
              {name}
            </p>
            <p
              style={{
                margin: "0",
                fontSize: "1rem",
              }}
            >
              {request ? "Sent a friend request" : "Sent a new message"}
            </p>
          </div>

          <div
            className="button-group"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "15px",
              marginLeft: "auto",
              flexWrap: "wrap",
            }}
          >
            {!request && (
              <button
                className="btn btn-outline-secondary my-3"
                onClick={() => viewMessage(user)}
                style={{
                  cursor: "pointer",
                  color: "white",
                  fontWeight: "bolder",
                  fontSize: "1rem",
                  backgroundColor: "#6FB1B6",
                  width: "100%",
                  maxWidth: "200px", // Limit width for smaller screens
                  border: "none",
                }}
              >
                View Message
              </button>
            )}
            {request && (
              <>
                <button
                  className="btn btn-outline-secondary my-3 accept-btn"
                  onClick={() => acceptFriend(id)}
                  style={{
                    cursor: "pointer",
                    color: "white",
                    fontWeight: "bolder",
                    fontSize: "1rem",
                    backgroundColor: "#6FB1B6",
                    border: "none",
                    width: "100%",
                    maxWidth: "150px", // Adjust for smaller screens
                  }}
                >
                  Accept
                </button>

                <button
                  className="btn btn-outline-secondary my-3 reject-btn"
                  onClick={rejectFriend}
                  style={{
                    cursor: "pointer",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    backgroundColor: "grey",
                    border: "none",
                    width: "100%",
                    maxWidth: "150px", // Adjust for smaller screens
                  }}
                  disabled={!request}
                >
                  Reject
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .notification-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 15px;
        }

        .notification-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          padding: 20px;
          max-width: 700px; /* Define the max width of the notification area */
          width: 100%;
          text-align: center;
        }

        .button-group {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .button-group {
            justify-content: space-around; /* Equal space around buttons on smaller screens */
            width: 100%;
          }

          .accept-btn,
          .reject-btn {
            max-width: 45%; /* Each button takes almost half the width */
          }
        }
      `}</style>
    </div>
  );
};
export default NotificationManager;
