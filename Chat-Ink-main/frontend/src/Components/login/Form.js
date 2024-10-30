import React, { useState } from "react";
import styles from "./FormStyle.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/userSlice";
import { getFriendsRequest } from "../../redux/friendsSlice";
import { getPublicGroup } from "../../redux/groupSlice";

function Form() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const err = useSelector((state) => state.user.error);
  const handleLogin = async (event) => {
    event.preventDefault();
    const login = await dispatch(loginUser({ email, password }));
    if (login.payload.data) {
      const notif = await dispatch(getFriendsRequest());
      const groups = await dispatch(getPublicGroup());

      if (notif && groups) {
        navigate("/MainPage");
      }
    }

    setEmail("");
    setPassword("");
  };
  return (
    <form
      onSubmit={handleLogin}
      className="d-flex flex-column align-items-center col-10 col-sm-7 col-md-6 col-lg-5 col-xl-4 col-xxl-3"
    >
      <div className="form-group col-12 my-3">
        <label htmlFor="exampleInputEmail1" className={styles.sr_only}>
          Email address
        </label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className={`form-control ${styles.input_outline}`}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Email address"
          autoFocus
          required
        />
      </div>
      <div className="form-group col-12 my-3">
        <label htmlFor="exampleInputPassword1" className={styles.sr_only}>
          Password
        </label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className={`form-control ${styles.input_outline}`}
          id="exampleInputPassword1"
          placeholder="Password"
          required
        />
      </div>
      <div className={`${err ? styles.error : styles.sr_only} m-3`}>
        your email or password is wrong
      </div>

      <button
        type="submit"
        className="btn btn-outline-secondary col-12 my-3"
        style={{ fontSize: "24" }}
      >
        Login
      </button>
      <div
        className="d-flex mt-2 flex-column align-items-center col-12"
        style={{ fontSize: "small" }}
      >
        <small>
          Don't have an account?
          <small
            className="ms-2"
            onClick={() => navigate("/signUp")}
            style={{ cursor: "pointer", color: "#6FB1B6" }}
          >
            Sign Up!
          </small>
        </small>
        <small
          className="ms-2 mb-3"
          onClick={() => console.log("send password to your email")}
          style={{ cursor: "pointer", color: "#6FB1B6" }}
        >
          Forget Password ?
        </small>
      </div>
    </form>
  );
}

export default Form;
