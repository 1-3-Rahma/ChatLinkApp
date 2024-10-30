import React from 'react'
import FormPlus from '../Components/signUp/FormPlus';
import { useNavigate } from 'react-router-dom';
import Logo from '../Assets/Logo.png'
const text = { fontSize: "32", fontWeight: "700", color: "black" };

function SignUp() {
  const navigate = useNavigate();
  return (
    <div className="container" >
      <div className='col-12 d-flex align-items-center pt-3 mt-3'>
        <img src={Logo} alt="logo" width={77} height={58} />
        <div style={text}>ChatLink</div>
      </div>
      <div className="d-flex flex-column align-items-center">

        <div className="text-center">Link In, Chat On – With ChatLink</div>
        <div className="mb-5 text-center" style={text}>Signup to ChatLink</div>
        <FormPlus edit={false}/>
        <div className="d-flex mt-2 mb-3 " style={{ fontSize: "small" }}>
          <small>
            Have an account ?
            <small className="ms-2" onClick={() => navigate("/")} style={{ cursor: "pointer", color: "#6FB1B6" }} >Login</small>
          </small>
        </div>
      </div>
     
    </div>
  )
}

export default SignUp
