import React from 'react'
import { Link } from 'react-router-dom'

const button = ({children,active,linkto}) => {
  return (
 <Link to={linkto} className={`btn-compo ${active ? 'yellow-bg' : "black-bg"} ` }>

 {children}
 </Link>
  )
}

export default button