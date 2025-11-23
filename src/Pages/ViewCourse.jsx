import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import {getFullDetailsOfCourse} from "../services/operations/courseDetailsAPI"
import { setCompletedLectures, setCourseSectionData, setEntireData, setTotalNoOfLectures } from '../reducer/slices/viewCourseSlice'
import VideoDetailsSideBar from '../components/core/ViewCourse/VideoDetailsSideBar'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal'

const ViewCourse = () => {

    const {courseId} = useParams()
    const {token} = useSelector((state)=> state.auth)
    const dispatch = useDispatch()
    const [reviewModal,setReviewModal] = useState(false)

    useEffect(()=>{
        ;(async()=>{
            const courseData = await getFullDetailsOfCourse(courseId,token)

            console.log("in viewCourse, Full course details data.......",courseData)

            dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
            dispatch(setEntireData(courseData.courseDetails))
            dispatch(setCompletedLectures(courseData.completedVideos))
            let lectures = 0
            courseData?.courseDetails?.courseContent?.forEach((sec)=>{
              lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures))
        })()
    },[])
  return (
    <>
      <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
        <VideoDetailsSideBar setReviewModal={setReviewModal}/>
        <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
            <div className='mx-6'>
                <Outlet/>
            </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </>
  )
}

export default ViewCourse