import React, { useEffect } from "react";
import Toastify from "toastify-js"; // Make sure Toastify is imported correctly
import "toastify-js/src/toastify.css"; // Import CSS if needed

const ErrorMessages = (props) => {
  const { error, setErrors } = props;
  useEffect(() => {
    Toastify({
      text: error,
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
    setTimeout(function () {
      setErrors(false);
    }, 3000);
  }, []);

  return <div></div>;
};

export default ErrorMessages;
