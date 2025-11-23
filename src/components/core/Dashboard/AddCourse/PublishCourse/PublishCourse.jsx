import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { resetCourseState, setCourse } from '../../../../../reducer/slices/courseSlice'
import IconBtn from '../../../../common/IconBtn'
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI'


const PublishCourse = () => {
    const{register,handleSubmit, setValue,getValues} = useForm()

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token}  = useSelector((state)=> state.auth)
    const {course}  = useSelector((state)=> state.course)
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue("public",true)
        }
    },[])

    const goBack = ()=>{
        dispatch(setCourse(2))
    }

    const goToCourses = ()=>{
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")

    }
    const handleCoursePublish = async ()=>{
        //check if form has been updated or not
       
        if((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) || (course?.status === COURSE_STATUS.DRAFT && getValues("public")=== false)
        ){
    // form hasn't been updated
    //no need to make api call
    goToCourses()
    return 
    }

    
    const formData  = new FormData()
    formData.append("courseId",course._id)
    const courseStatus = getValues("public")
    ? COURSE_STATUS.PUBLISHED
    : COURSE_STATUS.DRAFT
    formData.append("status",courseStatus)
    console.log("formData",formData)
    setLoading(true)
    const result = await editCourseDetails(formData,token)
    if(result){
        console.log("publish course result",result);
        goToCourses()
    }
    setLoading(false)
        
    }
    const onSubmit = (data)=>{
     handleCoursePublish()
    }
  return (
    <div> 
        <p>
            Publish Settings
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="public">
                    <input type="checkbox"
                    id='public'
                    {...register("public")}
                     />
                     <span>Make this course as public</span>
                </label>
            </div>

            {/* Next prev Button */}
            <div>
                <button
                disabled={loading}
                type='button'
                onClick={goBack}
                className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'>Back</button>
                <IconBtn disabled={loading} text="Save Changes"/>
            </div>
        </form>
    </div>
  )
}

export default PublishCourse