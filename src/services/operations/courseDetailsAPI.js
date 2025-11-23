import {toast} from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { courseEndPoints } from "../apis";

const {
    COURSE_DETAILS_API,
    EDIT_COURSE_API,
    CREATE_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    COURSE_CATEGORIES_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    DELETE_COURSE_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API
} = courseEndPoints

export const fetchCourseDetails = async(courseId)=>{
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response = await apiConnector("POST",COURSE_DETAILS_API,{
            courseId
        })
        console.log("COURSE-DETAILS_API_RESPONSE...............",response)

        if(!response.data.success){
            throw new Error(response.data.message)

        }
        result = response.data
    } catch (error) {
        console.log("COURSE_DETAILS_API ERROR............",error)
        result = error.response.data        
    }
    toast.dismiss(toastId)
    return result
}

//edit the course details
export const editCourseDetails = async(data,token)=>{
    let result = null;
    const toastId = toast.loading("Loading...")
    console.log("jel")
    try {
        const response = await apiConnector("POST",EDIT_COURSE_API,data,{
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`
        })
        console.log("EDIT COURSE API RESPONSE........",response)
        if(!response?.data?.success){
            throw new Error("Could not Update course Datails")

        }
        toast.success("Course Details Updated Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("EDIT COURSE API ERROR..........",error)
        toast.error(error.message)

    }
    toast.dismiss(toastId)
    return result
}


// add the course details
export const addCourseDetails = async(data,token)=>{
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        let response = await apiConnector("POST", CREATE_COURSE_API,data,{
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`
        })
        console.log("CREATE COURSE API RESPONSE......",response)
        if(!response?.data?.success){
            throw new Error("COULD not Add Course Details")

        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE COURSE API ERROR.........",error)
        toast.error(error.message)

    }
    toast.dismiss(toastId)
    return result
}
//create a section
export const createSection = async(data,token)=>{
    let result  = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST",CREATE_SECTION_API,data,{
            Authorization:`Bearer ${token}`
        })
        console.log("CREATE SECTION API RESPONSE..........",response);
        if(!response?.data?.success){
            throw new Error("Couldn't Create Section")

        }
        toast.success("Course section created");
        console.log("hlo1")
        result = response?.data?.updatedCourseDetails
        console.log("hlo2",result)
    } catch (error) {
        console.log("CREATE SECTION API ERROR..........",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}

//update a section
export const updateSection = async(data,token)=>{
    let result = null
    const toastId = toast.loading("Loading......")
    try {
        const response  = await apiConnector("POST",UPDATE_SECTION_API,data,{
            Authorization:`Bearer ${token}`
        })
        console.log("UPDATE SECTION API RESPONSE..........",response)
        if(!response?.data?.success){
            throw new Error("Couldnot Update Section")

        }
        toast.success("course Section Updated")
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE SECTION API ERROR..........",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//Delete Section api
export const deleteSection = async(data,token)=>{
    let result = null 
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST",DELETE_SECTION_API,data,{
            Authorization:`Bearer ${token}`
        })
        console.log("DELETE SECTION API RESPONSE.........",response)
        if(!response?.data?.success){
            throw new Error("couldn't not delete section")
        }
        toast.success("Course Section Deleted")
        result = response?.data?.data
    } catch (error) {
        console.log("DELETE SECTION API ERROR............",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
//create a subsection
export const createSubSection = async(data,token)=>{
    let result = null
    const toastId = toast.loading("Loading......")
    try {
        console.log("h1")
        const response = await apiConnector("POST",CREATE_SUBSECTION_API,data,{
            Authorization:`Bearer ${token}`
        })
        console.log("h2")
        console.log("CREATE SUBSECTION API RESPONSE.........",response)
        if(!response?.data?.success){
            throw new Error("Couldn't Add Lecture")
        }
        toast.success("Lecture Added")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE SUBSECTION API ERROR......",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//update a subSection
export const updateSubSection = async(data,token)=>{
    let result =null
    const toastId = toast.loading("Loading....")
    try {
        console.log("first1")
        const response = await apiConnector("POST",UPDATE_SUBSECTION_API,data,{
            Authorization:`Bearer ${token}`
            
        })
        console.log("first2")
        console.log("UPDATE SUBSECTION API RESPONSE......",response)
        if(!response?.data?.success){
            throw new Error("Couldn't update Lecture")
        }

        toast.success("Lecture Updated")
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE SUBSECTION API ERROR.........",error)
        toast.error(error.message)

    }
    toast.dismiss(toastId)
    return result
}
//delete a subSection
export const deleteSubSection = async(data,token)=>{
    let result = null
    const toastId = toast.loading("Loading......")
    try {
        const response = await apiConnector("POST",DELETE_SUBSECTION_API,data,{
            Authorization:`Bearer ${token}`

        })

        console.log("DELETE SUBSECTION API RESPONSE..........",response)
        if(!response?.data?.success){
            throw new Error("Couldn't Delete Lecture")
        }
        toast.success("Lecture Deleted")
        result = response?.data?.data
    } catch (error) {
        console.log("DELETE SUBSECTION API ERROR..........",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
//delete course 
export const deleteCourse = async(data,token)=>{
    const toastId = toast.loading("Loading...") 
    try {
        const response = await apiConnector("DELETE",DELETE_COURSE_API,data,{
            Authorization:`Bearer ${token}`

        })
        console.log("DELETE COURSE API RESPONSE.........",response)
        if(!response?.data?.success){
            throw new Error("Couldnot delete course")
        }
        toast.success("Course Deleted")

    } catch (error) {
        console.log("DELETE COURSE API ERROR.......",error)
        toast.error(error.message)

    }
    toast.dismiss(toastId)
}
// get full details of a course
export const getFullDetailsOfCourse = async(courseId,token)=>{
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        const response  = await apiConnector("POST",GET_FULL_COURSE_DETAILS_AUTHENTICATED,{courseId},{Authorization:`Bearer ${token}`})
        console.log("COURSE FULL DETAILS API RESPONSE.......",response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }
       result = response?.data?.data
    } catch (error) {
        console.log("COURSE_FULL_DETAILS_API ERROR",error)
        result = error.response.data
    }
    toast.dismiss(toastId)
    return result
}

//fetching all courses under a specific instructor
 export const fetchInstructorCourses = async(token)=>{
    let result = []
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("GET",
            GET_ALL_INSTRUCTOR_COURSES_API,
            null,{
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("INSTRUCTOR COURSES API RESPONSE........",response)
        if(!response?.data?.success){
            throw new Error("Couldn't fetch instructor Courses")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("INSTRUCTOR COURSES API ERROR.......",error)
        toast.error(error.message)

    }
    toast.dismiss(toastId)
    return result
 }
// fatching the available course categories

export const fetchCourseCategories = async()=>{
    let result = []
    try{
        const response = await apiConnector("GET",COURSE_CATEGORIES_API)
        if(!response?.data?.success){
            throw new Error("Couldn't fetch course Categories")
        }
        result = response?.data?.data
    }
    catch(error){
        console.log("COURSE_CATEGORY_API ERROR....",error)
        toast.error(error.message)
    }
    return result
}

// mark a lecture as complete
export const markLectureAsComplete = async(data,token)=>{
    console.log("h")
    let result =null
    console.log("mark complete data",data)
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST",LECTURE_COMPLETION_API,data,{
            Authorization: `Bearer ${token}`

        })
        console.log("MARK_LECTURE_AS_COMPLETE_API RESPONSE............",response)

        if(!response.data.message){
            throw new Error(response.data.error)

        }
        toast.success("Lecture completed")
        result = true

    }catch(error){
        console.log("MARK_LECTURE_AS_COMPLETE_API_ERROR..........",error)
        toast.error(error.message)
        result = false
    }
    toast.dismiss(toastId)
    return result
}

export const createRating = async(data,token)=>{
    const toastId = toast.loading("Loading...")
    let success = false
    try {
        const response = await apiConnector("POST",CREATE_RATING_API,data,{
            Authorization: `Bearer ${token}`

        })
        console.log("CREATE RATING API RESPONSE.............",response)
        if(!response?.data?.success)
            throw new Error ("Could not Create Rating")
        toast.success("Rating Created")
        success = true
    } catch (error) {
        success = false
        console.log("CREATE RATING API ERROR........",error)
        toast.error(error.message)

    }
    toast.dismiss(toastId)
    return success
}