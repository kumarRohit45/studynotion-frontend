import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import {IoIosArrowBack} from "react-icons/io"
import {BsChevronDown} from "react-icons/bs"
import IconBtn from "../../common/IconBtn"

const VideoDetailsSideBar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("")
    const [videoBarActive, setVideoBarActive] = useState("")
    const navigate = useNavigate()
    const location = useLocation()
    const {sectionId, subSectionId} = useParams();

    const{
      courseSectionData,
      courseEntireData,
      totalNoOfLectures,
      completedLectures
    } = useSelector((state)=> state.viewCourse)

    useEffect(()=>{
      console.log("view course all data",
        totalNoOfLectures,"4",
        completedLectures)
      ;(()=>{
        if(!courseSectionData.length) return

        const currentSectionIndex = courseSectionData.findIndex((data)=> data._id === sectionId)

        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data)=> data._id === subSectionId)
        const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id
        setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)

        setVideoBarActive(activeSubSectionId)
      })()
    },[courseSectionData,courseEntireData,location.pathname])
  return (
    <>
    <div>
      <div className='text-lg text-richblack-25 border-richblack-600 py-5 font-bold border-b '>
        <div>
          <div className='text-richblack-700 hover:scale-90'
           title='back'
          onClick={()=>{
            navigate(`/dashboard/enrolled-courses`)
          }}>
              <IoIosArrowBack size={30} />
          </div>
          <IconBtn text="Add Review"
          customClasses="ml-auto"
          onclick={()=> setReviewModal(true)}
          />
        </div>

        <div className='flex flex-col'>
          <p>
            {courseEntireData?.courseName}
          </p>
          <p className='text-sm font-semibold text-richblack-500'>{completedLectures?.length} / {totalNoOfLectures}</p>
        </div>
        </div>

        <div>
          {courseSectionData.map((section,index)=> (
            <div className='text-sm mt-2 cursor-pointer text-richblack-5 mt-2'
            onClick={()=> setActiveStatus(section?._id)}
            key={index}>
              {/* Section */}
              <div>
                <div>
                  {section?.sectionName}
                </div>
                <div>
                  <span className={`${ activeStatus === section?.sectionName ? "rotate-0": "rotate-180"} transition-all duration-500`}>
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections*/}

              { activeStatus === section?._id && (
                <div>
                  {section.subSection.map((topic,i)=>(
                    <div className={`flex gap-3 px-5 py-2 ${videoBarActive === topic._id ? "bg-yellow-200 font-semibold text-richblack-800":"hover:bg-richblack-900"}`}
                    key={i}
                    onClick={()=>{
                      navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                      setVideoBarActive(topic._id)
                    }}>
                      <input type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                    />
                  {topic.title}
                    </div>
                  ))}
                </div>
              )}


            </div>
          ))}
        </div>
        </div></>
  )
}

export default VideoDetailsSideBar