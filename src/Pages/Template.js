import React from 'react'
import HighlightedText from '../components/core/Homepage/HighlightedText'
import SignupForm from '../components/core/Navbar/SignupForm'
import LoginForm from '../components/core/Navbar/LoginForm'
import CTAButton from '../components/core/Homepage/button'

const Template = ({heading,subheading,subheading2,img,formtype,setloggedIn}) => {
  return (
    <div className='log-Sign'>
        <div className='w-2/5'>
 
 <h2 className='text-lg font-bold'>{heading}</h2>

  
 
 <HighlightedText text={subheading2} text2={subheading} />

 

{formtype === 'signup' ? 
<SignupForm  setloggedIn ={setloggedIn} />


: <LoginForm setloggedIn ={setloggedIn} />}

{/* <div>
    <div className="line-left"></div>
    <p>Or</p>
    <div className="line-left"></div>
</div> */}

{/* <CTAButton active={true} linkto={"/signupGoogle"}/> */}

</div>

<div className='basis-2/4'>
    <img src={img} alt="" />
</div>
    </div>
  )
}

export default Template