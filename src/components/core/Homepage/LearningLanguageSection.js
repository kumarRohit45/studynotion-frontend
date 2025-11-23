import React from 'react'
import HighlightedText from "../Homepage/HighlightedText"
import know_your_progress from "../../../assets - Copy/Images/Know_your_progress.png"
import compare_with_others from "../../../assets - Copy/Images/Compare_with_others.png"
import plan_your_lessons from "../../../assets - Copy/Images/Plan_your_lessons.png"
import CTAButton from "../Homepage/button" 

const LearningLanguageSection = () => {
  return (
    <div>
      <div className='LearningLanguage-section py-[19px]'>
        <div >
          <p>Your Swiss Knife for</p><HighlightedText text={"learning any language"} className="highlightText"/>

        </div>
        <div>
         <p> Using spin making learning multiple languages easy with 20+ languages realistic voice-over, progress trading, custom schedule and more.</p>
        </div>
        <div className='learningImage'>
          <img src={know_your_progress} alt="know_your_progress " />
          <img src={compare_with_others} alt="compare_with_others image" />
          <img src={plan_your_lessons} alt="plan_your_lessons image" />
        </div>

        <div>
          <CTAButton className="ctabutton"  active={true} linkto={"/signUp"}>
          Learn More
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection