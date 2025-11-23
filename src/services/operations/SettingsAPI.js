import { toast } from "react-hot-toast"
import { settingsEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { setUser } from "../../reducer/slices/profileSlice";
import {logout} from "../operations/authAPI"

const {UPDATE_DISPLAY_PICTURE_API,UPDATE_PROFILE_API,CHANGE_PASSWORD_API,DELETE_PROFILE_API} = settingsEndpoints


export function updateDisplayPicture(token,formData){
    
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        try {
            console.log("hhh");
            
            const response = await apiConnector("PUT",UPDATE_DISPLAY_PICTURE_API,formData,{
                "Content-Type":"multipart/form-data",
                Authorization: `Bearer ${token}`
            })
            console.log("hhh");

            console.log("UPDATE display Picture API .... RESPONSE----",response

            )

            if(!response.data.success){
                throw new Error(response.data.data)
            }
            toast.success("DISPLAY PICURE UPDATED SUCCESSFULLY")
            dispatch(setUser(response.data.data))
            localStorage.setItem("user",JSON.stringify(response.data.data))
            console.log("data ",response.data.data)
        } catch (error) {
            console.log("UPdate display picture api error.....",error)
        }
        toast.dismiss(toastId)
    }
}

export function updateProfile(token, formData){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading....")
        try {
            const response  = await apiConnector("PUT",UPDATE_PROFILE_API, formData,{
                Authorization: `Bearer ${token}`
            })
            console.log("UPDATE PROFILE API RESPONSE........",response)

            console.log("h1")
            if(!response.data.success){
                throw new Error(response.data.message)
            }

            console.log("h1")
            
            const userImage = response.data.updatedUserDetails.image
            ? response.data.updatedUserDetails.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`
            console.log("h1",response.data.updatedUserDetails)
            

            dispatch(setUser({...response.data.updatedUserDetails, image: userImage}))
            console.log("h2")

            toast.success("Profile Updated Successfully")
        } catch (error) {
            console.log("UPDATED_PROFILE_API ERROR........")
            toast.error("Could not Updated Profile")
        }
        toast.dismiss(toastId)
    }
}

export async function changePassword(token, formData){
    const toastId =  toast.loading("Loading...")
    try {
        const response = await apiConnector("POST",CHANGE_PASSWORD_API, formData,{
            Authorization:`Bearer ${token}`
        })
        console.log("CHANGE_PASSWORD_API RESPONSE", response)

        if(!response.data.success){
            throw new Error(response.data.message)

        }

        toast.success("Password Changed Successfully")
    } catch (error) {
        console.log('CHANGE_PASSWORD_API ERROR',error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}

export function deleteProfile (token, navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("DELETE",DELETE_PROFILE_API, null,{
                Authorization:`Bearer ${token}`
            })
            console.log("DELETE PROFILE API RESPONSE.....", response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Profile Deleted Successfully")
            dispatch(logout(navigate))
        } catch (error) {
            console.log("DELETE PROFILE API ERROR",error)
            toast.error("Could not Delete Profile")
        }
        toast.dismiss(toastId)
    }
}
