import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const RequirementField = ({name,label,register,errors,setValue,getValues}) => {
    const[requirement,setRequirement]  = useState("")
    const[requirementList,setRequirementList]= useState([]);
    const {editCourse,course} = useSelector((state)=> state.course)

    useEffect(()=>{
        if(editCourse){
            setRequirementList(course?.instructions)
        }
        register(name,{
            required:true,
            validate:(value)=>value.length>0
        })
    },[])

    useEffect(()=>{
        setValue(name,requirementList);
    },[requirementList])

    const handleAddRequirement = ()=>{
        console.log(requirement);
        if(requirement){
            setRequirementList([...requirementList,requirement])
            setRequirement("");
        }
        // console.log(requirementList)
    }

    const handleRemoveRequirement=(index)=>{
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index,1);
        setRequirementList(updatedRequirementList);
    }
    const handleOnChange= (e)=>{
        setRequirement(e.target.value);
        console.log(requirement);
    }
  return (
    <div className='flex flex-col space-y-2'>
        <label className='text-sm text-richblack-5' htmlFor={name}>{label} <sup className='text-pink-200'>*</sup></label>
        <div className='flex flex-col items-start space-y-2'>
            <input 
            type="text"
            id={name}
            value={requirement}
            onChange={(e)=>handleOnChange(e)}
            className='w-full form-style'

            />
            <button type="button"
            onClick={handleAddRequirement}
            className='font-semibold text-yellow-50'          >
                Add
            </button>
        </div>
        {
            requirementList.length>0 &&(
                <ul className='mt-2 list-inside list-disc'>
                    {
                        requirementList.map((requirement,index)=>(
                            <li key={index}
                            className='flex items-center text-richblack-5'>
                                <span>{requirement}</span>
                                <button
                                type='button'
                                onClick={()=>handleRemoveRequirement(index)}
                                className='ml-2 text-xs text-pure-greys-300'>clear</button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {errors[name] && (
             <span>Requirement field is required**</span>
        )}
    </div>
  )
}

export default RequirementField