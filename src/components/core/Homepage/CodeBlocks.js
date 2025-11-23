import React from 'react'
import CTAButton from "../Homepage/button"
import {FaLongArrowAltRight} from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'



const CodeBlocks = ({
    position,heading,subheading, ctabtn1, ctabtn2, codeblock,blob
}) => {
  return (
    <div className={`codeblock ${position}`}>
        {/* Section-1 */}
        <div className='codeblock-sec1 '>
            <div className='empower '>

            {heading}
            </div>
            <div className='code-subheading'>
                {subheading}
            </div>
            <div className='two-btn'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='code-btns'>
                        {ctabtn1.btnText}
                        <FaLongArrowAltRight />
                    </div>
                </CTAButton>

                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                     {ctabtn2.btnText}
                </CTAButton>
           
            </div>

        </div>
        {/* section-2 */}
      <div className='codeblock-sec2 '>
        {/* bg-gradient */}
        <div className='listno'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>
        <div className='TypeAnimation'>
          <div className={`${blob ? "blob-yellow" :"blob-blue"}`}></div>
          <TypeAnimation
          sequence={[codeblock,2000,""]}
          repeat={Infinity}
          cursor={true}
          omitDeletionAnimation={true}

          style={
            {
              whiteSpace:"pre-line",
              display:"block",
            }
          }
          />
        </div>

      </div>
    </div>
  )
}

export default CodeBlocks