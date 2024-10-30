import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/userSlice";
import styles from "../Components/signUp/FormPlusStyle.module.css";

const text = { fontSize: "32", fontWeight: "700", color: "black" };

function AccountSettings() {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const [image, setImage] = useState(user.profilePic);
  const navigate = useNavigate();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const fileInputRef = useRef(null);
  const updates = {};
  if (FirstName) updates.firstName = FirstName;
  if (LastName) updates.lastName = LastName;
  if (email) updates.email = email;
  if (password) updates.password = password;
  if (image) updates.profilePic = image;
  const handelUpdateUser = (e) => {
    e.preventDefault();
    const userUpdated = dispatch(updateUser(updates));
    if (userUpdated) {
      navigate("/MainPage");
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 style={{ fontSize: "25px", marginTop: "40px" }}>
              Account Settings
            </h1>
          </div>

          <div className="col-4 mx-auto">
            <form
              onSubmit={handelUpdateUser}
              className="d-flex flex-column align-items-center"
            >
              <>
                {" "}
                <img
                  src={image}
                  style={{
                    borderRadius: "50%",
                    display: "block",
                    width: "200px",
                    height: "200px",
                    paddingUp: "20px",
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
                  className="btn btn-outline-secondary"
                  style={{
                    fontSize: "20px",
                    marginTop: "15px",
                    marginLeft: "-10px",
                  }}
                  onClick={handleButtonClick}
                >
                  Select Profile Picture
                </button>
              </>

              <div className="form-group col-12 my-3">
                <label htmlFor="exampleInputName1" className={styles.sr_only}>
                  First Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={FirstName}
                  className={`form-control  ${styles.input_outline}`}
                  id="exampleInputName1"
                  aria-describedby="emailHelp"
                  placeholder="First Name"
                  autoFocus
                />
              </div>
              <div className="form-group col-12 my-3">
                <label htmlFor="exampleInputName2" className={styles.sr_only}>
                  Last Name
                </label>
                <input
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                  value={LastName}
                  className={`form-control  ${styles.input_outline}`}
                  id="exampleInputName2"
                  aria-describedby="emailHelp"
                  placeholder="Last Name"
                />
              </div>
              <div className="form-group col-12 my-3">
                <label htmlFor="exampleInputEmail1" className={styles.sr_only}>
                  Email address
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className={`form-control  ${styles.input_outline}`}
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Email address"
                />
              </div>
              <div className="form-group col-12 my-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className={styles.sr_only}
                >
                  Password
                </label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className={`form-control ${styles.input_outline}`}
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              <div className="form-group col-12 my-3"></div>
              <button
                type="submit"
                className="btn btn-outline-secondary col-12 my-3"
                style={{ fontSize: "24" }}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AccountSettings;
