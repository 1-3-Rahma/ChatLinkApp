import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/userSlice";
import "react-toastify/dist/ReactToastify.css"; //+
import styles from "./FormPlusStyle.module.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import ErrorMessages from "../alerts/ErrorMessage";
import ValidationMessage from "../alerts/ValidationMessage";
export default function FormPlus() {
  const errMessage = useSelector((state) => state.user.message);

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [isSumpited, setIsSumpited] = useState(false);
  const [errors, setErrors] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password !== ConfirmPassword) {
      Toastify({
        text: "Passwords do not match!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "red",
        style: {
          color: "white",
          fontSize: "16px",
          borderRadius: "5px",
          padding: "10px 20px",
        },
      }).showToast();
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      Toastify({
        text: "Email must be in the format: name@gmail.com",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "red",
        style: {
          color: "white",
          fontSize: "16px",
          borderRadius: "5px",
          padding: "10px 20px",
        },
      }).showToast();
      return;
    }
    const newUser = await dispatch(
      registerUser({
        email,
        password,
        firstName: FirstName,
        lastName: LastName,
      })
    );
    if (newUser.type === "user/register/rejected") {
      setErrors(true);
    } else {
      setIsSumpited(true);
    }
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="d-flex flex-column align-items-center col-10 col-sm-8 col-md-7 col-lg-6 col-xl-5 col-xxl-4"
    >
      {errors && <ErrorMessages error={errMessage} setErrors={setErrors} />}
      {isSumpited && !errors && <ValidationMessage />}
      <div className="form-group col-12 my-3">
        <label htmlFor="exampleInputName1" className={styles.sr_only}>
          First Name
        </label>
        <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={FirstName}
          className={`form-control ${styles.input_outline}`}
          id="exampleInputName1"
          placeholder="First Name"
        />
      </div>

      {/* Last Name Input */}
      <div className="form-group col-12 my-3">
        <label htmlFor="exampleInputName2" className={styles.sr_only}>
          Last Name
        </label>
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={LastName}
          className={`form-control ${styles.input_outline}`}
          id="exampleInputName2"
          placeholder="Last Name"
        />
      </div>

      {/* Email Input */}
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
          placeholder="Email address"
        />
      </div>

      {/* Password Input */}
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
        />
      </div>

      {/* Confirm Password Input */}
      <div className="form-group col-12 my-3">
        <label htmlFor="exampleInputPassword2" className={styles.sr_only}>
          Confirm Password
        </label>
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={ConfirmPassword}
          className={`form-control ${styles.input_outline}`}
          id="exampleInputPassword2"
          placeholder="Confirm Password"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-outline-secondary col-12 my-3"
        style={{ fontSize: "1.2rem" }}
      >
        Sign up
      </button>
    </form>
  );
}
