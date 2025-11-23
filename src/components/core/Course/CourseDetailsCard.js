import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addToCart } from '../../../reducer/slices/cartSlice'
import {ACCOUNT_TYPE} from "../../../utils/constants"

const CourseDetailsCard = ({course,setConfirmationModal,handleBuyCourse}) => {

    console.log("Course",course)
    const {user} = useSelector((state)=> state.profile)
    const {token} = useSelector((state)=> state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

 
    const {
        thumbnail:ThumbnailImage,
        price:CurrentPrice,
        _id:courseId,
    } = course
    // console.log("thumb",course?.studentsEnrolled)
    const handleAddToCart = ()=>{
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an Instructor. You can't buy a course")
            return
        }

        if(token){
            dispatch(addToCart(course))
            return
        }
        setConfirmationModal({
            text1:"You are not logged in!",
            text2:"Please login to add To cart",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:()=> navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null),
        })
    }

  return (
    <>
    <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5'>
         <img src={ThumbnailImage} alt={course?.courseName}
         className='max-h-[300[px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover
         md:max-w-full' />
         <div className='px-4'>
            <div className='space-x-3 pb-4 text-3xl font-semibold'>Rs. {CurrentPrice}</div>
         </div>
         <div className='flex flex-col gap-4'>
            <button
            className='yellowButton'
            onClick={
                user && course?.studentEnrolled?.includes(user?._id)
                ? ()=> navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
                
            }
            >
                {user && course?.studentEnrolled?.includes(user?._id) ? "Go to Course": "Buy Now"}
            </button>
            {(!user || !course?.studentEnrolled.includes(user?._id)) && (
                <button
                onClick={handleAddToCart}
                className='cursor-pointer rounded-md bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5'>
                    Add To Cart
                </button>
            )}
         </div>
         <div>
            <p>30-Day Money Back Guarantee</p>
         </div>

    </div>
    </>
  )
}

export default CourseDetailsCard