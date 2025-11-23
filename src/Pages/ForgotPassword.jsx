import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getResetPasswordToken } from '../services/operations/authAPI';

const ForgotPassword = () => {
    const [emailSent,setEmailSent] = useState(false);
    const[email,setEmail] = useState("");
    const {loading} = useSelector((state)=> state.auth);
    const dispatch = useDispatch();

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(getResetPasswordToken(email,setEmailSent));
    }

  return (
    <div className='text-white'>
            {loading ? (
                <div> Loading ...</div>
            ):
            (
                <div>
                    <h1>
                        {
                            !emailSent ? "Reset your password" : "Check your Email"
                        }
                    </h1>

                    <p>
                        {
                            !emailSent?
                            "Have no fear. Well email you intstructions to reset your password. If you don't have access to your email we can try account recovery"
                            : `We have sent the reset email to ${email}`
                        }
                    </p>

                    <form action="" onSubmit={handleSubmit} >
                        {
                            !emailSent && (
                                <label htmlFor="">


                                <p>Email Address</p>
                                <input type="email"
                                required
                                name='email'
                                value={email}
                                onChange={(e)=>{setEmail(e.target.value)}}
                                 />
                                 </label>
                                

                            )
                            
                        }

                        
                      
                    </form>
                </div>
            )
        }
    </div>
  )
}

export default ForgotPassword