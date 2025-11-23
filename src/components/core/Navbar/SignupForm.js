import {React,useState} from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { sendOtp } from '../../../services/operations/authAPI';
import { setSignupData } from '../../../reducer/slices/authSlice';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import Tab from './Tab';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const SignupForm = () => {
 const navigate = useNavigate()
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const[formData,setFormData] = useState({
    firstName:"", lastName:"",email:"",password:"",confirmPassword:""


  })
  const[showPassword,setShowPassword]  =useState(false);

  const {firstName,lastName,email,password,confirmPassword} = formData;

  function changeHandler(event){
    setFormData((prevData)=>(
      {
      ...prevData,
      [event.target.name] : event.target.value

     }

    ))
  }

  const handleOnSubmit = (e)=>{
    e.preventDefault();

    if(password !== confirmPassword){
      console.log("PASS don't match");
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    }
    
   // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    //Send otp to user for verification
    dispatch(sendOtp(formData.email,navigate))

    
    setFormData({
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      confirmPassword:"",

    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  //data to pas to Tab componet
  const tabData = [
    { 
      id:1,
      tabName:"Student",
      type:ACCOUNT_TYPE.STUDENT,
    }
    ,
    {
      id:2,
      tabName:"Instructor",
      type:ACCOUNT_TYPE.INSTRUCTOR
    }
  ]



  return (
    <div className='signup-form' >

      <Tab tabData={tabData} field = {accountType} setField={setAccountType} />

      <form action="" className='flex flex-col gap-2  '
      onSubmit={handleOnSubmit}>
    
     
      <div className='text-sm flex flex-row justify-between'>

           <div className='flex flex-col gap-1'>

      <label htmlFor="">First Name</label>
      <input className='px-2 w-full'
      type="text" name="firstName"
      required
      value={formData.firstName}
      placeholder='Enter first name'
      onChange={changeHandler} />
            </div>
           <div className='flex flex-col'>
        <label className='mb-1' htmlFor="">Last Name</label>
        <input className='px-2 w-full' type="text"
        value={formData.lastName}
        placeholder='Enter last name'
        name='lastName'
        onChange={changeHandler}
        required />
           </div>

           </div>
           

      <label htmlFor="">Email Address</label>
      <input className='px-2 w-full' type="email"
      name='email'
      onChange={changeHandler}
      required
      value={formData.email}
      placeholder='Enter your email'/>

           <div className='text-sm flex flex-row justify-between'>
        <div className='flex flex-col'>
          <label className='mb-1' htmlFor="">Create Password</label>
          <input
           className='px-2 w-full' type={showPassword ? ("text") : ("password")} name="password"
          placeholder='Enter password'
          required
          onChange={changeHandler}
          value={formData.password} />
          <span className='eye' onClick={(prev)=>!prev}>
             {showPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
          </span>
          <br />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="">Confirm Password</label>
          <input className='px-2 w-full' type={showPassword ? ("text") : ("password")} name="confirmPassword"
          placeholder='Confirm password '
          onChange={changeHandler}
          required
          value={formData.confirmPassword} />
           <span className='eye2' onClick={(prev)=>!prev}>
             {showPassword ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
          </span>
          <br />
        </div>
      </div>
      <button className=' yellow-bg' type='submit'>
            Create Account
        </button>
      
     
     
      
      </form>

    </div>
  )
}

export default SignupForm