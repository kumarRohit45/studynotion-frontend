import React from 'react'
import HighlightedText from '../Homepage/HighlightedText'

const Quote = () => {
  return (
    <div className='text-white'>
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightedText text={"combines technology"}/>
        <span className='text-brown-500'>
            {" "}
            expertise
        </span>
        , and community to create an
        <span className='text-brown-500'>
            {" "}
            unparalled educational experience.
        </span>
    </div>
  )
}

export default Quote