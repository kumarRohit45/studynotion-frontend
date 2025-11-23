import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightedText from './HighlightedText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];



const ExploreMore = () => {
    const[currentTab,setCurrentTab] = useState(tabsName[0]);
    const[courses,setCourses] = useState(HomePageExplore[0].courses);
    const[currentCard,setCurrentCard]  =useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value)=>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=> course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
  return (
    <div className='exploreMore'>
        <div className='empower'>
            Unlock the 
            <h4>
                
            <HighlightedText text={"Power of Code"} />
            </h4>

        </div>
        <p>
            Learn to build anything you can imagine
        </p>
        <div className='tabs-name'>
            {
                tabsName.map((element,index)=>{
                    return (
                        <div className={`tabs-element ${currentTab === element ? "tag-clicked" : "tag-notclicked"}`}
                         key={index}
                         onClick={()=>setMyCards(element)} >
                          {  element}
                        </div>
                    )
                })
            }
        </div>
        <div  className={"course-card"}>
            {
                courses.map((element,index)=>{
                    return (
                        <CourseCard 
                       
                        key={index}
                        cardData = {element}
                        currentCard = {currentCard}
                        setCurrentCard = {setCurrentCard}
                        />
                    )
                })
            }
        </div>
    </div>
  )
}

export default ExploreMore