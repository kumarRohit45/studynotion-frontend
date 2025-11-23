import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import { DeleteAccount } from './DeleteAccount'

const Setting = () => {
  return (
   <>
         <h1 className='text-white'>
            Edit Profile
         </h1>
         <ChangeProfilePicture/>
         <EditProfile/>
         <UpdatePassword/>
         <DeleteAccount/>
   </>
  )
}

export default Setting