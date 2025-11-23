import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import {MdAddCircleOutline} from 'react-icons/md'
import {BiRightArrow} from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../reducer/slices/courseSlice';
import {toast} from 'react-hot-toast';
import NestedView from './NestedView';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';


const CourseBuilderForm = () => {

  const {register,handleSubmit,setValue,formState:{errors}} = useForm();
  const dispatch = useDispatch();
  const[editSectionName,setEditSectionName] = useState(null);
  const {course} = useSelector((state)=>state.course);
  const {token} = useSelector((state)=>state.auth);
  const [loading, setLoading] = useState(false);

  console.log("in courseBuilder",course)

  const onSubmit = async(data)=>{
    setLoading(true);
    let result ;
    if(editSectionName){
      //we are editing the section name
      result = await updateSection(
        {
          sectionName:data.sectionName,
          sectionId:editSectionName,
          courseId:course._id,

        },token
      )
    }
    else{
      console.log("result1",result);
      result = await createSection({
        sectionName:data.sectionName,
        courseId:course._id,

      },token)
    }

    //update values
    console.log("helloCourseBuilder")
    if(result){
      console.log("resultCourseBuilder",result)
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName","")
    }

    //loading false
    setLoading(false)
  }


  const cancelEdit=()=>{
         setEditSectionName(null);
         setValue("sectionName","");
  }

  const handleChangeEditSectionName = (sectionId,sectionName)=>{
    if(editSectionName === sectionId){
      cancelEdit();
      return 
    }
    setEditSectionName(sectionId);
    setValue("sectionName",sectionName)
  }
  const goBack = ()=>{
       dispatch(setStep(1));
       dispatch(setEditCourse(true));
  }
  const goToNext = ()=>{
       if(course.courseContent.length === 0 ){
        toast.error("Please add atleast one section")
        return;
       }
       if(course.courseContent.some((section)=> section.subSection.length === 0)){
        toast.error("Please add atleast one lecture in each section")
        return;
       }
       //if everything is good
       dispatch(setStep(3));
  }
  return (
    <div className='text-white'>
       <p>Course Builder</p>
       <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="sectionName">Section name <sup>*</sup></label>
          <input 
          id='sectionName'
          placeholder='Add section name'
          {...register("sectionName",{required:true})}
          className='w-full'
           />
           {errors.sectionName && (
            <span>Section name is required</span>
           )}
        </div>
        <div className='mt-10 flex w-full'>
          <IconBtn
          type="submit"
          text={editSectionName ? "Edit Section Name":"Create Section"}
          outline={true}
          customClasses={"text-white"}
          >
            <MdAddCircleOutline className="text-yellow-50" size={20}/>
          </IconBtn>

          {editSectionName &&(
            <button
            type='button'
            onClick={cancelEdit}
            className='text-sm text-richblack-300 underline ml-10'>

              Cancel Edit
            </button>
          )}
        </div>
       </form>
      

      {course.courseContent.length > 0 && (
      
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
       
        
       
      )}

      <div className='flex justify-end gap-x-3'>
        <button 
        onClick={goBack}
        className='rounded-md cursor-pointer flex items-center'>
          Back
        </button>

        <IconBtn text="Next" onclick={goToNext}>
          <BiRightArrow/>
        </IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm