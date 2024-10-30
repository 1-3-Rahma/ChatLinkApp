import React from "react";
import Form from "../Components/login/Form";
import Logo from "../Assets/Logo.png";
const text = { fontSize: "32", fontWeight: "700", color: "black" };
function Login() {
  return (
    <div className="container">
      <div className="col-12 d-flex align-items-center pt-3 mt-3">
        <img src={Logo} alt="logo" width={77} height={58} />
        <div style={text}>ChatLink</div>
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="text-center">Link In, Chat On – With ChatLink</div>
        <div className="mb-5 text-center" style={text}>
          Login to ChatLink
        </div>
        <Form />
      </div>
    </div>
  );
}

export default Login;
