import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinToGroup } from "../../redux/groupSlice";
import { useNavigate } from "react-router-dom";

const CardComponent = (props) => {
  const { groupName, groupPic, id } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.user.data.id);

  const handleJoinGroup = async () => {
    console.log("userID is ", userid);
    console.log("groupID is ", id);
    const groupjoin = await dispatch(joinToGroup({ ID: id, userID: userid }));
    if (groupjoin.type === "groups/joinToGroup/fulfilled") {
      navigate(`/MainPage`);
    }
    // navigate(`/MainPage`);
  };
  return (
    <div className="mb-4" style={{ marginTop: "10px" }}>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={groupPic}
          style={{
            width: "100px",
            height: "100px",
            marginLeft: "90px",
            marginTop: "20px",
          }}
          className="card-img-top"
          alt="Card image cap"
        />
        <div className="card-body">
          <h5
            className="card-title"
            style={{ marginLeft: "55px", marginBottom: "30px" }}
          >
            {groupName}
          </h5>
          <button
            clbssName="btn btn-primary"
            style={{
              color: "white",
              backgroundColor: "#6FB1B6",
              marginLeft: "70px",
            }}
            onClick={handleJoinGroup}
          >
            Join Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
