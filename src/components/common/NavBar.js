import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets - Copy/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'

import {BsChevronDown} from 'react-icons/bs'





const NavBar = () => {
  const{token} = useSelector((state)=>state.auth);
  const{user} = useSelector((state)=>state.profile);
  const {totalItems} = useSelector((state)=>state.cart);
  const location = useLocation()
const[subLinks,setSubLinks] = useState([]);
const [loading,setLoading] = useState(false)


useEffect(()=>{
  ;(async()=>{
    setLoading(true)
    try {
      const res = await apiConnector("GET",categories.CATEGORIES_API)
      console.log("category navbar",res)
      console.log("first",subLinks)
      setSubLinks(res.data.data)
      
    } catch (error) {
      console.log("Couldnot fetch categories.",error)

    }
    setLoading(false)
  })()
},[])
  const matchRoute = (route)=>{
    return matchPath({path:route},location.pathname)
  }
  return (
    <div className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
      location.pathname !== "/" ? "bg-richblack-800":""
    } transition-all duration-200`}>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
          <Link to="/">
            <img src={logo} alt="" width={120} height={30} loading='lazy'/>
          </Link>
          <nav className='hidden md:block'>
            <ul className='flex gap-x-6 text-richblack-25'>
                {
                    NavbarLinks.map((link,index)=>(
                      <li key={index}>
                        {
                   link.title === 'Catalog'?(
                   <>
                   <div className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
                    ? "text-yellow-25"
                    : "text-richblack-25"
                   }`}>

                    <p >{link.title}</p>
                    <BsChevronDown/>
                    <div 
                    className=' absolute left-[50%] top-[50%] z-[1000] flex w-[200px]translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 lg:w-[250px]'>
                        <div 
                        className='absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[40%] rotate-45 select-none rounded bg-richblack-5'>

                        </div>
                      {loading?(
                        <p className='text-center'>Loading...</p>
                      ): subLinks.length?
                      (
                        <>

                         {subLinks
                         ?.filter((subLink)=>subLink.courses.length > 0)
                         ?.map((subLink, i) => (
                          <Link
                            to={`/catalog/${subLink.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            key={i}
                          >
                            <p>{subLink.name}</p>
                          </Link>
                         ))
                         
                        }
                        </>
                      ):(
                        <p className='text-center'>NO Courses Found</p>
                      )}
                    </div>
                   

                   </div>
                          </> 
                   )

                   :
                   (<div>
                      <Link to={link?.path} key={index} >
                        <p className={`${matchRoute(link.path) ?"text-yellow-25" : "text-richblack-25"}`}>

                         {link.title}
                        </p>

                         </Link>
                   </div>)
}
                   </li>
                    ))
                }

            </ul>
          </nav>
          {/* login/signup/Dashboard */}

          <div className='hidden items-center gap-x-4 md:flex'>
            {
              user && user.accountType !== "Instructor" && (
                <Link to={'/dashboard/cart'}
                className='relative'>
                  <AiOutlineShoppingCart
                  className='text-2xl text-richblack-100' />
                  {
                    totalItems > 0 && (
                      <span
                      className='absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100'>
                        {totalItems}
                      </span>
                    )
                  }
                </Link>
              )
            }
            {
              token == null && (
                <Link to={'/login'}
                >
                 <p className='logSign'>Log in</p>
                </Link>
              )
            }
            {
              token == null && (
                <Link to={'/signup'}
                >
                 <p className='logSign'>Sign Up</p>
                </Link>
              )
            }
            {
              token != null && <ProfileDropDown/>
            }


          </div>
        </div>
    </div>
  )
}

export default NavBar