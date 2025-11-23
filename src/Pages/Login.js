import React from 'react'
import Template from './Template'
import img from "../../src/assets - Copy/Images/login.webp"

const Login = () => {
  return (
    <div >
        <Template 
        heading={"Welcome Back"}
        subheading={"Builds skills for today , tomorrow, and beyond. "}
        subheading2={"Education to future-proof your career"}
        img={img} 
        formtype={"login"}/>
    </div>
  )
}

export default Login