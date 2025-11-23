import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

import CountryCode from '../../../data/countrycode.json'
import { contactUsPoint } from '../../../services/apis';
import { apiConnector } from '../../../services/apiconnector';
import toast from 'react-hot-toast';

const ContactUsForm = () => {
    const [loading,setLoading] = useState(false);
    const{
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    } = useForm();
    useEffect(()=>{
            if(isSubmitSuccessful){
                reset({
                    email:"",
                    firstname:"",
                    lastname:"",
                    message:"",
                    phoneNo:"",
                })
            }
    },[reset,isSubmitSuccessful])

    const submitContactForm = async(data)=>{
         try {
            setLoading(true)
            const res = await apiConnector("POST", contactUsPoint.CONTACT_US_API, data)
            toast.success("Message Sent Successfully")

            setLoading(false)
         } catch (error) {
            console.log("ERROR MESSAGE -", error.message)
            setLoading(false)
            toast.error("Error while Sending message, Please try again later")
         }
    }

   
  return (

   <form onSubmit={handleSubmit(submitContactForm)}
   className='flex flex-col gap-7 w-11/12 mx-auto'>
    <div
    className='flex flex-col gap-5 lg:flex-row'>
        <div className='flex flex-col gap-2 lg:w-[48%]'>
           

            <label htmlFor="firstname">
                First Name
            </label>
            <input type="text"
            name='firstname'
            id='firstname'
            placeholder='Enter first name'
            className='form-style'
            {...register("firstname",{required:true})} />
            {errors.firstname && (
                <span className='-mt-1 text-[12px] text-yellow-100'>
                    Please enter your first name

                </span>

              )}
               
            </div>
        <div className='flex flex-col gap-2 lg:w-[48%]'>
            <label htmlFor="lastname">
                Last Name
            </label>
            <input type="text"
            name='lastname'
            id='lastname'
            className='form-style'
            placeholder='Enter last name'
            {...register("lastname")} />
           
        </div>
     </div>

        <div className='flex flex-col gap-2'>
            <label htmlFor="email">
                Email Address
            </label>
            <input type="email"
            className='form-style'
            name='email'
            id='email'
            placeholder='Enter your email'
            {...register("email",{required:true})} />
            {errors.email && (
                <span className='-mt-1 text-[12px] text-yellow-100'>
                    Please enter your Email address

                </span>

            )}
        </div>

        <div className='flex flex-col gap-2'>
            <label htmlFor="phonenumber">
                Phone Number
            </label>

            <div className='flex gap-5 '>
                {/* dropdown */}
                <div className='w-[81px] flex flex-col gap-2'>
                    <select name="phonenumber" id="phonenumber"
                    
                    {...register("countrycode",{
                        required:true
                    })}
                    className='form-style'>
                        { 
                        CountryCode.map((element,i)=>{
                            return (
                                <option value={element.code}
                                key={i}>
                                    {element.code} - {element.country}
                                </option>
                            )
                        })
                        }
                    </select>
                </div>
                {/* input mobile number */}
                <div className='w-[calc(100%-80px)] flex flex-col gap-2'>
                    <input type="number"
                    name='phonenumber'
                    id='phonenumber'
                    placeholder='12345 67890'
                    {...register("phoneNo",{
                        required:{value:true,message:"Please enter your phone number. ",

                        },
                        maxLength:{value:12,message:"Invalid phone number"},
                        minLength:{value:10,message:"Invalid phone number"},
                    })} 
                    className='form-style'/>
                </div>
            </div>
            {errors.phoneNo &&(
                <span className='-mt-1 text-[12px] text-yellow-100'>
                    {errors.phoneNo.message}
                </span>
            )}
        </div>

        <div className='flex flex-col gap-2'>
            <label htmlFor="message">
                Message

            </label>
            <textarea name="message" id="message"
            cols={"30"}
            rows={"7"}
            placeholder='Enter your message here'
            {...register("message",{required:true})}
            className='form-style'></textarea>
            {errors.message && (
                <span className='-mt-1 text-[12px] text-yellow-100'>
                    Please enter your message.
                </span>
            )}
        </div>

           <button
           disabled={loading} 
           type='submit'
           className={`rounded-md bg-yellow-50 px-6 py-3

            text-center text-[13px] text-black
            shadow-[2px_2px_0px_0px_rgba(255,255,255,0,18)]
            ${
                !loading && "transition-all duration-200 hover:scale-95 hover:shadow-none"
            }
            disabled:bg-richblack-500 sm:text-[16px]

            `}>
            Send Message
           </button>
   </form>
  )
}

export default ContactUsForm