import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import { setCourse, setStep } from '../../../../../reducer/slices/courseSlice';
import {toast} from 'react-hot-toast'
import RequirementField from './RequirementField'
import IconBtn from '../../../../common/IconBtn';
import {COURSE_STATUS} from '../../../../../utils/constants'
import ChipInput from './ChipInput';


import Upload from '../Upload';
import { MdNavigateNext } from 'react-icons/md';

export const CourseInformationForm = () => {

  const {
     register,
     handleSubmit,
     setValue,
     getValues,
     formState:{errors},
  } = useForm();

  const {token} = useSelector((state)=>state.auth); 
  const dispatch = useDispatch();
  const {course,editCourse,step} = useSelector((state)=>state.course);
  const [loading,setLoading] = useState(false);
  const [courseCategories,setCourseCategories] = useState([]);

  useEffect(()=>{
          const getCategories = async()=>{
            setLoading(true);
            const categories = await fetchCourseCategories();
            console.log(categories)
            if(categories.length>0){
              setCourseCategories(categories);
            }
            setLoading(false);
          }
          if(editCourse){
            console.log("in CourseInfo",course);
            setValue("courseTitle",course.courseName);
            setValue("courseShortDesc",course.courseDescription);
            setValue("coursePrice",course.price);
            setValue("courseTags",course.tag);
            setValue("courseBenefits",course.whatYouWillLearn);
            setValue("courseCategory",course.category);
            setValue("courseRequirements",course.instructions);
            console.log("courseRequirements",course.instructions);
            setValue("courseImage",course.thumbnail);
            console.log("courseImage",course.thumbnail)
          }

          getCategories();
  },[]);

  const isFormUpdated = ()=>{
    const currentValues = getValues();
    if(
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn||
      currentValues.courseCategory.id !== course.category._id ||
      currentValues.courseImage !== course.thumbnail||
      currentValues.courseRequirements.toString() !== course.instructions.toString() 
      
    )
       return true;
    else 
      return false;
  }

  console.log("step1",step);
  //handle onsubmit(next button) click
  const onSubmit = async(data)=>{
    console.log("courseInformationData",data)
    if(editCourse){
      if(isFormUpdated()){
        console.log("hello1")
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId",course._id);
        if(currentValues.courseTitle !== course.courseName){
          formData.append("courseName",data.courseTitle);
        }
        if(currentValues.courseTitle !== course.courseName){
          formData.append("courseDescription",data.courseShortDesc);
        }
        if(currentValues.coursePrice !== course.coursePrice){
          formData.append("price",data.coursePrice);
        }
        if(currentValues.courseTags.toString() !== course.tag.toString()){
          formData.append("tag",JSON.stringify(data.courseTags))
        }
        if(currentValues.courseBenefits !== course.whatYouWillLearn){
          formData.append("whatYouWillLearn",data.courseBenefits);
        }
        if(currentValues.courseCategory._id !== course.category._id){
          formData.append("category",data.courseCategory);
        }
        if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
          formData.append("instructions",data.courseRequirements);
        }
        if(currentValues.courseImage !== course.thumbnail){
          formData.append("thumbnailImage",data.courseImage)
        }
        setLoading(true);
        const result = await editCourseDetails(formData,token);
        console.log("result1editcoursedetails",result);
        setLoading(false);
        if(result){
          console.log("result2editcoursedetails",result);
          dispatch(setStep(2));
          console.log("step3",step)
          
          dispatch(setCourse(result))
        }
      }
      else{
        toast.error("NO changes made so far")

      }
      return;
    }
    console.log("hello2")

    // create a new course
    const formData = new FormData();
    formData.append("courseName",data.courseTitle);
    formData.append("courseDescription",data.courseShortDesc);
    formData.append("price",data.coursePrice);
    formData.append("tag",JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn",data.courseBenefits);
    formData.append("category",data.courseCategory);
    formData.append("instructions",JSON.stringify(data.courseRequirements));
    formData.append("status",COURSE_STATUS.DRAFT);
    formData.append("thumbnailImage",data.courseImage)
    console.log("formData",formData);

    setLoading(true);
    const result = await addCourseDetails(formData,token);
    console.log("hello3",result)
    if(result ){
      console.log('hello4',result)
    dispatch(setStep(2))
      console.log("step2",step);
      dispatch(setCourse(result))
    }
    setLoading(false)

  }
  

  return (
   <form 
   onSubmit={handleSubmit(onSubmit)}
   className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'>
    <div
    className='flex flex-col space-y-2'>
        <label htmlFor="courseTitle" className='text-sm text-richblack-5'>Course Title <sup className='text-pink-200'>*</sup></label>
        <input 
        id='courseTitle'
        placeholder='Enter Course Title'
        {...register("courseTitle",{required:true})
            } 
        className='w-full form-style'/>
        {
          errors.courseTitle &&(
            <span className='ml-2 text-xs tracking-wide text-pink-200'>Course Title is Required**</span>
          )
        }
    </div>
    <div className='flex flex-col space-y-2'>
      <label htmlFor="courseShortDesc" className='text-sm text-richblack-5'>Course Short Description <sup className='text-pink-200'>*</sup></label>
      <textarea id='courseShortDesc'
      placeholder='Enter Description'
      {...register("courseShortDesc",{required:true})}
      className='min-h-[140px] w-full form-style resize-x-none min-h' />
      {
        errors.courseShortDesc && (
          <span className='ml-2 text-xs tracking-wide text-pink-200'>
            Course Description is required**
          </span>
        )
      }
    </div>

    <div className='relative flex flex-col space-y-2'>
      <label htmlFor="coursePrice" className='text-sm text-richblack-5'>Course Price <sup className='text-pink-200'>*</sup></label>
      <input 
      
      id='coursePrice'    
      placeholder='Enter Course Price'
      {...register("coursePrice",{
        required:true,
        valueAsNumber:true,
        pattern:{
          value:/^(0|[1-9]\d*)(\.\d+)?$/,
        }
      })}
      className='w-full form-style !p1-15'
      />
      <HiOutlineCurrencyRupee className='absolute top-1/2 text-richblack-400 left-1 inline-block -translate-y-1 text-2xl'/>
      {
        errors.coursePrice &&
        <span>Course Price is required**</span>
      }
    </div>

    <div className='flex flex-col space-y-2'>
      <label  className='text-sm text-richblack-5' htmlFor="courseCategory">Course Category <sup>*</sup></label>
      <select
       id="courseCategory"
       className='form-style w-full'
       defaultValue=""
       {...register("courseCategory",{required:true})}>
          
          <option value="" disabled>Choose a Category</option>
          {
            !loading && courseCategories.map((category,index)=>(
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))
          }

       </select>

       {errors.courseCategories && (
        <span className='ml-2 text-xs tracking-wide text-pink-200'>Course Category is Required**</span>
       )}

    </div>

    {/* create a custom component for handling tags input */}
    <ChipInput
    label="Tags"
    name="courseTags"
    placeholder="Enter Tags and press Enter"
    register={register}
    errors = {errors}
    setValue={setValue}
    getValues ={getValues}
    />
    {/* create a custom component for uploading and showing preview of media */}
    <Upload
    name="courseImage"
    label="Course Thumbnail"
    register={register}
    setValue ={setValue}
    errors={errors}
    editData={editCourse ? course?.thumbnail:null}/>

    {/* Benefits of the course */}
    <div className='flex flex-col space-y-2'>
      
      <label className='text-sm text-richblack-5' htmlFor="courseBenefits">Benefits of the course <sup className='text-pink-200'>*</sup></label>
      <textarea 
       id="courseBenefits"
       placeholder='Enter Benefits of the course'
       {...register("courseBenefits",{required:true})}
       className='min-h-[130px] w-full form-style resize-x-none min-h-[130px]'
       ></textarea>
       {errors.courseBenefits && (
        <span className='ml-2 text-xs tracking-wide text-pink-200'>
        Benefits of the course are required**
        </span>
       )}
    </div>

    <RequirementField
    name="courseRequirements"
    label="Requirements/Instructions"
    register={register}
    errors={errors}
    setValue={setValue}
    getValues = {getValues}
    />

    <div>
      {
        editCourse && (
          <button
          onClick={()=> dispatch(setStep(2))}
          className='flex items-center gap-x-2 bg-richblack-300 rounded-md py-[8px] px-[20px] font-semibold text-richblack-900'>
            Continue Without Saving
          </button>
        )
      }
      <IconBtn
      disabled={loading}

      text={!editCourse ? "Next" : "Save Changes"}
      >
        <MdNavigateNext/>
      </IconBtn>
    </div>
    
   </form>
  )
}
