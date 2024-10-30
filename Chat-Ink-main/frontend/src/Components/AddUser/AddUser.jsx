import plus from "../../Assets/plus-sign-icon-free-png 1.png";
import { sendFriendRequest } from "../../redux/friendsSlice";

import { useDispatch } from "react-redux";

export default function AddUser({
  img,
  name,
  id,
  group = false,
  friends,
  setFriends,
  setParticipant,
  participant,
}) {
  const dispatch = useDispatch();
  const handleAddFriend = () => {
    dispatch(sendFriendRequest(id));
    let friend = friends?.filter((friend) => friend._id !== id);
    if (friend) {
      setFriends(friend);
    }
  };
  const handelAddParticipant = () => {
    console.log(id);
    let newParticipants = friends.filter((friend) => friend._id === id);
    setFriends(friends.filter((friend) => friend._id !== id));
    setParticipant([...participant, newParticipants]);
  };

  return (
    <div className="d-flex align-items-center my-5 ">
      <img src={img} alt="" className="me-4" />
      <span>{name}</span>
      <img
        src={plus}
        alt=""
        className="ms-auto"
        style={{ width: "50px", height: "50px", cursor: "pointer" }}
        onClick={group ? handelAddParticipant : handleAddFriend}
      />
    </div>
  );
}
