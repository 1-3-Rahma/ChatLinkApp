import SearchBar from "../../Components/SearchBar/SearchBar";
import AddUser from "../../Components/AddUser/AddUser";
import { updateUser } from "../../redux/friendsSlice";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";

export default function AddFrineds() {
  const [searchTerm, setSearchTerm] = useState("");

  const [notfriends, setNotFriends] = useState(
    useSelector((state) => state.friends.data)
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateUser());
  }, []);

  const filtered = notfriends?.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });
  return (
    <div className="container">
      <div className="d-flex justify-content-end mt-5">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
      {filtered?.map((user) => {
        return (
          <AddUser
            name={user.firstName + " " + user.lastName}
            img={user.profilePic}
            id={user._id}
            friends={notfriends}
            setFriends={setNotFriends}
          ></AddUser>
        );
      })}
    </div>
  );
}
