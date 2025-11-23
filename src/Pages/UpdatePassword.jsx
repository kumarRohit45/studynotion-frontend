import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai';
import './UpdatePassword.css'
import { resetPassowrd } from '../services/operations/authAPI';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const {loading} = useSelector((state)=>state.auth);
    const[showPassword,setShowPassword] =  useState(false);
    const[showConfirmPassword,setShowConfirmPassword] =  useState(false);
    const[formData,setFormData] = useState({
        password:"",
        confirmPassword:""
    })

    const{password,confirmPassword} = formData;
    const handleOnChange = (event)=>{
         
        setFormData((previous)=>(

            {
                ...previous,
                [event.target.name] : event.target.value
            }
        )
        )
    }

    const handleOnSubmit = (e)=>{
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassowrd(password,confirmPassword,token));
    }


  return (
    <div className='update-password'>
          {
          loading ? (
            <div>
                Loading...
            </div>
          ):
          (
            <div>
                <h1>Choose new Password</h1>
                <p>Almost done. Enter your new Password and you're all set.</p>
                <form action="" onSubmit={handleOnSubmit}>
                    <label htmlFor="">
                        <p>New Password</p>
                        <input type={showPassword ? "text":"password"}
                        name='password'
                        value={password}
                        onChange={handleOnChange} />
                        <span onClick={()=>setShowPassword((prev) => !prev) }>
                            {showPassword ?<AiOutlineEye/> : <AiOutlineEyeInvisible/> }
                        </span>
                    </label>
                    <label htmlFor="">
                        <p>Confirm Password</p>
                        <input
                        className='' type={showConfirmPassword ? "text":"password"}
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleOnChange} />
                    <span onClick={()=>setShowConfirmPassword((prev) => !prev )}> {showConfirmPassword ?<AiOutlineEye/> : <AiOutlineEyeInvisible/> }</span>
                    </label>
                   

                   <button type='submit'>Reset Password</button>


                </form>
            </div>)
        
         }
    </div>
  )
}

export default UpdatePassword