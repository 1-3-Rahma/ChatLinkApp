import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ValidationMessage = ({ error }) => {
  console.log(error);
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      title: "Account Created Successfully!",
      text: "Jump in and start chatting with your friends.",
      icon: "success",
      timer: 3000,
      showConfirmButton: false,
    });
    setTimeout(function () {
      navigate("/");
    }, 3000);
  }, []);

  return <div></div>;
};

export default ValidationMessage;
