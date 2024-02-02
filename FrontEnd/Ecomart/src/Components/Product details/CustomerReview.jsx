import React, { useEffect, useState } from 'react';
import { Progress } from 'antd';
import useReview from '../customs hooks/useReview';
import { LogoAvatar } from '../UserAccount/Userlogo';
const CustomerReview = () => {
const [Addreviewtodatabase,fetchReviews,data]=useReview();
var userrating=[]
data.ratingslist.map((i)=>{
  const {rating}=i;
  userrating.push(rating)
})
  return (
    <React.Fragment>
      <h4>Customers Reviews</h4>

      <div className='reviewparent'>
        <div className='reviewchild'>
          <ProductReviews reviewdata={data.reviewlist} />
        </div>
        <div className='reviewchild'>
         {[5,4,3,2,1].map((index)=>{
          return(<div  key={index}>{index} star<Progress percent={30} /></div>)
         })}
        </div>
      </div>
    </React.Fragment>
  );
};

export const ProductReviews = ({ reviewdata }) => {
  const [reviewstate, setReviewState] = useState(false);
  useEffect(() => {
    if (reviewdata.length > 0 && !reviewstate) {
      setReviewState(true);
    }
  }, [reviewdata, reviewstate]); 

  return (
    <div>
      {reviewstate
      ?
      reviewdata.map((reviewdata,index)=>{
        const {name,comment,rating,productimage,date}=reviewdata;
        return(
          <div key={index} className='review'>
         <div className='avatar' > <LogoAvatar size='30'/>&ensp;{name}</div>
         <div ><UserRating rate={rating}/></div>
         <p>Reviewed in India on {date}</p>
         <p>{comment}</p>
         <img className='review-img' src={productimage}/>
         <hr/> </div>
        )
      })
      : 
      <h1>no review</h1>}
    </div>
  );
};

export const UserRating=({rate})=>{
  const [rating, setRating] = useState(rate); 

  return(
   <div > {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      style={{
        cursor: 'pointer',
        fontSize: '24px',
        color: star <= rating ? 'gold' : 'gray',
      }}
    >
      ★
    </span>
  ))}</div>
  )
}
export default CustomerReview;
