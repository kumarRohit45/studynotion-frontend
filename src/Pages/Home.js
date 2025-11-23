import React from 'react'
import { Link } from 'react-router-dom'
import {FaLongArrowAltRight} from 'react-icons/fa'
import HighlightedText from '../components/core/Homepage/HighlightedText';
import CTAButton from '../components/core/Homepage/button'
import Banner from '../assets - Copy/Images/banner.mp4'
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
import TimeLineSection from '../components/core/Homepage/TimeLineSection';
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection';
import InstructorSection from '../components/core/Homepage/InstructorSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/Homepage/ExploreMore';
import ReviewSlider from '../components/common/ReviewSlider';
const Home = () => {
  return (
    <div className='main-home'>
    <div className='home'>
    {/* --section-1----- */}
      
      <Link to={"/signup"}>

      <div className='btn-become'>
        <div className='become'>
          <p>Become a Instructor</p>
          <FaLongArrowAltRight></FaLongArrowAltRight>
        </div>
      </div>
      </Link>

      <div className='empower'>
        Empower Your Future With
        <HighlightedText text={"Coding Skills"}></HighlightedText>
      </div>

       <div className='description'>
        With you online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on-projects, quizzes, and personalized feedback from instructions.
       </div>

       <div className='two-btn'>
        <CTAButton active={true} linkto={"/signUp"}>
          Learn More
        </CTAButton>
        <CTAButton active={false} linkto={"/login"}>
          Book a Demo
        </CTAButton>
       </div>
       <div className='banner-video'>
        <video 
          loop
          muted
          
          autoPlay
          controls
          >
            <source src={Banner} type='video/mp4'/>
          </video>
       </div>

       {/*code section 1 */}
       <div className='sec1'>

       <CodeBlocks 
            position={"flex-row"}
            heading={
              <div>
                <div className='Unlock-potential'>

               <p>Unlock Your</p>
               <HighlightedText text={"coding potential"}></HighlightedText>  
                 {" "}
                </div>
                 with our online courses
             
              </div>
            }

            subheading={
              "Our courses are designed and taught by industry experts who have years of expererience in coding and passionate about sharing their knowledge with you"
            }
            ctabtn1={
              {
                btnText:"try it yourself",
                linkto:"/signUp",
                active:true,
              }
            }
            ctabtn2={
              {
                btnText:"Learn more",
                linkto:"/login",
                active:false,
              }
            }
            codeblock={`<!DOCTYPE html>\n<html>\n<head><title>This is the title for StudyNotion</title></head>\n<body>\n<h3>Study Notion </h3>\n</body>\n</html>\n`}
            blob={false}
            ></CodeBlocks>

       </div>

    {/* --section-2----- */}
    <div className='sec1'>
    <CodeBlocks 
            position={"flex-row-reverse"}
            heading={
              <div>
                
                Start   <HighlightedText text={"coding in seconds"}></HighlightedText>   
             
              </div>
            }

            subheading={
              "Go ahead, give it a try. Our hands-on learing environment means, you'll be writing real code from your very first session"
            }
            ctabtn1={
              {
                btnText:"try it yourself",
                linkto:"/signUp",
                active:true,
              }
            }
            ctabtn2={
              {
                btnText:"Learn more",
                linkto:"/login",
                active:false,
              }
            }
            codeblock={`<!DOCTYPE html>\n<html>\n<head><title>This is the title for StudyNotion</title></head>\n<body>\n<h3>Study Notion </h3>\n</body>\n</html>\n`}
            blob={true}
            ></CodeBlocks>
    </div>
    <ExploreMore/>
    </div>

    {/* --section2- */}
    <div className='section-2'>
      <div className='frame-bg'>
        <div className='frame-btns-center'>

        <div className='two-btn'>

   

          <CTAButton linkto={"/signup"} active={true}>
            Explore Full Catalog
          <FaLongArrowAltRight></FaLongArrowAltRight>
          </CTAButton>

        

          <CTAButton linkto={"/signup"} active={false}>
            Learn More
          
          </CTAButton>
        </div>

      </div>
     </div>


   

   
     <div className='mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8'>
        <div className='mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0'>
          <div className='text-4xl font-semibold lg:w-[45%]'>
            Get the Skills you need for a {" "}
            <HighlightedText text={'Job that is in demand'}/>
          </div>
        <div className='flex flex-col items-start gap-10 lg:w-[40%]'>
          <div className='text-[16px]'>
            The Modern StudyNotion is the dictates its own terms. Today, to be a competitive speacialist requires more than professional skills.
          </div>
          <CTAButton linkto={"/signup"} active={true}>
            Learn More
          </CTAButton>
        </div>

        </div>
        <TimeLineSection/>
        <LearningLanguageSection/>
        </div>


     {/* </div> */}


    </div>
    {/* --section-3----- */}
    <div className='relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white'>

   <InstructorSection/>
   
   <h1 className='text-center text-4xl font-semibold mt-8'>Reviews from other learners</h1>
   <ReviewSlider/>
    </div>

    {/* --footer----- */}
    <Footer/>
    </div>
  )
}

export default Home