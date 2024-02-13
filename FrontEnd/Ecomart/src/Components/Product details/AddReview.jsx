import React,{useState,useRef, useEffect} from 'react'
import { toast } from 'react-toastify';
import { notifyerror,notifysuccess } from '../../../tostisy';
import {reviewvalidation} from '../Home/login/signupformvalidation'  // review validation 
import useReview from '../customs hooks/useReview';  //useHook for review
export default function AddReview({items}) {
    const checkbox=useRef();
    const flag=checkbox.current //check whether checkbox checked or not
    const [rating, setRating] = useState(0); 
    const [Addreviewtodatabase,fetchReviews]=useReview()
    const [error,setError]=useState('')
    const [review,setreview]=useState({
    rating:rating,
    comment:'',
    name:'',
    image:'',
    id:''
  })
 useEffect(()=>{
fetchReviews(items.id)
 },[items.id])
  //add review handle function
  function change(e){
    setreview({
      ...review,
      [e.target.name]:e.target.value
    });
  
  }
 //review function
    const handleClick = (newRating) => {
      setRating(newRating); 
      review.rating=newRating;
    };
  //submit function
 async function submit(event)
  {
    event.preventDefault();
    review.image=items.image;
    review.id=items.id;
  const check= await reviewvalidation(review,flag,setError);
  if(check)
  {
    Addreviewtodatabase(review);
    
  }
  else{
    notifyerror(toast,error)
  }
  }
  return (
    <div style={{width:'70%',background:'#eeeeee',height:'570px'}} className='mt-4  p-4'>
    <h5>Add A Review</h5>
    <p>Review now to get coupon!<br></br>
    Your email address will not be published. Required fields are marked <span style={{color:'red'}}>*</span></p>
   <div className='mt-3'> <StarRating rating={rating} handleClick={handleClick}/></div>
   <div className='mt-3'>
   <label htmlFor='comment' >Your Review <span className='text-danger'>*</span></label><br/>
    <input type='text' style={{width:"100%",height:'5.5rem'}} name='comment' onChange={change} />
  </div>
  <div className='mt-3'>
  <label htmlFor='file'>Choose File<span className='text-danger'>*</span></label><br/>
   <input type='file' />
  </div>
  <div className='mt-3'>
  <label htmlFor='Name' >Enter Your Name<span className='text-danger'>*</span></label><br/>
  <input type='text' style={{width:"100%",borderRadius:'5px '}} name='name' onChange={change}/>
 </div>
 <div className='mt-3'>
 <input type='checkbox' name='checkbox' ref={checkbox} />&ensp;
 <label htmlFor='Name'>  Save my name, email, and website in this browser for the next time I comment.</label>

 <button style={{float:'right'}} onClick={submit}>Submit</button>
</div>

    </div>
  )
}
const StarRating = ({handleClick,rating}) => {
 
    return (
      <div>
     <b>Your Rating</b><span style={{color:'red'}}>   *</span><br/>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleClick(star)}
            style={{
              cursor: 'pointer',
              fontSize: '24px',
              color: star <= rating ? 'gold' : 'gray',
            }}
          >
            ★
          </span>
        ))}
      </div>
    );
  };
  