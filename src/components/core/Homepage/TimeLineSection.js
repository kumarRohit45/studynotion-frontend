import React from 'react'
import timeLineImage from "../../../assets - Copy/Images/TimelineImage.png"
import logo1 from "../../../assets - Copy/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets - Copy/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets - Copy/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets - Copy/TimeLineLogo/Logo4.svg"


const timeline = [
    {
        logo:logo1,
        heading:"Leadership",
        description:"Fully commited to the success company",
    },
    {
        logo:logo2,
        heading:"Responsibility",
        description:"Fully commited to the success company",
    },
    {
        logo:logo3,
        heading:"flexibility",
        description:"Fully commited to the success company",
    },
    {
        logo:logo4,
        heading:"Solve the problem",
        description:"Fully commited to the success company",
    }
]

const TimeLineSection = () => {

  return (
    <div >
        <div className='flex flex-col lg:flex-row gap-20 mb-20 items-center'>
            <div className='lg:w-[45%] flex flex-col gap-14 lg:gap-3'>
              {
                timeline.map((element,index)=>{
                    return(
                        <div key={index} className='timelineL_R-container'>
                            <div className='timeline-left'>
                               <img src={element.logo} alt="" />
                            </div>
                            <div className='timeline-right'>
                                <h2 className='text-sm'>{element.heading}</h2>
                                <p className='text-[11px] py-2'>{element.description}</p>
                            </div>

                        </div>
                    )
                })
              }
            </div>
            <div className='relative w-fite h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]'>
                
            <div className='absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10'>
                <div className='flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14'>
                 <h1 className='text-3xl font-bold w-[75px]'>10</h1>
                 <h1 className='text-caribbeangreen-300 text-sm w-[75px]'>Years expererience</h1>
                </div>

                <div className='flex gap-5 items-center lg:px-14 px-7'>
                   <h1 className='text-3xl font-bold w-[75px]'>250</h1>
                   <h1 className='text-caribbeangreen-300 text-sm w-[75px]'>types of courses</h1>
                </div>
            </div>
            <img className='shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit ' src={timeLineImage} alt="" />
            </div>
          
        </div>
    </div>
  )
}

export default TimeLineSection