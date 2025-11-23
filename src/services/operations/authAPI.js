import {toast} from "react-hot-toast"
import {endpoints} from "../apis"
import {setUser} from "../../reducer/slices/profileSlice"
import {apiConnector} from "../apiconnector"
import {setLoading,setToken} from "../../reducer/slices/authSlice"
import { resetCart } from "../../reducer/slices/cartSlice"
// import { setLoading } from "../../reducer/slices/profileSlice"



const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,

} = endpoints

export function sendOtp(email,navigate){
   
    return async (dispatch) =>{
        const toastId = toast.loading("Loading");
        dispatch(setLoading(true));
        try{
            console.log("hlo")
            const response = await apiConnector("POST",SENDOTP_API,{
                email,checkUserPresent:true,
            })
            console.log("hlo")
            console.log("SEND OTP RESPONSE......",response);
            console.log(response.data.succss)
            console.log("hlo1")
            
            if(!response.data.succss){
                throw new Error (response.data.message);
            }
            console.log("hlo")
             console.log("OTP SENT SUCCESSFULLY")
             toast.success("OTP sent Successfully")
             navigate("/verify-email")
        }catch(error){
            console.log("SENDOTP API ERROR............", error)
            toast.error("Could Not Send OTP")
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}

export function signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        // dispatch(setLoading())
        try{
            console.log("hl0signup")
            const response = await apiConnector("POST",SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })
            console.log("hl0signup")
               console.log("SIGNUP API RESPONSE.........",response)
               if(!response.data.success){
                throw new Error(response.data.message)
               }
               toast.success("SIGNUP SUCCESSFULL")
               navigate("/login")
               
        }catch(error){
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout(navigate){
    return (dispatch)=>{
        dispatch(setToken(null));
        dispatch(setUser(null))
        dispatch(resetCart());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out")
        navigate("/")
    }
}
export function login(email,password,navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",
            LOGIN_API,{
                email,
                password,
            })
            console.log("response login",response)
            console.log("LOGIN API RESPONSE......",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Login Successful");
            dispatch(setToken(response.data.token))
            const userImage  = response.data?.user?.image?response.data.user.image:`https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            dispatch(setUser({...response.data.user,image:userImage}))

            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem("user",JSON.stringify(response.data.user))
            navigate("/dashboard/my-profile")
        }
        catch(error){
            console.log("LOGIN API ERROR.....",error.message);
            toast.error("Could not Login ", error);
            
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


export function getResetPasswordToken(email,setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true));
        try{
            const response = await apiConnector("POST",RESETPASSTOKEN_API,{email});

            console.log("RESET PASSWROD TOKEN RESPONSE...",response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("reset email sent");
            setEmailSent(true);
        }
        catch(error){
            console.log("reset password token error",error);
            toast.error(error);
        }
        dispatch(setLoading(false));
    }
}

export function resetPassowrd(password,confirmPassword,token){
    return async (dispatch)=>{
           dispatch(setLoading(true));
           try{
    
            const response = await apiConnector("POST",RESETPASSWORD_API,{password,confirmPassword,token});
            console.log("reset password response : ",response);

            toast.success("Password has been reset Successfully");
           }catch(err){
              console.log('REset Password error',err);
              toast.error("Unable to reset Password");
           }
           dispatch(setLoading(false));
    }
}