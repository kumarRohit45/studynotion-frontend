import React, { useState } from 'react'
import {AiOutlineEye,AiOutlineEyeInvisible} from "react-icons/ai"
import {login} from "../../../services/operations/authAPI"
import {Link,useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

 
    const[formData, setFormData] = useState({
        email:"",password:""
    })

    const[showPassword,setShowPassword] = useState(false);

    const {email, password}= formData

    function changeHandler(event){
        setFormData((prevData)=>(
            {
                ...prevData,
                [event.target.name] :event.target.value
        }
        ))
    }
    function submitHandler(event){
        event.preventDefault();
       dispatch(login(email,password,navigate))

    }

  return (
    <div>

<form onSubmit={submitHandler} className='login-form'>
    <label htmlFor="">Email address</label>
    {/* <br /> */}
    <input className='w-[80%]'
     type="text"
    name='email'
    value={formData.email}
    required
    placeholder='Enter your email' 
    onChange={changeHandler}/>

    <br />

    <label htmlFor="">Password</label>
    <input type={showPassword ? ("text"):("password")} name="password"
    required
    value={formData.password} 
    onChange={changeHandler}
    placeholder='Enter your password'
    />
    <span className='eye' onClick={()=>setShowPassword((prev)=> !prev)}>
        {showPassword ?(<AiOutlineEye/>):<AiOutlineEyeInvisible/>} </span>

        <Link to="/forgot-password">
            <p className='high-text'>
                Forgot Password
            </p>
        </Link>
        <br />

        <button className=' yellow-bg' type='submit'>
            Sign In
        </button>
       
</form>
    </div>
  )
}

export default LoginForm