import React from 'react'

const CourseCard = ({cardData,currentCard,setCurrentCard}) => {
  return (
    <div >
<div className={`course-card-single ${currentCard === cardData?.heading ? "selected-card":"non-selected-card"} `}
onClick={()=>setCurrentCard(cardData?.heading)}> 

    <div>
      <h4>{cardData?.heading}</h4>
      <p>{cardData?.description}</p>
    </div>

    <div>
      <div>
        
      <h6>{cardData?.level}</h6>
      </div>
      <div>
        <h6>{cardData?.lessionNumber}</h6>
      </div>

    </div>
    
    </div>
</div>
  )
}

export default CourseCard