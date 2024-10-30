// import { Link } from "react-router-dom"; // Import Link from react-router-dom//+

// import SearchInput from "../../../Components/SearchInput/SeacrhInput";
// import AddUser from "../../../Components/AddUser/AddUser";
// import styles from "./styles.module.css";
// import { useSelector } from "react-redux";

// import { useState } from "react";

// export default function App({ setCurrentPage, setParticipant, participant }) {
//   const user = useSelector((state) => state.user.data);
//   const [friends, setFriends] = useState(user.friends);
//   const goToCreateGroup = () => {
//     setCurrentPage(1);
//   };
//   return (
//     <div className="container col-12">
//       <div className="d-flex justify-content-between mt-5 c col-12">
//         <h2>Friends</h2>
//         <div className="col-3">
//           <SearchInput className={"col-12"} />
//         </div>
//       </div>
//       {friends?.map((user) => {
//         console.log(user);
//         return (
//           <AddUser
//             name={user.name}
//             img={user.profilePic}
//             id={user._id}
//             friends={friends}
//             setFriends={setFriends}
//             setParticipant={setParticipant}
//             participant={participant}
//             group={true}
//           ></AddUser>
//         );
//       })}
//       <div className="d-flex ">
//         <button className={`${styles.btn} ms-auto`} onClick={goToCreateGroup}>
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
// import user from "../../../Assets/Ellipse 308.png";
import groupPic from "../../../Components/icons/group.png";
import CardComponent from "../../../Components/Groups/CardComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { joinToGroup } from "../../../redux/groupSlice";

//gets 4 random groups from the array

export default function App({ setCurrentPage }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.groups);
  return (
    <div id="groups-container">
      <h2 className="m-4">Public Groups</h2>

      <div className="container mt-4">
        <div className="row">
          {groups ? (
            groups.map((group, index) => (
              <div
                className="col-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center "
                key={index}
              >
                <CardComponent
                  groupName={group.name}
                  groupPic={group.photoURL}
                  id={group._id}
                />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">No groups available.</div>
          )}
        </div>
      </div>

      <h2
        style={{
          fontWeight: "bold",
          fontSize: "25px",
          marginTop: "30px",
          color: "#598E92",
          cursor: "pointer",
          marginBottom: "65px",
          marginLeft: "25px",
        }}
        onClick={() => {
          setCurrentPage(1);
        }}
      >
        Create your own group
      </h2>
    </div>
  );
}
