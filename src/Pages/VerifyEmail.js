import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';


const VerifyEmail = () => {
  const [otp,setOtp] = useState("");
  const {signupData,loading} = useSelector((state)=> state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    // Only allow access of this route when user has filled the signup form
    if(!signupData){
      navigate("/signup");
    }
  },[])

  const handleVerificationAndSignup=(e)=>{
    e.preventDefault();
    const{
      accountType,firstName,
      lastName,
      email,password,
      confirmPassword,
      
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    )
  }
  return (
    <div className='text-white'>
      {loading ? (
        <div>Loading...</div>
      )
      :
      (
        <div>
          <h1>Verify Email</h1>
          <p>A verification code has been sent to your Email Address. Please Enter the code Below</p>
          <form onSubmit={handleVerificationAndSignup}>
            <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props)=>(
              <input
              {...props}
              placeholder='-'
              />
            )}/>
              <button>Veriy Email</button>
              <div>
                <Link to={"/signup"}>
                Back to Signup</Link>
                <button onClick={()=> dispatch(sendOtp(signupData.email))}>
                  Resend it
                </button>
              </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default VerifyEmail