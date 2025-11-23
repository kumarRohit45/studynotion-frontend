import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RenderSteps from "../AddCourse/RenderSteps"
import { useParams } from 'react-router-dom'
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI'
import { setCourse, setEditCourse } from '../../../../reducer/slices/courseSlice'

const EditCourse = () => {
  const dispatch = useDispatch()
  const {courseId} = useParams()
  const {course} = useSelector((state)=> state.course)
  const [loading,setLoading] = useState(false)
  const {token} = useSelector((state)=> state.auth)

  useEffect(()=>{
        ; (async()=>{
          setLoading(true)
          const result = await getFullDetailsOfCourse(courseId,token)
          if(result?.courseDetails){
            dispatch(setEditCourse(true))
            dispatch(setCourse(result?.courseDetails))
          }
          setLoading(false)
        })()
  },[])

  if(loading){
    return (
      <div className="grid flex-1 place-items-center">
      <div className="spinner"></div>
    </div>
    )
  }
  return (
    <div>
      <h1>
        Edit Course
      </h1>
      <div>
        { course? (
          <RenderSteps/>
        ):(
          <p>Course not found</p>
        )}
      </div>
    </div>
  )
}

export default EditCourse