import React from 'react'
import Template from './Template'
import img from '../assets - Copy/Images/signup.webp'

const Signup = () => {
  return (
    <div>
        <Template
        heading={"Join the millions learning to code with StudyNotion for free"}
        subheading={"Build skills for today, tomorrow and beyond. "}
        subheading2={"Education to future-proof your career"} 
        formtype={"signup"}
        img={img}/>
    </div>
  )
}

export default Signup