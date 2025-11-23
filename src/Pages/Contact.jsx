import React from 'react'
import ContactUsForm from '../components/core/ContactPage/ContactUsForm'
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"
import ReviewSlider from '../components/common/ReviewSlider'
import Footer from '../components/common/Footer'



const data = [
    {
        icon: "HiChatBubbleLeftRight",
        heading:"Chat on us",
        subheading:"Our friendly team is here to help.",
        details: "info@studynotion.com"
    },
    {
        icon:"BiWorld",
        heading:"Visit us",
        subheading:"Come and say hello at our office HQ.",
        details: "123 Head quarters, Shimla, Himachal Pradesh-174101"
    },
    {
        icon: "IoCall",
        heading:"Call us",
        subheading:"Mon-Fri 9am to 3:30pm",
        details:" +1234567890"
    },
]

const Contact = () => {
  return (
    <div>
    <div className='mx-auto mt-20 flex  flex-col w-11/12 max-w-maxContent justify-between gap-10 text-white lg:flex-row'>
        {/* left */}
        <div className='lg:w-[40%]'>
        <div className='flex flex-col gap-5 rounded-xl bg-richblack-800 p-4 lg:p-6 '>
          {
            data.map((ele,i)=>{
                let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
                return(
                    <div key={i}
                    className='flex flex-col gap-[2px] p-3 text-sm text-richblack-200'>

                  <div className='flex flex-row items-center gap-3'>

                    <Icon size={25} />
                     <h1 className='text-lg font-semibold text-richblack-5'>{ele.heading}</h1>

                  </div>
                  <p className='font-medium'>{ele?.subheading}</p>
                  <p className='font-medium'>{ele?.details}</p>
                    </div>
                )
            })
          }
        </div>
        </div>
        {/* right */}
        <div className='lg:w-[60%]'>

            <div className='border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col mb-3'>
            <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>
      <p className="">
        Tell us more about yourself and what you&apos;re got in mind.
      </p>
            </div>
         
            <ContactUsForm/>
        </div>
    </div>
    <div>
        <h1>Reviews from other learner</h1>
        <ReviewSlider/>
    </div>
    <Footer/>
    </div>
  )
}

export default Contact