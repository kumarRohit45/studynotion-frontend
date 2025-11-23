import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createRating } from '../../../services/operations/courseDetailsAPI'
import { useSelector } from 'react-redux'
import {RxCross2} from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import IconBtn from '../../common/IconBtn'

const CourseReviewModal = ({setReviewModal}) => {

  const {user} = useSelector((state)=> state.profile)
  const {token} = useSelector((state)=> state.auth)
  const {courseEntireData} = useSelector((state)=> state.viewCourse)

  const {register,handleSubmit,setValue,formState:{errors}} = useForm()

  useEffect(()=>{
    setValue("courseExperience","")
    setValue("courseRating",0)
  },[])

  const ratingChanged = (newRating)=>{
    setValue("courseRating",newRating)
  }

  const onSubmit  = async(data)=>{
    await createRating({
      courseId:courseEntireData._id,
      rating:data.courseRating,
      review:data.courseExperience
    }, token)
    setReviewModal(false)
  }
  return (
    <div>
        <div>
          <div>
            <p className='text-xl font-semibold text-richblack-5'>Add Review</p>
            <button onClick={()=> setReviewModal(false)}>
              <RxCross2 className="text-2xl text-richblack-5" />

            </button>
          </div>
          <div>
            <div>
              <img src={user?.image} alt={user?.firstName + "profile"}
              className='aspect-square w-[50px] rounded-full object-cover'/>
              <div>
                <p className='font-semibold text-richblack-5'>
                  {user?.firstName} {user?.lastName}
                </p>
                <p className='text-sm text-richblack-5'>Posting Publicity</p>
              </div>
            </div>

               <form onSubmit={handleSubmit(onSubmit)}>
               <ReactStars
               count={5}
               onChange={ratingChanged}
               size={24}
               activeColor="#ffd700"
               />

               <div>
                <label htmlFor="courseExperience" className='text-sm text-richblack-5'>Add Your Experience <sup className='text-pink-200'>*</sup></label>
                <textarea 
                 id="courseExperience"
                 placeholder='Add Your Experience'
                 {...register("courseExperience",{required:true})}
                 className='form-style resize-x-none min-h-[130px] w-full'></textarea>
                 {errors.courseExperience && (
                  <span className='ml-2 text-xs tracking-wide text-pink-200'>Please Add Your Experience</span>
                 )}
               </div>
               <div>
                <button
                onClick={()=> setReviewModal(false)}>
                  Cancel
                </button>
                <IconBtn
                text={"save"} />
               </div>
               </form>
          </div>
        </div>
    </div>
  )
}

export default CourseReviewModal